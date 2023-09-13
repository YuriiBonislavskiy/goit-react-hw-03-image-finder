import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

class App extends Component {
  state = {
    searchText: '',
    Base_URL: '',
    page: 1,
    pageSize: 0,
  };

  handleSubmit = text => {
    this.setState({ searchText: text, page: 1 });
  };

  handleClick = (page) => {
    this.setState({ page });
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
        />
      </div>
    );
  }
}

export default App;
