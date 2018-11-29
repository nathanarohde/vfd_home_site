import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

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
    displayedCartoons: [ ],
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
      this.props.onSetCurrentDisplayedCartoon( this.props.currentDisplayedCartoon + 1 )
    }
  }

  componentDidUpdate( prevProps ) {
    // Redux not available until component did update
    // In these three if scenarios there is no applicable cartoon so it is set to lastCartoon
    if ( this.props.currentDisplayedCartoon === 0 ){
      if (
        this.props.startingPage === undefined ||
        this.props.startingPage === 0 ||
        this.props.startingPage > this.props.lastCartoon ){
          this.props.onSetCurrentDisplayedCartoon(
            this.props.lastCartoon
          );
          this.setDisplayedCartoons( this.props.lastCartoon );
      } else {
        this.props.onSetCurrentDisplayedCartoon(
          parseInt( this.props.startingPage )
        );
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
    if (!this.state.displayedCartoons.includes(cartoon)){
      this.setState( prevState => ({
        displayedCartoons: [...prevState.displayedCartoons, cartoon]
      }))
    }
    // this.asyncGetCartoonData();
  };

  asyncGetCartoonData = () => {
    let url = 'https://raw.githubusercontent.com/nathanarohde/vfd_home_site/master/src/Cartoons/' + this.props.currentDisplayedCartoon + '/cartoon.json';
    axios.get(url)
          .then( response => {
            this.setState({ cartoonData: response.data })
          })
          .catch( error => {
            console.log( error )
          });
  }

  perviousCartoon = () => {
    this.props.onDisplayPreviousCartoon();
  }

  nextCartoon = () => {
    this.props.onDisplayNextCartoon();
  }

  render () {
    let cartoons = <p>Site is loading.</p>

    // console.log(this.props.currentDisplayedCartoon);
    cartoons = this.state.displayedCartoons.map(cartoon => {
      return (
        <Cartoon key={ cartoon } source={ cartoon } />
      )
    })
      // <TitleBox date={ this.state.cartoonData.date } title={ this.state.cartoonData.title }/>
    return (
      <div id="displayField">
        { this.state.displayedCartoons }

        { cartoons }

        { this.props.currentDisplayedCartoon > 1 &&
          <Button disabled={ this.props.currentDisplayedCartoon < 1 }
                  clicked={ this.perviousCartoon }>
            <Link to={`/${parseInt(this.props.currentDisplayedCartoon) - 1 }`}>
                Previous
            </Link>
          </Button>
        }
        { this.props.currentDisplayedCartoon < this.props.lastCartoon  &&
          <Button clicked={ this.nextCartoon }>
            <Link to={`/${parseInt(this.props.currentDisplayedCartoon) + 1 }`}>
                Next
            </Link>
          </Button>
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


export default connect( mapStateToProps, mapDispatchToProps )( Display );
