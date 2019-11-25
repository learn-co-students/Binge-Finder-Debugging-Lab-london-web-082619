import React from 'react';

const Episode = (props) => {
  const myEpisode = props.eachEpisode

  return (
    <div>
      Episode {myEpisode.number} - {myEpisode.name}
    </div>
  )
}

export default Episode;
