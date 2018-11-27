import React, { Component } from 'react';
import Thumbnail from '../../Components/Thumbnail/Thumbnail';
import axios from 'axios';
import './Archive.css'
import { Link } from 'react-router-dom';
// import asyncComponent from '../../hoc/asyncComponent'
// const AsyncThumbnail = asyncComponent(() => {
//   return import('../../Components/Thumbnail/Thumbnail')
// })

class Archive extends Component {
  state = {
    firstMount: true,
    lastCartoon: 0
  }

  componentDidMount() {
    if (this.state.firstMount === true ){
      axios.get('https://raw.githubusercontent.com/nathanarohde/vfd_home_site/master/src/Cartoons/Cartoons.json')
            .then( response => {
              this.setState({ firstMount: false });
              this.setState({ lastCartoon: response.data.lastCartoon });
            })
            .catch( error => {
              console.log( error )
            })
            // .finally( this.getThumbnails );
    }
  }

  getThumbnails = () => {
    let thumbnails = []

    for ( let i = this.state.lastCartoon; i > 0; i--) {
      thumbnails.push(
        <Link key={ i } to={`/${i}`}>
          <Thumbnail key={ i } source={ i }/>
        </Link>
      )
    }

    return thumbnails;
  }

  render () {
    return (
        <div>
          { this.state.lastCartoon !== 0 &&
            <div>{ this.getThumbnails() }</div>
          }
        </div>
    )
  }
}

export default Archive;
