// import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import Loader from '../Loader';
import css from './ImageGalleryItem.module.css';

// const ImageGalleryItem = ({ webformatURL, tags, id, onSelectedItemView, setLoading, curentTotalResults, index }) => {
const ImageGalleryItem = ({ webformatURL, tags, id, onSelectedItemView}) => {
  // const [loading, setLoading] = useState(true);
  // const fuulLoading = index  === curentTotalResults - 1; 
  // console.log(curentTotalResults, '   ', index + 1, '  ', fuulLoading);
  return (
    <li className={css.ImageGalleryItem} key={id}>
      <img
        src={webformatURL}
        className={css.ImageGalleryItemImage}
        alt={tags}
        onClick={() => {
          onSelectedItemView(id);
        }}
        // onLoad={() => fuulLoading && setLoading()}
      />
      {/* {loading && !isLoad && (
        <Loader/>
      )} */}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onSelectedItemView: PropTypes.func.isRequired,
  // isLoad: PropTypes.bool.isRequired,
};

export default ImageGalleryItem;
