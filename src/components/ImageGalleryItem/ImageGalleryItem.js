import React from 'react';
import {
  ImageGalleryItemSt,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export function ImageGalleryItem({ img: { id, webformatURL } }) {
  return (
    <ImageGalleryItemSt key={id}>
      <ImageGalleryItemImage src={webformatURL} alt="id" />
    </ImageGalleryItemSt>
  );
}
