import { ColorRing } from 'react-loader-spinner';
import css from './ImageGalleryItem.module.css';

const Loader = () => {
  return (
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
  );
};

export default Loader;
