import React from 'react';

const TVShow = (props) => {
  const {show, selectShow} = props
  return (
    <div>
      <br/>
      <img src={show.image.medium} onClick={selectShow} alt=""/>
    </div>
  );
}

export default TVShow;
