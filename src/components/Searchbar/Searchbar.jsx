// import { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { ReactComponent as IconSearch } from '../../Icons/Search.svg';
import { nanoid } from 'nanoid';
import css from './Searchbar.module.css';

export const Searchbar = ({ searchText, onHandleSubmit }) => {
  const initialValues = {
    searchText: '',
  };

  const schema = yup.object().shape({
    searchText: yup.string().required('Required').trim(),
  });

  const handleSubmit = ({searchText}) => {
    onHandleSubmit(searchText.trim());
  };

  const formId = nanoid();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <div className={css.Searchbar}>
        <Form className={css.SearchForm} autoComplete="off">
          <button type="submit" className={css.SearchFormButton}>
            <IconSearch className={css.SearchFormButtonIcon} />
          </button>
          <Field
            id={formId}
            className={css.SearchFormInput}
            type="text"
            name="searchText"
            placeholder="What to find?"
          />
        </Form>
      </div>
    </Formik>
  );
};

Searchbar.protoType = {
  searchText: PropTypes.string.isRequired,
  onHandleSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
