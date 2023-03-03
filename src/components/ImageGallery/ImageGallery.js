import React from 'react';
import { ImageGallerySt } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export function ImageGallery({ images }) {
  return (
    <>
      <ImageGallerySt>
        {images.map(img => {
          return <ImageGalleryItem key={img.id} img={img} />;
        })}
      </ImageGallerySt>
    </>
  );
}
