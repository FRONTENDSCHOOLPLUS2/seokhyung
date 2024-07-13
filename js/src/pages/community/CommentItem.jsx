import useUserStore from '@zustand/store';
import { apiURL } from '../../api/apiURL';
import React from 'react';
const CommentItem = ({ item }) => {
  console.log(item);
  const { userIdGlobal } = useUserStore();
  const eachBoardId = item.user._id;
  return (
    <div className="p-4 mb-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-2">
        <img
          className="w-8 mr-2 rounded-full"
          src={`${apiURL}${item.user.profile.path}`}
          alt="replies_user_profile"
        />
        <a href="" className="text-orange-400">
          {item.user.name}
        </a>
        <time className="ml-auto text-gray-500" dateTime="2024.07.02 14:11:22">
          {item.createdAt}
        </time>
      </div>
      <pre className="text-sm whitespace-pre-wrap">{item.content}</pre>

      {/* 본인 댓글만 삭제 가능 */}

      {eachBoardId === userIdGlobal ? (
        <button
          type="button"
          className="px-4 py-1 ml-2 text-sm font-semibold text-white bg-red-500 rounded hover:bg-amber-400"
        >
          삭제
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

export default CommentItem;
