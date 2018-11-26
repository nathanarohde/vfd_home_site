import React from 'react'

const thumbnail = (props) => {
  let source = 'https://github.com/nathanarohde/vfd_home_site/blob/master/src/Cartoons/' + props.source + '/thumb.jpg?raw=true';

  return (
    <img className="thumbnail" src={ source } alt="cartoon thumbnail"/>
  )
}

export default thumbnail;
