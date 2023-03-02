import React from 'react';
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
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };
  render() {
    const { url } = this.props;
    return createPortal(
      <Overlay onClick={this.clickToOverlay}>
        <ModalWindow>
          <img src={url} alt="largeImg" width="800" height="600" />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}
