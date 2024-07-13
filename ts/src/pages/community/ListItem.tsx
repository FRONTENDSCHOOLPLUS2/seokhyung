import React from 'react';
import { useNavigate } from 'react-router-dom';

const ListItem = ({ item }) => {
  const navigate = useNavigate();
  return (
    <>
      <tr className="transition duration-300 ease-in-out border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700">
        <td className="p-2 text-center">{item._id}</td>
        <td
          className="p-2 truncate cursor-pointer indent-4"
          onClick={() => navigate(`/info/${item._id}`)}
        >
          {item.title}
        </td>
        <td className="p-2 text-center truncate">{item.user.name}</td>
        <td className="hidden p-2 text-center sm:table-cell">{item.views}</td>
        <td className="hidden p-2 text-center sm:table-cell">{item.repliesCount}</td>
        <td className="hidden p-2 text-center truncate sm:table-cell">
          {item.createdAt}
        </td>
      </tr>
    </>
  );
};

export default ListItem;
