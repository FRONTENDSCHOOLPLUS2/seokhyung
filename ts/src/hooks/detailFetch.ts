import { useParams } from 'react-router-dom'
import { getDetailBoards } from '../api/board/getDetailBoard'
import { useEffect, useState } from 'react'

export type RepliesForm = {
  content: string
  createdAt: string
  updatedAt: string
  user: {
    _id: number
    name: string
    profile: {
      name: string
      originalname: string
      path: string
    }
  }
  _id: number
}

export type DetailDataForm = {
  content: string
  createdAt: string
  seller_id?: null
  tag: string
  replies?: RepliesForm[]
  title: string
  type: string
  updatedAt: string
  user: {
    name: string
    profile: string
    _id: number
  }
  views: number
  _id: number
}

export const detailFetch = () => {
  const { _id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [detailData, setDetailData] = useState<DetailDataForm>()

  useEffect(() => {
    getDetailBoards(_id).then(rs => {
      setDetailData(rs.item)
    })
  }, [])
  const onSetDetailData = (value: DetailDataForm) => {
    if (detailData !== undefined) {
      setDetailData([...detailData, value])
    }
  }

  return { detailData, onSetDetailData }
}
