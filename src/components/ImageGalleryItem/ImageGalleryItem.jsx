import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, tags, id, onSelectedItemView }) => {
  return (
    <li className={css.ImageGalleryItem} key={id}>
      <img
        src={webformatURL}
        className={css.ImageGalleryItemImage}
        alt={tags}
        onClick={() => {
          onSelectedItemView(id);
        }}
      />
    </li>
  );
};

export default ImageGalleryItem;
