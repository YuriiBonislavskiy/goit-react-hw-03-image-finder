import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, tags, index,  }) => {
  return (
    <img
      src={webformatURL}
      className={css.ImageGalleryItemImage}
      alt={tags}
    />
  );
};

export default ImageGalleryItem;