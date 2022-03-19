import React from 'react'
import { useParams } from 'react-router-dom'

const Question = () => {
    const { questionID } = useParams()
  return (
    <div>{questionID}</div>
  )
}

export default Question