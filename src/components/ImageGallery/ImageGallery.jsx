import { Component } from 'react';
import PropTypes from 'prop-types';
import API from 'Services/SearchDataApi';
import css from './ImageGallery.module.css';
// import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
// import ErrorFetch from '../ErrorFetch';
// import Modal from '../Modal';

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
    prevScrollPos: null,
    showModal: false,
    onViewPicture: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchText = prevProps.searchText;
    const nextSearchText = this.props.searchText;
    const prevPage = prevProps.page;
    const nextPage = this.props.page;
    const { searchResults, Base_URL, pageSize, apiKey } = this.state;

    if (prevSearchText !== nextSearchText || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING });

      API.fetchData(nextSearchText, Base_URL, nextPage, pageSize, apiKey)
        .then(response => {
          const { hits, totalHits } = response;
          this.setState({
            searchResults: [...searchResults, ...hits],
            totalHits: totalHits,
            status: Status.RESOLVED,
          });
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  nextPage = page => {
    this.props.handleClick(page + 1);
    this.setState({
      prevScrollPos: document.documentElement.scrollHeight,
    });
  };

  selectedItemView = selectedId => {
    const { searchResults } = this.state;
    const selectedItem = searchResults.filter(({ id }) => id === selectedId);
    this.setState(state => ({ onViewPicture: selectedItem[0].largeImageURL }));
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { searchResults } = this.state;
    return (
      <div className={css.galleryContainer}>
        <ul className={css.ImageGallery}>
          {searchResults.map(({ id, webformatURL, tags }) => (
            <li className={css.ImageGalleryItem} key={id}>
              <img
                src={webformatURL}
                className={css.ImageGalleryItemImage}
                alt={tags}
              />
            </li>
          ))}
        </ul>
        <Button page={this.props.page} onNextPage={this.nextPage} />
      </div>
    );
    // }
  }
}
ImageGallery.propTypes = {
  searchText: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

export default ImageGallery;
