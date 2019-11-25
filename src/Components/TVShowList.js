import React, { Component } from 'react';
import {Grid} from 'semantic-ui-react';
import TVShow from './TVShow';

class TVShowList extends Component {

  mapAllShows = () => {
    const {searchTerm, shows} = this.props
    if (searchTerm){
       return shows.map((s) => {
        if (s.name.toLowerCase().includes(searchTerm))
           return (<TVShow show={s} key={s.id} selectShow={() => this.props.selectShow(s)}/> )
        
      })
    }
    return shows.map( (s)=> <TVShow show={s} key={s.id} selectShow={() => this.props.selectShow(s)}/>)

  }

  render() {
    return (
      <div className="TVShowList">
        <Grid>
          {this.mapAllShows()}
        </Grid>
      </div>
    )
  }

}

export default TVShowList;
