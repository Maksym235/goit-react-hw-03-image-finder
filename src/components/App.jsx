import React, { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetApi } from './Api/Api';
import { Loader } from 'components/Loader/Loader';
import { LoadMoreBtn } from 'components/Button/Button';

export class App extends Component {
  state = {
    imgName: '',
    images: [],
    status: 'idle',
    error: null,
    isOpen: false,
    url: '',
    page: 1,
    showLoadMore: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, imgName } = this.state;
    const prevName = prevState.imgName;
    const prevPage = prevState.page;

    if (prevName !== imgName || prevPage !== page) {
      this.setState({
        status: 'pending',
      });
      this.getApi();
    }
  }

  getApi = () => {
    const { page, imgName } = this.state;
    return GetApi(imgName, page)
      .then(response => {
        const data = response.data.hits;
        console.log(data);
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

  handlerSubmit = imgName => {
    this.setState({ imgName, images: [] });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  render() {
    const { images, status, error, showLoadMore } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handlerSubmit} />
        {status === 'idle' && <div>enter image name</div>}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <div>{error.message}</div>}
        {status === 'resolved' && <ImageGallery images={images} />}
        {showLoadMore && <LoadMoreBtn loadMore={this.loadMore} />}
        <ToastContainer position="top-center" autoClose={3000} />
      </>
    );
  }
}
