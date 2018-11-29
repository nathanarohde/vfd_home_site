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
      this.props.onSetCurrentDisplayedCartoon( this.props.currentDisplayedCartoon + 1 )
      // this.asyncGetCartoonData( this.props.currentDisplayedCartoon + 1 );
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

  perviousCartoon = () => {
    this.props.onDisplayPreviousCartoon();
  }

  nextCartoon = () => {
    this.props.onDisplayNextCartoon();
  }

  //   // <TitleBox date={ data.date } title={ data.title } />
  //   return (
  //     <div key={cartoon}>
  //       <Cartoon key={ cartoon } source={ cartoon } />
  //     </div>
  //   )
  // })
    // <TitleBox date={ this.state.cartoonData.date } title={ this.state.cartoonData.title }/>
    // console.log(this.props.currentDisplayedCartoon);
    // return (
    //   <div key={cartoon}>
    //     <p>cartoon</p>
    //   </div>
    // )

    // cartoons = this.state.displayedCartoons.map(cartoon => {
    // };

  render () {
    let cartoons = <p>Site is loading.</p>

    if (Object.keys(this.state.displayedCartoons).length){
        // console.log(this.state.displayedCartoons);
        cartoons = Object.keys(this.state.displayedCartoons).map( cartoon => {
          return (
            <div key={cartoon}>
              <TitleBox date={ this.state.displayedCartoons[cartoon].date } title={ this.state.displayedCartoons[cartoon].title }/>
              <Cartoon key={ cartoon } source={ cartoon } />
            </div>
          )
        })
    }

    return (
      <div id="displayField">
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
