import React, { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    imgName: '',
    isLoad: false,
  };

  componentDidUpdate() {}

  handlerSubmit = imgName => {
    this.setState({ imgName });
  };
  render() {
    return (
      <>
        <Searchbar onSubmit={this.handlerSubmit} />
        <ImageGallery imgName={this.state.imgName} />

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <ToastContainer />
      </>
    );
  }
}
