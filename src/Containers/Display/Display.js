import React, { Component } from 'react'
import './Display.css'
// import CartoonTotal from '../../Cartoons/Cartoons.json'

// {require(`${image}`)}

class Display extends Component {

  render () {
    // const json = '../../Cartoons/6/cartoon.json'
    // const imageTarget = '../../Cartoons/6/Panels/1.png'
    // <img src={ Cartoon } alt="" />
    // { CartoonTotal.lastCartoon }
    // <img src={require(`${imageTarget}`)} />
    // <h2>{ json.title }</h2>
    // <p>{ json.date }</p>
    return (
      <div className="displayField">
          <img src={require('../../Cartoons/6/Panels/1.png')} alt="Cartoon" />
      </div>
    )
  }
}

export default Display;
