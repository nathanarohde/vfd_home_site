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
    lastCartoon: 6,
    firstMount: false,
    cartoon: ''
  }

  componentDidMount() {
    if (this.state.firstMount === false ){
      let url = 'https://raw.githubusercontent.com/nathanarohde/vfd_home_site/master/src/Cartoons/' + this.state.lastCartoon + '/cartoon.json'
      axios.get(url)
      .then(response => {
        this.setState({ cartoon: response.data})
      })
      .catch( error => {
        console.log( error )
      });
      console.log(this.state.cartoon);
      this.setState({ firstMount: true })
    }
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
          <h2>{ this.state.cartoon.title }</h2>
          <p>{ this.state.cartoon.date }</p>
        </div>
        <Cartoon source={ this.state.lastCartoon }/>
      </div>
    )
  }
}

export default Display;
