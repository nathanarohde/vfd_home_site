import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios';
import lodash from 'lodash';

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
  constructor(props){
    super(props);
    this.state = {
      displayedCartoons: {},
      scrollHistory: 0,
    }
    // Prevents memory leak
    this.throttledFunction = lodash.throttle(this.handleScroll, 200);
  }



  componentDidMount() {
    window.addEventListener('scroll', this.throttledFunction, false);
    // Necessary for Archive to work properly
    if ( parseInt(this.props.match.params.id) > 0 ) {
      this.setDisplayedCartoons( parseInt(this.props.match.params.id) );
      this.props.onSetCurrentDisplayedCartoon( parseInt(this.props.match.params.id) );
    } else {
      // Redux not available until update
      axios.get('https://raw.githubusercontent.com/nathanarohde/vfd_home_site/master/src/Cartoons/Cartoons.json')
      .then( response => {
        this.setDisplayedCartoons( response.data.lastCartoon );
        this.props.onSetCurrentDisplayedCartoon(
          parseInt(response.data.lastCartoon)
        )
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.throttledFunction, false);
  }

  handleScroll = () => {
    let scrollHeight = document.documentElement.offsetHeight + ( document.documentElement.scrollTop - document.documentElement.scrollHeight)

    if ( Object.keys(this.state.displayedCartoons).length ) {
      if ( scrollHeight < this.state.scrollHistory ) {
        // Up
        if ( this.props.currentDisplayedCartoon !== 1
           && this.props.currentDisplayedCartoon - 1 in this.state.displayedCartoons
           && this.refs[`${ this.props.currentDisplayedCartoon }`] !== undefined
           && ( scrollHeight + 100 < this.refs[`${ this.props.currentDisplayedCartoon }`].offsetTop + ( document.documentElement.offsetHeight - this.refs.displayField.offsetHeight ) )
         ){
          this.promise(this.props.onDisplayPreviousCartoon())
          .then( this.setRoute( this.props.currentDisplayedCartoon ))
        }
      } else {
        // Down
        // For cartoons that don't exist
        if ( this.props.currentDisplayedCartoon < this.props.lastCartoon
          && !( this.props.currentDisplayedCartoon + 1 in this.state.displayedCartoons )
          // Undefined prevents errors when transferring from archive.
          && this.refs[`${ this.props.currentDisplayedCartoon }`] !== undefined
          && Math.ceil( scrollHeight )
              > Math.ceil( this.refs[`${ this.props.currentDisplayedCartoon }`].offsetHeight + this.refs[`${ this.props.currentDisplayedCartoon }`].offsetTop )
        ){
          this.setDisplayedCartoons( this.props.currentDisplayedCartoon + 1 )
          this.promise(this.props.onDisplayNextCartoon())
          .then( this.setRoute( this.props.currentDisplayedCartoon ) );
        // For already existing cartoons
        } else if ( this.props.currentDisplayedCartoon + 1 in this.state.displayedCartoons
          // This will sometimes trigger when using the Previous button - the line below prevents error
          && this.refs[`${ this.props.currentDisplayedCartoon }`] !== undefined
          && scrollHeight > this.refs[`${ this.props.currentDisplayedCartoon }`].offsetHeight + this.refs[`${ this.props.currentDisplayedCartoon }`].offsetTop + document.documentElement.offsetHeight - this.refs.displayField.offsetHeight
        ){
          this.promise( this.props.onDisplayNextCartoon() )
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
      }, 200), this.setRoute( 1 )
    );
  }

  perviousCartoon = () => {
    let container = this.refs.displayField;
    let target = this.refs[`${ this.props.currentDisplayedCartoon - 1 }`] || 0;

    this.promise( this.props.onDisplayPreviousCartoon() )
    .then( setTimeout( function() {
      window.scrollTo({
        top: target.offsetTop + container.offsetTop,
        behavior: 'auto'
      })
    }, 200), this.setRoute( this.props.currentDisplayedCartoon - 1)
    );
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
      }, 200), this.setRoute( this.props.currentDisplayedCartoon + 1 )
    );
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
          <div className="displayedCartoon" ref={cartoon} key={cartoon}>
            <TitleBox date={ this.state.displayedCartoons[cartoon].date } title={ this.state.displayedCartoons[cartoon].title }/>
            <Cartoon key={ cartoon } source={ cartoon } />
          </div>
        )
      })
    }

    return (
      <div id="displayField" ref="displayField">
        { cartoons }
        { this.refs.displayField !== undefined
          && this.state.scrollHistory > this.refs.displayField.offsetTop
          &&
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
        }
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
