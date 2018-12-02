import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios';
import _ from 'lodash';

import chevron_first from '../../Assets/chevron-first.svg';
import chevron_up from '../../Assets/chevron-up.svg';
import chevron_down from '../../Assets/chevron-down.svg';

import './Display.css'
import TitleBox from '../../Components/TitleBox/TitleBox';
import Cartoon from '../../Components/Cartoon/Cartoon';
import Button from '../../Components/Button/Button';
import { Link } from 'react-router-dom';
import * as actions from '../../Store/actions';

class Display extends Component {
  // scrollCounter set here because scroll event listener set in mount cannot access Redux state updates
  state = {
    displayedCartoons: {},
    scrollHistory: 0,
  }

  componentDidMount() {
    window.addEventListener('scroll', _.throttle(this.handleScroll, 200));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', _.throttle(this.handleScroll, 200));
  }

  handleScroll = ( event ) => {
      let scrollHeight = document.documentElement.offsetHeight + ( document.documentElement.scrollTop - document.documentElement.scrollHeight)

      if ( scrollHeight < this.state.scrollHistory ) {
        console.log('Up: ' + this.state.scrollHistory);
      } else {
        console.log('Down: ' + this.state.scrollHistory);
      }
      this.setState({scrollHistory: scrollHeight});

  }

    // Check direction of scroll X
    // if down add more cartoons X
    // if new cartoon set new

    // let scrollHeight = document.documentElement.offsetHeight + ( document.documentElement.scrollTop - document.documentElement.scrollHeight)
    // let currentDisplayedCartoon = this.props.currentDisplayedCartoon;
    // // let currentDisplayedCartoon = this.getCurrentDisplayedCartoon();
    //
    // if (scrollHeight < this.state.scrollHistory){
    //   // Up
    //   if ( currentDisplayedCartoon !== 1
    //        && this.refs[`${currentDisplayedCartoon}`] !== undefined
    //        && ( ( scrollHeight + 150 ) < ( document.documentElement.offsetHeight - this.refs[`${ this.props.currentDisplayedCartoon }`].offsetHeight ) )
    //        // && scrollHeight < (document.documentElement.offsetHeight - this.refs[`${ this.props.currentDisplayedCartoon }`].offsetHeight)
    //        // && (`${currentDisplayedCartoon - 1}` in this.state.displayedCartoons)
    //      ){
    //        // console.log( scrollHeight + 150 );
    //        // console.log( document.documentElement.offsetHeight - this.refs[`${ this.props.currentDisplayedCartoon }`].offsetHeight );
    //        console.log( this.refs[`${ this.props.currentDisplayedCartoon }`].offsetHeight );
    //        console.log( 'Up: ' + currentDisplayedCartoon );
    //
    //        // this.promise(this.props.onDisplayPreviousCartoon())
    //        // .then(this.setRoute(this.props.currentDisplayedCartoon));
    //        // console.log( currentDisplayedCartoon );
    //        // scroll triggers again before this is updates
    //
    //        // Find if displayed cartoons contains previous cartoon
    //         // If so change route
    //        // console.log( 'Scroll Height: ' + scrollHeight );
    //        // console.log( 'Container - Cartoon Height ' + (document.documentElement.offsetHeight - this.refs[`${ currentDisplayedCartoon }`].offsetHeight )  )
    //        // console.log( 'Display Cartoon Height ' + this.refs[`${ this.props.currentDisplayedCartoon }`].offsetHeight)
    //      }
    // }
    // else {
    //   // Down
    //   // First section checks if user has scrolled past container element bottom
    //   // Adds new cartoons
    //   // if ( currentDisplayedCartoon < this.props.lastCartoon) {
    //   //   // if ( Math.floor(document.documentElement.scrollHeight - document.documentElement.scrollTop) === Math.ceil(document.documentElement.clientHeight) ) {
    //   //   //   this.setDisplayedCartoons( currentDisplayedCartoon )
    //   //   //   this.promise(this.props.onDisplayNextCartoon())
    //   //   //   .then( this.setRoute( currentDisplayedCartoon ) );
    //   //   // Second section
    //   // }
    //   // else {
    //   //   // console.log( scrollHeight > this.refs[`${ currentDisplayedCartoon }`].offsetHeight );
    //   //   // console.log( currentDisplayedCartoon );
    //   // }
    //     // else if (
    //     //   // this.refs[`${currentDisplayedCartoon}`] !== undefined
    //     //   scrollHeight > this.refs[`${ currentDisplayedCartoon }`].offsetHeight
    //     // ) {
    //     //     console.log('Existing cartoon true');
    //     //   // this.promise(this.props.onDisplayNextCartoon())
    //     //   // .then( this.setRoute( currentDisplayedCartoon ) );
    //     //   // console.log( 'Down Old: ' + currentDisplayedCartoon );
    //     //   // console.log( scrollHeight );
    //     //   // console.log( this.refs[`${ currentDisplayedCartoon }`].offsetHeight );
    //     // }
    //   }

    // adds cartoons does not check current position of elements

  //
  // getCurrentDisplayedCartoon = () => {
  //   return this.props.currentDisplayedCartoon;
  // }

