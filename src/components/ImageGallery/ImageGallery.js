import React from 'react';
import { ImageGallerySt } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import axios from 'axios';
import { Player, Controls } from '@lottiefiles/react-lottie-player';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32809248-e617eb740123e44583fb94c77';

export class ImageGallery extends React.Component {
  state = {
    images: null,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { imgName } = this.props;
    if (prevProps.imgName !== imgName) {
      this.setState({ loading: true });
      axios
        .get(
          `${BASE_URL}?key=${KEY}&page=1&q=${imgName}&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(response =>
          this.setState({
            images: response.data.hits,
            loading: false,
          })
        );
    }
  }
  render() {
    const { imgName } = this.props;
    const { images, loading } = this.state;
    return (
      <ImageGallerySt>
        {loading && (
          <Player
            autoplay
            loop
            src="https://assets6.lottiefiles.com/packages/lf20_qjosmr4w.json"
            style={{ height: '300px', width: '300px' }}
          >
            <Controls
              visible={false}
              buttons={['play', 'repeat', 'frame', 'debug']}
            />
          </Player>
        )}
        {!imgName && <div>enter image name</div>}
        {images &&
          images.map(img => {
            return <ImageGalleryItem key={img.id} img={img} />;
          })}
      </ImageGallerySt>
    );
  }
}

// return (
//   <ImageGallerySt>
//     {images.map(img => {
//       return <ImageGalleryItem key={img.id} img={img} />;
//     })}
//   </ImageGallerySt>
// );
