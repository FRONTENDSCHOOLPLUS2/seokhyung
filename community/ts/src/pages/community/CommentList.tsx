import CommentItem from './CommentItem';
import { DetailDataForm, RepliesForm } from '@/hooks/detailFetch';

const CommentList = ({ detailData }: DetailDataForm) => {
  return (
    <>
      {detailData.replies.map((item: RepliesForm) => (
        <CommentItem key={item._id} item={item} />
      ))}
    </>
  );
};

export default CommentList;