  componentDidUpdate( prevProps ) {
    // Redux not available until component did update
    // In these three if scenarios there is no applicable cartoon so it is set to lastCartoon
    if ( this.props.currentDisplayedCartoon === 0 ){
      if (
        parseInt(this.props.match.params.id) === undefined
        || parseInt(this.props.match.params.id) <= 0
        || parseInt(this.props.match.params.id) > this.props.lastCartoon
        || isNaN(this.props.match.params.id)
       ){
          this.props.onSetCurrentDisplayedCartoon(
            this.props.lastCartoon
          );
          this.setDisplayedCartoons( this.props.lastCartoon );
          this.setRoute(this.props.lastCartoon);
      } else {
        this.props.onSetCurrentDisplayedCartoon( parseInt(this.props.match.params.id) );
        this.setDisplayedCartoons( parseInt(this.props.match.params.id) );
      }
    }

    // Eliminates calls which will fail.
    if ( prevProps.currentDisplayedCartoon !== this.props.currentDisplayedCartoon
        && this.props.currentDisplayedCartoon !== 0
        && this.props.currentDisplayedCartoon <= this.props.lastCartoon ){
          this.setDisplayedCartoons( this.props.currentDisplayedCartoon );
    }
  }

  setDisplayedCartoons = ( cartoon ) => {
    if (!(cartoon in this.state.displayedCartoons)){
      let url = 'https://raw.githubusercontent.com/nathanarohde/vfd_home_site/master/src/Cartoons/' + cartoon + '/cartoon.json';
      axios.get( url )
      .then( response => {
        this.setState( prevState => ({
          displayedCartoons: {
            ...prevState.displayedCartoons,
            [cartoon]: {
                date: response.data.date,
                title: response.data.title
            }
          }
        }))
      })
      .catch( error => {
        console.log('Error');
      })
    }
  };

  firstCartoon = () => {

    let target= this.refs.displayField;

    this.promise(  this.props.onSetCurrentDisplayedCartoon(1) )
    .then(
      setTimeout( function() {
        window.scrollTo({
          top: target.offsetTop,
          behavior: 'auto'
        })
      }, 500), this.setRoute( 1 )
    );

  }

  perviousCartoon = () => {
    let container = this.refs.displayField;
    let target = this.refs[`${ this.props.currentDisplayedCartoon - 1 }`] || 0;

    if (target === 0) {
      this.promise( this.props.onDisplayPreviousCartoon() )
      .then( this.scrollToContainerTop(container), this.setRoute( this.props.currentDisplayedCartoon - 1) )
    } else {
      this.promise( this.props.onDisplayPreviousCartoon() )
      .then( this.scrollToCartoonTop(target, container), this.setRoute( this.props.currentDisplayedCartoon - 1) )
    }
  }

  scrollToCartoonTop = (target, container) => {
    setTimeout( function() {
      window.scrollTo({
        top: target.offsetTop + container.offsetTop,
        behavior: 'auto'
      });
    }, 200);
  }

  scrollToContainerTop = (container) => {
    setTimeout( function() {
      window.scrollTo({
        top: container.offsetTop,
        behavior: 'auto'
      });
    }, 200);
  }

  nextCartoon = () => {
    let container = this.refs.displayField;
    let target= this.refs[`${ this.props.currentDisplayedCartoon }`];
    this.promise( this.props.onDisplayNextCartoon() )
    .then(
      setTimeout( function() {
        window.scrollTo({
          top: target.offsetTop + target.scrollHeight + container.offsetTop,
          behavior: 'auto'
        })
      }, 200)
    );
      console.log('scroll doesnt set routes properly, next cartoon doesnt position next loads well')
      // should add place holding container
  }

  setRoute = ( target ) => {
    this.props.history.push(`/${ target }`);
  }

  promise = ( importedFunction ) => {
    return new Promise(function(resolve, importedFunction){
      resolve( importedFunction );
    })
  }

  render () {
    let cartoons = <p>Site is loading.</p>

    if (Object.keys(this.state.displayedCartoons).length){
      cartoons = Object.keys(this.state.displayedCartoons).map( cartoon => {
        return (
          <div ref={cartoon} key={cartoon}>
            <TitleBox date={ this.state.displayedCartoons[cartoon].date } title={ this.state.displayedCartoons[cartoon].title }/>
            <Cartoon key={ cartoon } source={ cartoon } />
          </div>
        )
      })
    }

    return (
      <div id="displayField" ref="displayField">
        { cartoons }
        <div className="buttonFixedContainer">
          <div className="buttonBox">
            { this.props.currentDisplayedCartoon !== 1 &&
              <Button
                clicked={ this.firstCartoon }>
                <Link to={`/${ 1 }`}>
                  <img src={ chevron_first } alt="Previous Cartoon"/>
                </Link>
              </Button>
            }
            { this.props.currentDisplayedCartoon > 1 &&
              <Button
                clicked={ this.perviousCartoon }>
                <Link to={`/${ this.props.currentDisplayedCartoon - 1 }`}>
                  <img src={ chevron_up } alt="Previous Cartoon"/>
                </Link>
              </Button>
            }
            { this.props.currentDisplayedCartoon < this.props.lastCartoon  &&
              <Button
                clicked={ this.nextCartoon }>
                <Link to={`/${ this.props.currentDisplayedCartoon + 1 }`}>
                  <img src={ chevron_down } alt="Next Cartoon"/>
                </Link>
              </Button>
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentDisplayedCartoon: state.currentDisplayedCartoon,
    lastCartoon: state.lastCartoon
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDisplayPreviousCartoon: () => dispatch(actions.displayPreviousCartoon()),
    onDisplayNextCartoon: () => dispatch(actions.displayNextCartoon()),
    onSetCurrentDisplayedCartoon: (currentCartoon) => dispatch(actions.setCurrentDisplayedCartoon(currentCartoon))
  }
}


export default withRouter( connect( mapStateToProps, mapDispatchToProps )( Display ) );
