import React, { Children } from 'react';
import { createPortal } from 'react-dom';
import { ModalWindow, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }

  closeModal = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  clickToOverlay = evt => {
    if (evt.currentTarget !== evt.target) {
      this.props.onClose();
    }
  };
  render() {
    const { children } = this.props;
    return createPortal(
      <Overlay onClick={this.clickToOverlay}>
        <ModalWindow>{children}</ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}
