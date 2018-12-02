import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Thumbnail from '../../Components/Thumbnail/Thumbnail';
import './Archive.css'
import { Link } from 'react-router-dom';

class Archive extends Component {

  getThumbnails = () => {
    let thumbnails = []

    for ( let i = this.props.lastCartoon; i > 0; i--) {
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
          { this.props.lastCartoon !== 0 &&
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

export default withRouter( connect(mapStateToProps) (Archive) );
