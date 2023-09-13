import React, { useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
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
        <div className={css.loader}>
          <ColorRing
            visible={true}
            height="200"
            width="200"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </div>
      )}
    </li>
  );
};

export default ImageGalleryItem;
