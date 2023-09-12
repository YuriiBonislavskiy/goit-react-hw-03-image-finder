import React, { Component } from 'react';
import API from 'Services/SearchDataApi';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends Component {
  state = {
    searchResults: [],
    Base_URL: 'https://pixabay.com/api/',
    page: 1,
    pageSize: 16,
    apiKey: '38758565-30dff5e0c8e04bcbf19e28f96',
    status: Status.IDLE,
    error: '',
  };

  nextPage = () => {
    this.setState(prevState => {
      return {
        page: (prevState.page += 1),
      };
    });
  };
  myRef = React.createRef();

  scrollToMyRef = () => {
    window.scrollTo(0, this.myRef.current.offsetHeight);
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchText = prevProps.searchText;
    const nextSearchText = this.props.searchText;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const { Base_URL, pageSize, apiKey } = this.state;

    if (prevSearchText !== nextSearchText || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING });
      API.fetchData(nextSearchText, Base_URL, nextPage, pageSize, apiKey)
        .then(({ hits, total }) =>
          this.setState(prevState => {
            if (total > 0) {
              return {
                searchResults: [...prevState.searchResults, ...hits],
                status: Status.RESOLVED,
              };
            }
            return { error: 'Картинки не найдены', status: Status.REJECTED };
          })
        )
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  render() {
    const { searchResults, status, error } = this.state;
    if (status === 'resolved') {
      return (
        <div>
          <ul className={css.ImageGallery}>
            {searchResults.map(({ id, webformatURL, tags }, index) => (
              <ImageGalleryItem
                webformatURL={webformatURL}
                tags={tags}
                key={id}
              />
            ))}
          </ul>
          <button
            type="button"
            onClick={this.nextPage}
            key={'809800oiuouyuijh'}
          >
            Next
          </button>
        </div>
      );
    }

    if (status === 'rejected') {
      return <p>{error}</p>;
    }
  }
}

export default ImageGallery;
