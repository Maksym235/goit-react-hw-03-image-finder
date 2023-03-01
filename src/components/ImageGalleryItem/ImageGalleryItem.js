import React from 'react';
import {
  ImageGalleryItemSt,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export function ImageGalleryItem({
  img: { id, webformatURL, largeImageURL },
  onClick,
}) {
  return (
    <ImageGalleryItemSt onClick={() => onClick(largeImageURL)} key={id}>
      <ImageGalleryItemImage src={webformatURL} alt="id" />
    </ImageGalleryItemSt>
  );
}
