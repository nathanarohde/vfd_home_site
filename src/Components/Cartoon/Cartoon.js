import React from 'react';

let cartoon = ( props ) => {
  let source= 'https://github.com/nathanarohde/vfd_home_site/blob/master/src/Cartoons/' + props.source + '/Panels/1.jpg?raw=true'

  return (
    <img src={ source } alt="Hillarious Cartoon"/>
  );
}

export default cartoon;
