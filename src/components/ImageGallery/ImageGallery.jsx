import { Component } from 'react';
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
    // prevPage: 0,
    pageSize: 12,
    apiKey: '38758565-30dff5e0c8e04bcbf19e28f96',
    status: Status.IDLE,
    error: '',
  };

  nextPage = () => {
  const { page } = this.props;
    console.log(`StatePage:  ${this.state.page}`);
    this.props.handleClick(page + 1);
  };

  scrollToMyRef = () => {
    window.scrollTo(0, this.myRef.current.offsetHeight);
  };

  componentDidUpdate(prevProps, prevState) {
    // if (this.state.page === 0) {
    //   this.setState({page: 1,})
    // }
    console.log(this.props);
    console.log(prevProps);
    // const prevSearchText = prevProps.searchText;
    const nextSearchText = this.props.searchText;
    const prevPage = prevProps.page;
    const nextPage = this.props.page;
    // console.log(`prevPage:  ${prevPage}    ${prevSearchText}`);
    // console.log(`nextPage:  ${nextPage}    ${nextSearchText}`);
    const { Base_URL, pageSize, apiKey } = this.state;

    if (prevPage !== nextPage) {
      this.setState({ status: Status.PENDING });
      API.fetchData(nextSearchText, Base_URL, nextPage, pageSize, apiKey)
        .then(({ hits, total }) =>
          this.setState(prevState => {
            if (total > 0) {
              // this.setState({ prevPage: nextPage, });
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
            className={css.Button}
            onClick={this.nextPage}
            // key={'809800oiuouyuijh'}
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
