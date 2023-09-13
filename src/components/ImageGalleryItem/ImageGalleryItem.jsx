import React, { useState } from 'react';
// import { ColorRing } from 'react-loader-spinner';
import Loader from './Loader';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, tags, id, onSelectedItemView, isLoad }) => {
  const [loading, setLoading] = useState(false);
  return (
    <li className={css.ImageGalleryItem} key={id}>
      <img
        src={webformatURL}
        className={css.ImageGalleryItemImage}
        alt={tags}
        onClick={() => {
          onSelectedItemView(id);
        }}
        onLoad={() => !isLoad && setLoading(true)}
      />
      {!loading && !isLoad && (
        <Loader/>
      )}
    </li>
  );
};

export default ImageGalleryItem;
