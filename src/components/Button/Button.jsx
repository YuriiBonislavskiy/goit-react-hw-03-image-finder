import css from './Button.module.css';

const Button = ({ page, onNextPage }) => {
  const nextPage = () => {
    onNextPage(page + 1);
  };
  return (
    <button type="button" className={css.Button} onClick={nextPage}>
      Next
    </button>
  );
};
export default Button;