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
  state = {
    displayedCartoons: {},
    scrollHistory: 0,
  }

  componentDidMount() {
    window.addEventListener('scroll', _.throttle(this.handleScroll, 500));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', _.throttle(this.handleScroll, 500));
  }

  handleScroll = ( event ) => {
    let scrollHeight = document.documentElement.offsetHeight + ( document.documentElement.scrollTop - document.documentElement.scrollHeight)

    if ( Object.keys(this.state.displayedCartoons).length ) {
      if ( scrollHeight < this.state.scrollHistory ) {
        // Up
        if ( this.props.currentDisplayedCartoon !== 1
           && this.props.currentDisplayedCartoon - 1 in this.state.displayedCartoons
           && ( scrollHeight < this.refs[`${ this.props.currentDisplayedCartoon }`].offsetTop + ( document.documentElement.offsetHeight - this.refs.displayField.offsetHeight ) )
         ){
          this.promise(this.props.onDisplayPreviousCartoon())
          .then( this.setRoute( this.props.currentDisplayedCartoon ))
        }
      } else {
        console.log( Math.ceil( scrollHeight + this.refs.displayField.offsetTop + this.refs[`${ this.props.currentDisplayedCartoon }`].offsetTop ) > Math.floor( this.refs[`${ this.props.currentDisplayedCartoon }`].offsetHeight + this.refs[`${ this.props.currentDisplayedCartoon }`].offsetTop + this.refs.displayField.offsetTop ) )
        // Down
        if ( this.props.currentDisplayedCartoon < this.props.lastCartoon
          && !( this.props.currentDisplayedCartoon + 1 in this.state.displayedCartoons )
          && Math.floor(document.documentElement.scrollHeight - document.documentElement.scrollTop) === Math.ceil(document.documentElement.clientHeight)
          // && Math.ceil( scrollHeight + this.refs.displayField.offsetTop + this.refs[`${ this.props.currentDisplayedCartoon }`].offsetTop ) > Math.floor( this.refs[`${ this.props.currentDisplayedCartoon }`].offsetHeight + this.refs[`${ this.props.currentDisplayedCartoon }`].offsetTop + this.refs.displayField.offsetTop )
        ){
          console.log( this.props.currentDisplayedCartoon + 1 );
            this.setDisplayedCartoons( this.props.currentDisplayedCartoon + 1 )
            this.promise(this.props.onDisplayNextCartoon())
            .then( this.setRoute( this.props.currentDisplayedCartoon ) );
        } else if ( this.props.currentDisplayedCartoon + 1 in this.state.displayedCartoons
            && scrollHeight > this.refs[`${ this.props.currentDisplayedCartoon }`].offsetHeight + this.refs[`${ this.props.currentDisplayedCartoon }`].offsetTop + document.documentElement.offsetHeight - this.refs.displayField.offsetHeight
        ){
          this.promise(this.props.onDisplayNextCartoon())
          .then( this.setRoute( this.props.currentDisplayedCartoon ))
        }
      }
      this.setState({scrollHistory: scrollHeight});
    }
  }

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

    this.promise( this.props.onSetCurrentDisplayedCartoon(1) )
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
    }, 100);
  }

  scrollToContainerTop = (container) => {
    setTimeout( function() {
      window.scrollTo({
        top: container.offsetTop,
        behavior: 'auto'
      });
    }, 100);
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
      console.log('next cartoon doesnt position next load well')
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
