import { Component } from 'react';
import API from 'Services/SearchDataApi';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  RESOLVED_NO_BUTTON: 'resolved_no-button',
  REJECTED: 'rejected',
};

class ImageGallery extends Component {
  state = {
    searchResults: [],
    totalHits: 0,
    Base_URL: 'https://pixabay.com/api/',
    pageSize: 12,
    apiKey: '38758565-30dff5e0c8e04bcbf19e28f96',
    status: Status.IDLE,
    error: '',
  };

  nextPage = page => {
    // const { page } = this.props;
    const { searchResults } = this.state;
    this.props.handleClick(searchResults, page);
  };

  selectedItemView = selectedId => {
    const { searchResults } = this.state;
    const selectedItem = searchResults.filter(({ id }) => id === selectedId);
    console.log(selectedItem);
  };

  componentDidUpdate(prevProps, prevState) {
    const searchResults = this.props.searchResults;
    const prevSearchText = prevProps.searchText;
    const nextSearchText = this.props.searchText;
    const prevPage = prevProps.page;
    const nextPage = this.props.page;
    const { Base_URL, pageSize, apiKey } = this.state;

    if (prevSearchText !== nextSearchText || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING });
      API.fetchData(nextSearchText, Base_URL, nextPage, pageSize, apiKey)
        .then(response => {
          const { hits, totalHits } = response;
          this.setState(() => {
            if (totalHits > 0) {
              const fetchResult = [...searchResults, ...hits];
              return {
                searchResults: fetchResult,
                totalHits: totalHits,
                status:
                  fetchResult.length < totalHits
                    ? Status.RESOLVED
                    : Status.RESOLVED_NO_BUTTON,
              };
            }
            return { error: 'Картинки не найдены', status: Status.REJECTED };
          });
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  render() {
    const { searchResults, status, error, totalHits } = this.state;
    console.log(status, '   ', searchResults.length, '  ', totalHits);
    if (status === 'resolved' || status === 'resolved_no-button') {
      return (
        <div>
          <ul className={css.ImageGallery}>
            {searchResults.map(({ id, webformatURL, tags }, index) => (
              <ImageGalleryItem
                webformatURL={webformatURL}
                tags={tags}
                id={id}
                onSelectedItemView={this.selectedItemView}
                key={id}
              />
            ))}
          </ul>
          {status === 'resolved' && (
            <Button page={this.props.page} onNextPage={this.nextPage} />
          )}
        </div>
      );
    }

    if (status === 'rejected') {
      return <p>{error}</p>;
    }
  }
}

export default ImageGallery;
