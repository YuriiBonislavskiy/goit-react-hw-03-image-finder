import { Component } from 'react';
import PropTypes from 'prop-types';
import API from 'Services/SearchDataApi';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import ErrorFetch from '../ErrorFetch';
import Modal from '../Modal';
import Loader from '../Loader';

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
    // prevScrollPos: null,
    showModal: false,
    onViewPicture: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const searchResults = this.state.searchResults;
    const prevSearchText = prevProps.searchText;
    const nextSearchText = this.props.searchText;
    const prevPage = prevProps.page;
    const nextPage = this.props.page;
    const { Base_URL, pageSize, apiKey } = this.state;
    if (prevSearchText !== nextSearchText || prevPage !== nextPage) {
      prevSearchText !== nextSearchText && this.setState({ searchResults: [] });

      this.setState({ status: Status.PENDING });
      API.fetchData(nextSearchText, Base_URL, nextPage, pageSize, apiKey)
        .then(response => {
          const { hits, totalHits } = response;
          this.setState(() => {
            if (totalHits > 0) {
              const fetchResult =
                prevSearchText === nextSearchText
                  ? this.nextWithPrev(searchResults, hits)
                  : this.nextWithOutPrev(hits);
              return {
                searchResults: fetchResult,
                totalHits: totalHits,
                status:
                  fetchResult.length < totalHits
                    ? Status.RESOLVED
                    : Status.RESOLVED_NO_BUTTON,
              };
            }
            return {
              error: `Nothing was found for request <${nextSearchText}>`,
              status: Status.REJECTED,
            };
          });
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
      // .finally(() => {
      //   this.setState({ status: Status.REJECTED, });
      //   console.log(this.state.status);
      // });
      // (() => {
      //   console.log(this.state.status);
      //   this.setState({
      //     status: this.state.error ? Status.REJECTED : this.state.status,
      //   });
      // });
    }
    this.toScrollPos();
  }

  nextPage = page => {
    this.props.handleClick(page + 1);
    // this.setState({
    //   prevScrollPos: document.documentElement.scrollHeight,
    // });
  };

  selectedItemView = selectedId => {
    const { searchResults } = this.state;
    const selectedItem = searchResults.filter(({ id }) => id === selectedId);
    this.setState(state => ({ onViewPicture: selectedItem[0].largeImageURL }));
    this.toggleModal();
  };

  toScrollPos = () => {
    // this.state.prevScrollPos &&
    //   window.scrollTo({
    //     top: this.state.prevScrollPos,
    //     behavior: 'auto',
    //   });
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  nextWithPrev = (searchResults, hits) => {
    searchResults.forEach(result => {
      result.isLoad = true;
    });
    hits.forEach(result => {
      result.isLoad = false;
    });
    return [...searchResults, ...hits];
  };
  nextWithOutPrev = hits => {
    hits.forEach(result => {
      result.isLoad = false;
    });
    return [...hits];
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { searchResults, status, error, showModal, onViewPicture } =
      this.state;
    // if (status === 'resolved' || status === 'resolved_no-button') {
    return (
      <div className={css.galleryContainer}>
        <ul className={css.ImageGallery}>
          {searchResults.map(({ id, webformatURL, tags, isLoad }) => (
            <ImageGalleryItem
              webformatURL={webformatURL}
              tags={tags}
              id={id}
              onSelectedItemView={this.selectedItemView}
              key={id}
              isLoad={isLoad}
            />
          ))}
        </ul>
        {status === 'pending' && <Loader />}
        {status === 'resolved' && (
          <Button page={this.props.page} onNextPage={this.nextPage} />
        )}
        {showModal && (
          <Modal onViewPicture={onViewPicture} onClose={this.toggleModal} />
        )}
        {status === 'rejected' && <ErrorFetch massage={error} />}
      </div>
    );
  }
}
ImageGallery.propTypes = {
  searchText: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

export default ImageGallery;
