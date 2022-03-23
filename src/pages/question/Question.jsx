import { VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ApiService } from '../../api.services'
import FilterQuestionCard from '../../components/filterQuestionCard'
const Question = () => {
  const { questionID } = useParams()
  const [question,setQuestion] = useState()
  useEffect(async() => {
    const res = await ApiService.getQuestionDetails(questionID)
    console.log(res.data.question)
    setQuestion(res.data.question)
  },[])
  
  return (
    <VStack m={3}>
      {question ? <FilterQuestionCard question={question} /> : ''}
    </VStack>
  )
}

export default Question