import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './Display.css'
import TitleBox from '../../Components/TitleBox/TitleBox';
import Cartoon from '../../Components/Cartoon/Cartoon';
import Button from '../../Components/Button/Button';
import { Link } from 'react-router-dom';
import * as actions from '../../Store/actions';
// import CartoonTotal from '../../Cartoons/Cartoons.json'
// const LazyCartoon = React.lazy(() => import('../../Components/Cartoon/Cartoon'))
// import asyncComponent from '../../hoc/asyncComponent'
// const AsyncImage = asyncComponent(() => {
//   return import('../../Components/Image/Image')
// })

class Display extends Component {
  state = {
    cartoonData: ''
  }

  componentDidMount() {
    // Necessary to make transitions between archive and display work
    // Wrong cartoon will load if startingPage is out of parameters in URL bar
      //  - This is fixed in update because Redux not available on Mount
    if ( this.props.startingPage > 0 ) {
      this.props.onSetDisplayedCartoon(
        // Starting page is a string and therefore must be parsed.
        parseInt(this.props.startingPage)
      );
    }
  }

  componentDidUpdate( prevProps ) {
    // Redux not available until component did update
    // In these three if scenarios there is no applicable cartoon so it is set to lastCartoon
    if ( this.props.startingPage === undefined ||
        this.props.startingPage === 0 ||
        this.props.startingPage > this.props.lastCartoon ){
          this.props.onSetDisplayedCartoon(
            this.props.lastCartoon
          );
    } else {
      this.props.onSetDisplayedCartoon(
        parseInt(this.props.startingPage)
      );
    }

    // Eliminates calls which will fail.
    if ( prevProps.displayedCartoon !== this.props.displayedCartoon &&
        this.props.displayedCartoon !== 0 &&
        this.props.displayedCartoon <= this.props.lastCartoon ){
      this.asyncGetCartoonData();
    }
  }

  asyncGetCartoonData = ( ) => {
    let url = 'https://raw.githubusercontent.com/nathanarohde/vfd_home_site/master/src/Cartoons/' + this.props.displayedCartoon + '/cartoon.json';
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
    // let cartoon = `../../Cartoons/${this.state.cartoons}/Panels/1.png`
      // cartoons = this.state.cartoons.map(cartoon => {
      //   return (
      //     // <AsyncImage key={cartoon} source={cartoon} />
      //   )
      // });

                      // { cartoons }
      // {
      //   this.state.mounted && (
      //     <Suspense fallback={<div>...Loading</div>}>
      //       <LazyCartoon source={ cartoon }>
      //       </LazyCartoon>
      //     </Suspense>
      //   )
      // }

    return (
      <div className="displayField">
        { this.props.lastCartoon > 0 &&
          <div>
            <TitleBox date={ this.state.cartoonData.date } title={ this.state.cartoonData.title }/>
            <Cartoon source={ this.props.displayedCartoon } />
          </div>
        }
        { this.props.displayedCartoon > 1 &&
          <Button disabled={ this.props.displayedCartoon < 1 }
                  clicked={ this.perviousCartoon }>
            <Link to={`/${parseInt(this.props.displayedCartoon) - 1 }`}>
                Previous
            </Link>
          </Button>
        }
        { this.props.displayedCartoon < this.props.lastCartoon  &&
          <Button clicked={ this.nextCartoon }>
            <Link to={`/${parseInt(this.props.displayedCartoon) + 1 }`}>
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
    displayedCartoon: state.displayedCartoon,
    lastCartoon: state.lastCartoon
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDisplayPreviousCartoon: () => dispatch(actions.displayPreviousCartoon()),
    onDisplayNextCartoon: () => dispatch(actions.displayNextCartoon()),
    onSetDisplayedCartoon: (startingPage) => dispatch(actions.setDisplayedCartoon(startingPage))
  }
}


export default connect( mapStateToProps, mapDispatchToProps )( Display );
