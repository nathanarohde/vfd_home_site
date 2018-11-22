import React, { Component, Suspense } from 'react'
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
    cartoons: 5,
    mounted: false,
    cartoon: ''
  }

  componentDidMount() {
    // axios.get('https://github.com/nathanarohde/vfd_home_site/blob/master/src/Cartoons/6/Panels/1.png')
    // .then(response => {
    //   const cartoon
    // })
    // this.setState({ mounted: true })
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
        <Cartoon source={this.state.cartoons}/>
      </div>
    )
  }
}

export default Display;
