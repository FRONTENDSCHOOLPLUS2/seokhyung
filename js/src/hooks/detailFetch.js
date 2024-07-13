import { useParams } from 'react-router-dom';
import { getDetailBoards } from '../api/board/getDetailBoard';
import { useEffect, useState } from 'react';

export const detailFetch = () => {
  const { _id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [detailData, setDetailData] = useState(null);

  useEffect(() => {
    getDetailBoards(_id).then((rs) => {
      setDetailData(rs.item);
    });
  }, []);
  const onSetDetailData = (value) => {
    setDetailData([...detailData, value]);
  };

  return { detailData, onSetDetailData };
};
