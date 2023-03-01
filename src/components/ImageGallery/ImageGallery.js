import React from 'react';
import { ImageGallerySt } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { GetApi } from 'components/Api/Api';

export class ImageGallery extends React.Component {
  state = {
    images: null,
    status: 'idle',
    error: null,
    isOpen: false,
    url: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { imgName } = this.props;
    if (prevProps.imgName !== imgName) {
      this.setState({ status: 'pending' });
      GetApi(imgName)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            this.setState({
              images: response.data.hits,
              status: 'resolved',
            });
          }
        })
        .catch(error =>
          this.setState({
            error,
            status: 'rejected',
          })
        );
    }
  }

  openModal = imgUrl => {
    this.setState({ isOpen: true, url: imgUrl });
  };

  closeModal = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const { images, status, error, url, isOpen } = this.state;

    if (status === 'idle') {
      return <div>enter image name</div>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <div>{error.message}</div>;
    }

    if (status === 'resolved') {
      return (
        <ImageGallerySt>
          {images.map(img => {
            return (
              <ImageGalleryItem
                onClick={this.openModal}
                key={img.id}
                img={img}
              />
            );
          })}
          {isOpen && <Modal onClose={this.closeModal} url={url} />}
        </ImageGallerySt>
      );
    }
  }
}
