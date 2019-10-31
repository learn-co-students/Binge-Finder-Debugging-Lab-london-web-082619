import React from 'react';

const tvShow = (props) => {
  const handleClick = () => {
    props.selectShow(props.show)
  }

  const getImage = () => {
    return props.show.image ? props.show.image.medium : "#"
  }

  return (
    <div>
      <br/>
      <img src={getImage()} onClick={handleClick} alt=""/>
    </div>
  );
}

export default tvShow;
