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
    console.log("Component Did Mount");
    if ( this.props.startingPage !== undefined ){
        this.props.onSetDisplayedCartoon(
          parseInt(this.props.startingPage)
        );
    } else {
      this.props.onSetDisplayedCartoon(
        parseInt(this.props.lastCartoon)
      );
    }
  }

  componentDidUpdate() {
    console.log("Component Did Update");
    if ( this.props.startingPage === undefined ) {
      this.props.onSetDisplayedCartoon(
        parseInt(this.props.lastCartoon)
      );
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
    // console.log(props);
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
        <TitleBox source={ this.props.displayedCartoon }/>
        <Cartoon source={ this.props.displayedCartoon }/>
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
    lastCartoon: state.lastCartoon,
    displayedCartoon: state.displayedCartoon
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
