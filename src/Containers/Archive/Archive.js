import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Thumbnail from '../../Components/Thumbnail/Thumbnail';
import axios from 'axios';
import './Archive.css'
import { Link } from 'react-router-dom';

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

const mapStateToProps = state => {
  return {
    currentDisplayedCartoon: state.currentDisplayedCartoon,
    lastCartoon: state.lastCartoon
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     onSetCurrentDisplayedCartoon: (currentCartoon) => dispatch(actions.setCurrentDisplayedCartoon(currentCartoon))
//   }
// }
// , mapDispatchToProps
export default withRouter( connect(mapStateToProps) (Archive) );
