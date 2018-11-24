import React from 'react'

const titleBox = ( props ) => {

  return (
    <div>
      <h2>{ props.title }</h2>
      <p>{ props.date }</p>
    </div>
  )
}

export default titleBox;
