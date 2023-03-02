import React from 'react';
import { ImageGallerySt } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { GetApi } from 'components/Api/Api';
import { LoadMoreBtn } from 'components/Button/Button';

export class ImageGallery extends React.Component {
  state = {
    images: [],
    status: 'idle',
    error: null,
    isOpen: false,
    url: '',
    page: 1,
    showLoadMore: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { imgName } = this.props;
    const { page } = this.state;

    if (prevProps.imgName !== imgName) {
      this.setState({
        images: [],
      });
    }
    if (prevProps.imgName !== imgName || prevState.page !== page) {
      this.setState({
        status: 'pending',
      });
      this.getApi();
    }
  }

  getApi = () => {
    const { page } = this.state;
    const { imgName } = this.props;
    return GetApi(imgName, page)
      .then(response => {
        const data = response.data.hits;
        console.log(response);
        this.setState(prevState => ({
          images: [...prevState.images, ...data],
          showLoadMore: page < Math.ceil(response.data.totalHits / 12),
        }));
      })
      .catch(error =>
        this.setState({
          error,
          status: 'rejected',
        })
      )
      .finally(
        this.setState({
          status: 'resolved',
        })
      );
  };

  openModal = imgUrl => {
    this.setState({ isOpen: true, url: imgUrl });
  };

  closeModal = () => {
    this.setState({
      isOpen: false,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, status, error, url, isOpen, showLoadMore } = this.state;
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
        <>
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
          {showLoadMore && <LoadMoreBtn loadMore={this.loadMore} />}
        </>
      );
    }
  }
}
