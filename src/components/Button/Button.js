import React from 'react';
import { LoadMore } from './Button.styled';
export function LoadMoreBtn({ loadMore }) {
  return (
    <LoadMore onClick={loadMore} type="button">
      Load more
    </LoadMore>
  );
}
