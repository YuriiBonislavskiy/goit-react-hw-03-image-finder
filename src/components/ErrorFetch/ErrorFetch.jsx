import PropTypes from 'prop-types';
import css from './ErrorFetch.module.css';
import errorImage from './errorFetch.jpg';

const ErrorFetch = ({ massage }) => {
  return (
    <div className={css.errorContainer}>
      <img src={errorImage} alt={massage} />
      <h2>{massage}</h2>
    </div>
  );
};

ErrorFetch.propTypes = {
  massage: PropTypes.string.isRequired,
}

export default ErrorFetch;
