import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import TVShow from './TVShow'

class TVShowList extends Component {

  mapAllShows = (props) => {
    if (!!props.searchTerm) {
      props.shows.map((s) =>
        s.name.toLowerCase().includes(props.searchTerm) ? <TVShow show={s} key={s.id} selectShow={props.selectShow} /> : null
      )
    }
    return props.shows.map((s) => <TVShow show={s} key={s.id} selectShow={() => props.selectShow(s)} />)
  }

  render() {
    return (
      <div className="TVShowList">
        <Grid>
          {this.mapAllShows(this.props)}
        </Grid>
      </div>
    )
  }

}

export default TVShowList;
