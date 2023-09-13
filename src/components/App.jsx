import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

class App extends Component {
  state = {
    searchText: '',
    searchResults: [],
    Base_URL: '',
    page: 0,
    pageSize: 0,
  };

  handleSubmit = text => {
    this.setState({ searchText: text, searchResults: [], page: 1 });
  };

  handleClick = (searchResults, page) => {
    this.setState({ searchResults, page });
  };

  render() {
    const { searchText } = this.state;
    return (
      <div>
        <Searchbar searchText={searchText} onHandleSubmit={this.handleSubmit} />
        <ImageGallery
          searchText={searchText}
          handleClick={this.handleClick}
          page={this.state.page}
          searchResults={this.state.searchResults}
        />
      </div>
    );
  }
}

export default App;
