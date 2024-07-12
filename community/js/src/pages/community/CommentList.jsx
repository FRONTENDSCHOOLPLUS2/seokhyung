import React from 'react';
import CommentItem from './CommentItem';
import CommentNew from './CommentNew';
import { detailFetch } from '@hooks/detailFetch';

const CommentList = ({ detailData }) => {
  return (
    <>
      {detailData.replies.map((item) => (
        <CommentItem key={item._id} item={item} />
      ))}
    </>
  );
};

export default CommentList;
