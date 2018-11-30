import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios';

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
    cartoonData: '',
    displayedCartoons: {},
    height: 0,
  }

  componentDidMount() {

    window.addEventListener('scroll', this.handleScroll);
    // Necessary to make transitions between archive and display work
    // Wrong cartoon will load if startingPage is out of parameters in URL bar
      //  - This is fixed in update because Redux not available on Mount
    if ( this.props.startingPage > 0 ) {
      this.setDisplayedCartoons( this.props.startingPage );
      this.props.onSetCurrentDisplayedCartoon( parseInt(this.props.startingPage) );
      // Starting page is a string and therefore must be parsed.
    }

  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = ( event ) => {
    // this.props.currentDisplayedCartoon does not update because it is initialized on mount and cannot access Redux updates
    if ( this.props.currentDisplayedCartoon < this.props.lastCartoon &&
      Math.floor(document.documentElement.scrollHeight - document.documentElement.scrollTop) === Math.ceil(document.documentElement.clientHeight)
    ){
      this.setDisplayedCartoons( this.props.currentDisplayedCartoon + 1 )
      this.props.onDisplayNextCartoon()
      this.setRoute();
      // `/${parseInt(this.props.currentDisplayedCartoon) + 1 }`
      // this.props.onSetCurrentDisplayedCartoon( this.props.currentDisplayedCartoon + 1 )
    }
  }

  componentDidUpdate( prevProps ) {
    // Redux not available until component did update
    // In these three if scenarios there is no applicable cartoon so it is set to lastCartoon
    if ( this.props.currentDisplayedCartoon === 0 ){
      if (
        this.props.startingPage === undefined ||
        this.props.startingPage <= 0 ||
        this.props.startingPage > this.props.lastCartoon ){
          this.props.onSetCurrentDisplayedCartoon(
            this.props.lastCartoon
          );
          // this.asyncGetCartoonData( this.prop.lastCartoon );
          this.setDisplayedCartoons( this.props.lastCartoon );
      } else {
        this.props.onSetCurrentDisplayedCartoon(
          parseInt( this.props.startingPage )
        );
        // this.asyncGetCartoonData( this.props.startingPage );
        this.setDisplayedCartoons( this.props.startingPage );
      }
    }

    // Eliminates calls which will fail.
    if ( prevProps.currentDisplayedCartoon !== this.props.currentDisplayedCartoon &&
        this.props.currentDisplayedCartoon !== 0 &&
        this.props.currentDisplayedCartoon <= this.props.lastCartoon ){
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
      }, 500), this.setRoute()
    );

  }

  perviousCartoon = () => {
    let container = this.refs.displayField;
    let target = this.refs[`${parseInt(this.props.currentDisplayedCartoon) - 1 }`] || 0;

    if (target === 0) {
      this.promise( this.props.onDisplayPreviousCartoon() )
      .then( this.scrollToContainerTop(container), this.setRoute() );
    } else {
      this.promise( this.props.onDisplayPreviousCartoon() )
      .then( this.scrollToCartoonTop(target, container), this.setRoute() );
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
    let target= this.refs[`${parseInt(this.props.currentDisplayedCartoon)}`];
    this.promise( this.props.onDisplayNextCartoon() )
    .then(
      setTimeout( function() {
        window.scrollTo({
          top: target.offsetTop + target.scrollHeight + container.offsetTop,
          behavior: 'auto'
        })
      }, 200)
    );
  }

  setRoute = () => {
    this.props.history.push(`/${ parseInt(this.props.currentDisplayedCartoon)}`);
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
                <Link to={`/${parseInt(this.props.currentDisplayedCartoon) - 1 }`}>
                  <img src={ chevron_up } alt="Previous Cartoon"/>
                </Link>
              </Button>
            }
            { this.props.currentDisplayedCartoon < this.props.lastCartoon  &&
              <Button
                clicked={ this.nextCartoon }>
                <Link to={`/${parseInt(this.props.currentDisplayedCartoon) + 1 }`}>
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
