import React from 'react';

let image = ( props ) => {
  // let source= 'https://github.com/nathanarohde/vfd_home_site/blob/master/src/Cartoons/' + props.cartoons + '/Panels/1.png?raw=true'
  // let source= '../../Cartoons/' + props.source + '/Panels/1.png';
  // let source = '../../Cartoons/6/Panels/1.png'

  return (
    <img src={source}/>
    // <img src={require('../../Cartoons/6/Panels/1.png')} alt="cartoon" />
    // <img src={require(`${props.source}`)} alt="cartoon" />
  );
}

export default image;
