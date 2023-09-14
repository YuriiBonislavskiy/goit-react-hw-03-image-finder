import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import css from './Modal.module.css';

class Modal extends Component {
  state = {
      loading: true,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <img
          src={this.props.onViewPicture}
          className={css.Modal}
          alt=""
          onLoad={() => this.setState({loading: false})}
        />
        {this.state.loading  && <Loader />}
      </div>
    );
  }
}

Modal.propTypes = {
    onViewPicture: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default Modal;