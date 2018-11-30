import React from 'react'
import './TitleBox.css'

const titleBox = ( props ) => {

  return (
    <div className='titleBox'>
      <h2>{ props.title }</h2>
      <p>{ props.date }</p>
    </div>
  )

}

export default titleBox;
