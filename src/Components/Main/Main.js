import React from 'react';
import Display from '../../Containers/Display/Display'

const main = (props) => {
  return (
    <main className="Wrapper">
        <Display currentPage={ props.match.params.id }/>
    </main>
  )
}

export default main;
