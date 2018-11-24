import React from 'react';
import './Cartoon.css'

let cartoon = ( props ) => {
  let source= 'https://github.com/nathanarohde/vfd_home_site/blob/master/src/Cartoons/' + props.source + '/Panels/1.jpg?raw=true'

  return (
    <div className="cartoonBox">
      <img src={ source } alt="Hillarious Cartoon"/>
    </div>
  );
}

export default cartoon;
