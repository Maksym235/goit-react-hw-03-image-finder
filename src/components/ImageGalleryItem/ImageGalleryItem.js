import React from 'react';
import {
  ImageGalleryItemSt,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends React.Component {
  state = {
    modalOpen: false,
  };

  toggleModal = () => {
    this.setState(({ modalOpen }) => ({ modalOpen: !modalOpen }));
  };

  render() {
    const { modalOpen } = this.state;
    const {
      img: { largeImageURL, webformatURL, id },
    } = this.props;
    return (
      <ImageGalleryItemSt onClick={this.toggleModal} key={id}>
        <ImageGalleryItemImage src={webformatURL} alt="id" />
        {modalOpen && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={id} width="800" height="600" />
          </Modal>
        )}
      </ImageGalleryItemSt>
    );
  }
}
