import React, { Component } from 'react'
import axios from 'axios'
import './Display.css'
import TitleBox from '../../Components/TitleBox/TitleBox'
import Cartoon from '../../Components/Cartoon/Cartoon'
import Button from '../../Components/Button/Button'
// import CartoonTotal from '../../Cartoons/Cartoons.json'
// const LazyCartoon = React.lazy(() => import('../../Components/Cartoon/Cartoon'))
// import asyncComponent from '../../hoc/asyncComponent'
// const AsyncImage = asyncComponent(() => {
//   return import('../../Components/Image/Image')
// })


class Display extends Component {
  state = {
    displayedCartoon: 0,
    lastCartoon: 0,
    firstMount: true,
    cartoonData: ''
  }

  componentDidMount() {
    if (this.state.firstMount === true ){
      axios.get('https://raw.githubusercontent.com/nathanarohde/vfd_home_site/master/src/Cartoons/Cartoons.json')
            .then( response => {
              this.setState({ firstMount: false })
              this.setState({ lastCartoon: response.data.lastCartoon })
              this.setState({ displayedCartoon: response.data.lastCartoon })
            })
            .catch( error => {
              console.log( error )
            })
            .finally( this.asyncGetCartoonData );
    }
  }

  // componentDidUpdate() {
  //   if (this.state.firstMount === false ){
  //       this.asyncGetCartoonData();
  //   }
  // }

  asyncGetCartoonData = ( ) => {
    let url = 'https://raw.githubusercontent.com/nathanarohde/vfd_home_site/master/src/Cartoons/' + this.state.displayedCartoon + '/cartoon.json';
    // console.log(this.state.displayedCartoon);

    axios.get(url)
          .then( response => {
            this.setState({ cartoonData: response.data })
            // console.log(this.state.cartoonData);
          })
          .catch( error => {
            console.log( error )
          });
  }

  perviousCartoon = () => {
    this.setState({ displayedCartoon: this.state.displayedCartoon - 1 })
    // this.asyncGetCartoonData();
    // console.log(this.state.displayedCartoon)
  }

  nextCartoon = () => {
    this.setState({ displayedCartoon: this.state.displayedCartoon + 1 })
    // this.asyncGetCartoonData();
    // console.log(this.state.displayedCartoon)
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
        { this.state.displayedCartoon !== 0 &&
          <div>
            <TitleBox title={ this.state.cartoonData.title } date={ this.state.cartoonData.date }/>
            <Cartoon source={ this.state.displayedCartoon }/>
          </div>
        }
        <Button disabled={ this.state.displayedCartoon <= 1 }
                clicked={ this.perviousCartoon }>
                Previous
        </Button>
        <Button disabled={ this.state.displayedCartoon === this.state.lastCartoon }
                clicked={ this.nextCartoon }>
                Next
        </Button>
      </div>
    )
  }
}

export default Display;
