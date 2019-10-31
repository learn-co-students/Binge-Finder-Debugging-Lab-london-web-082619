import React, { Component } from 'react';
import Adapter from '../Adapter';
import TVShowList from './TVShowList';
import Nav from './Nav';
import SelectedShowContainer from './SelectedShowContainer';
import { Grid } from 'semantic-ui-react';



class App extends Component {
  state = {
    shows: [],
    resultsPage: 0,
    searchTerm: "",
    selectedShow: "",
    episodes: [],
    filterByRating: "",
  }

  componentDidMount = () => {
    Adapter.getShows(this.state.resultsPage)
      .then(shows => {
        this.setState(previousState => {
          return {
            shows: shows,
            resultsPage: previousState.resultsPage + 1
          }
        });
      });
  }

  componentDidUpdate = () => {
    // window.scrollTo(0, 0);
  }

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value.toLowerCase() })
  }

  handleFilter = (e) => {
    e.target.value === "No Filter" ? this.setState({ filterByRating:"" }) : this.setState({ filterByRating: e.target.value})
  }

  handleScroll = () => {
    const pageHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPosition = window.scrollY;

    if (scrollPosition === pageHeight) {
      Adapter.getShows(this.state.resultsPage)
        .then(shows => {
          this.setState(previousState => {
            return {
              shows: [...previousState.shows, ...shows],
              resultsPage: previousState.resultsPage + 1
            }
          });
        });
    }
  }
  
  selectShow = (show) => {
    Adapter.getShowEpisodes(show.id)
    .then((episodes) => this.setState({
      selectedShow: show,
      episodes: episodes
    }))
  }

  displayShows = () => {
    const shows = this.state.shows.filter(show => {
      return show.name.toLowerCase().includes(this.state.searchTerm)
    });

    if (this.state.filterByRating !== "") {
      return shows.filter((s)=> {
        return s.rating.average >= Number(this.state.filterByRating)
      })
    } else {
      return shows
    }
  }

  render (){
    return (
      <div>
        <Nav handleFilter={this.handleFilter} handleSearch={this.handleSearch} searchTerm={this.state.searchTerm}/>
        <Grid celled>
          <Grid.Column width={5}>
            {!!this.state.selectedShow ? <SelectedShowContainer selectedShow={this.state.selectedShow} allEpisodes={this.state.episodes}/> : <div/>}
          </Grid.Column>
          <Grid.Column width={11}>
            <TVShowList shows={this.displayShows()} selectShow={this.selectShow} searchTerm={this.state.searchTerm} handleScroll={this.handleScroll} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
