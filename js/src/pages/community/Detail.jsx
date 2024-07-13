import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CommentList from './CommentList';
import CommentNew from './CommentNew';
import { detailFetch } from '@hooks/detailFetch';
import { deleteBoardApi } from '../../api/board/deleteBoard';
import useUserStore from '@zustand/store';

const Detail = () => {
  const navigate = useNavigate();
  const { detailData, onSetDetailData } = detailFetch();
  const { accessTokenGlobal } = useUserStore();
  if (!detailData) {
    return null;
  }
  const { _id } = useParams();

  const handleDeleteBtn = async (id, token) => {
    await deleteBoardApi(id, token).then(() => {
      navigate('/info');
    });
  };
  return (
    <main className="container px-4 mx-auto mt-4">
      <section className="p-4 mb-8">
        <div className="text-xl font-semibold">{detailData.title}</div>
        <div className="text-right text-gray-400"></div>
        <div className="mb-4">
          <div>
            <pre className="w-full p-2 whitespace-pre-wrap font-roboto">
              {detailData.content}
            </pre>
          </div>
          <hr />
        </div>
        <div className="flex justify-end my-4">
          <button
            type="button"
            className="px-4 py-1 ml-2 text-base font-semibold text-white bg-orange-500 rounded hover:bg-amber-400"
            onClick={() => history.back()}
          >
            목록
          </button>
          <button
            type="button"
            className="px-4 py-1 ml-2 text-base font-semibold text-white bg-gray-900 rounded hover:bg-amber-400"
            onClick={() =>
              navigate(`/info/${_id}/edit`, {
                state: {
                  title: detailData.title,
                  content: detailData.content,
                },
              })
            }
          >
            수정
          </button>
          <button
            type="button"
            className="px-4 py-1 ml-2 text-base font-semibold text-white bg-red-500 rounded hover:bg-amber-400"
            onClick={() => handleDeleteBtn(_id, accessTokenGlobal)}
          >
            삭제
          </button>
        </div>
      </section>

      {/* 댓글 목록 */}
      <section className="mb-8">
        {/* <h4 className="mt-8 mb-4 ml-2">{`댓글 ${detailData.replies.length}개`}</h4> */}
        {/* 댓글 */}
        {detailData.replies ? (
          <CommentList
            detailData={detailData}
            onSetDetailData={onSetDetailData}
            boardId={detailData._id}
          />
        ) : (
          ''
        )}

        {/* 댓글 입력 */}
        <CommentNew
          detailData={detailData}
          onSetDetailData={onSetDetailData}
          boardId={detailData._id}
        />
      </section>
    </main>
  );
};

export default Detail;
