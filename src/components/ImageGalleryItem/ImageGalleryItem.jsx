import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, tags, id  }) => {
  return (
    <li className={css.ImageGalleryItem} key={id}>
      <img
        src={webformatURL}
        className={css.ImageGalleryItemImage}
        alt={tags}
      />
    </li>
  );
};

export default ImageGalleryItem;