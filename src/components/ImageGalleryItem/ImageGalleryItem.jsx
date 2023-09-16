import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, tags, id, onSelectedItemView }) => {
  const [loading, setLoading] = useState(true);
  return (
    <li className={css.ImageGalleryItem} key={id}>
      <img
        src={webformatURL}
        className={css.ImageGalleryItemImage}
        alt={tags}
        onClick={() => {
          onSelectedItemView(id);
        }}
        // onLoad={() => !isLoad && setLoading(false)}
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
  isLoad: PropTypes.bool.isRequired,
};

export default ImageGalleryItem;
