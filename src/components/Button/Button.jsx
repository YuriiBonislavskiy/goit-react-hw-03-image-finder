import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ page, onNextPage }) => {
  const nextPage = () => {
    onNextPage(page);
  };
  return (
    <button type="button" className={css.Button} onClick={nextPage}>
      Load more
    </button>
  );
};
export default Button;

Button.propTypes = {
  page: PropTypes.number.isRequired,
  onNextPage: PropTypes.func.isRequired,
}