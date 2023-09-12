import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

class App extends Component {
  state = {
    searchText: '',
    Base_URL: '',
    page: 0,
    pageSize: 0,
  };

  handleSubmit = text => {
    this.setState({ searchText: text });
  };

  render() {
    // console.log(this.state.searchText);
    const { searchText } = this.state;
    return (
      <div>
        <Searchbar searchText={searchText} onHandleSubmit={this.handleSubmit} />
        <ImageGallery searchText={searchText} />
      </div>
    );
  }
}

export default App;
