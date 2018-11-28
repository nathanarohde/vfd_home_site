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
    firstMount: true,
    cartoonData: ''
  }

  componentDidMount() {
    // this.props.onGetLastCartoon(), () => console.log(this.props.lastCartoon);
    if (this.props.currentPage === undefined ){
      // this.setState({ displayedCartoon: this.state.lastCartoon });
      console.log( 'Did Mount is: ' + this.props.currentPage )
    }

    if (this.state.firstMount === true ){
      // axios.get('https://raw.githubusercontent.com/nathanarohde/vfd_home_site/master/src/Cartoons/Cartoons.json')
      //       .then( response => {
      //         this.setState({ firstMount: false });
            //   this.setState({ lastCartoon: response.data.lastCartoon }, () => this.setDisplayedCartoon());
            // })
            // .catch( error => {
            //   console.log( error )
            // })
            // .finally( this.asyncGetCartoonData );
    }
  }

  componentDidUpdate() {
    // if (this.props.displayed !== 0){
    //   this.asyncGetCartoonData();
    // }

    if (this.props.currentPage === undefined ){
      // this.setState({ displayedCartoon: this.state.lastCartoon });
      console.log( 'Did Update is: ' + this.props.currentPage )
    }
  }

  // setDisplayedCartoon = ( ) => {
  //   // if currentPage is less than last cartoon display currentPage
  //   if ( this.state.lastCartoon > this.props.currentPage ) {
  //     this.setState({ displayedCartoon: this.props.currentPage });
  //   // else display the last cartoon
  //   } else {
  //     this.setState({ displayedCartoon: this.state.lastCartoon });
  //   }
  // }

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
        { this.props.dispalyedCartoon !== 0 &&
          <div>
            <TitleBox title={ this.state.cartoonData.title } date={ this.state.cartoonData.date }/>
            <Cartoon source={ this.props.displayedCartoon }/>
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
    lastCartoon: state.lastCartoon,
    displayedCartoon: state.displayedCartoon
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDisplayPreviousCartoon: () => dispatch(actions.displayPreviousCartoon()),
    onDisplayNextCartoon: () => dispatch(actions.displayNextCartoon())
    // onSetDisplayedCartoon: () => dispatch(actions.setDisplayedCartoon())
  }
}


export default connect( mapStateToProps, mapDispatchToProps )( Display );
