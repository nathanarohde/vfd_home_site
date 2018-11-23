import React, { Component, Suspense } from 'react'
import axios from 'axios'
import './Display.css'
import Cartoon from '../../Components/Cartoon/Cartoon'
import CartoonTotal from '../../Cartoons/Cartoons.json'
// const LazyCartoon = React.lazy(() => import('../../Components/Cartoon/Cartoon'))
// import asyncComponent from '../../hoc/asyncComponent'
// const AsyncImage = asyncComponent(() => {
//   return import('../../Components/Image/Image')
// })


class Display extends Component {
  state = {
    displayedCartoon: null,
    lastCartoon: null,
    firstMount: true,
    cartoonData: ''
  }

  componentDidMount() {
    if (this.state.firstMount === true ){
      axios.get('https://raw.githubusercontent.com/nathanarohde/vfd_home_site/master/src/Cartoons/Cartoons.json')
            .then( response => {
              this.setState({ firstMount: false })
              this.setState({ lastCartoon: response.data.lastCartoon })
              this.setCurrentCartoon( response.data.lastCartoon )
            })
            .catch( error => {
              console.log( error )
            })
            .finally( this.asyncGetCartoonData );
    }
  }

  setCurrentCartoon = ( currentCartoon ) => {
    this.setState({ displayedCartoon: currentCartoon })
  }

  asyncGetCartoonData = ( ) => {
    let url = 'https://raw.githubusercontent.com/nathanarohde/vfd_home_site/master/src/Cartoons/' + this.state.displayedCartoon + '/cartoon.json';

    axios.get(url)
          .then( response => {
            this.setState({ cartoonData: response.data })
          })
          .catch( error => {
            console.log( error )
          });
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
        <div>
          <h2>{ this.state.cartoonData.title }</h2>
          <p>{ this.state.cartoonData.date }</p>
        </div>
        <Cartoon source={ this.state.displayedCartoon }/>
        <button></button>
        <button></button>
      </div>
    )
  }
}

export default Display;
