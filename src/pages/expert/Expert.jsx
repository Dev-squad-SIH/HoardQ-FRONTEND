import { Flex, IconButton, Spacer, Text, useColorMode, useDisclosure, useMediaQuery } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {BiMenu } from 'react-icons/bi'
import { ApiService } from '../../api.services'
import ExpertDrawer from '../../components/expertDrawer'
import ExpertQuestion from '../../components/expertQuestion/ExpertQuestion'
import { FaHome } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { FaMoon,FaSun } from 'react-icons/fa'
const Expert = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen:isSideOpen, onOpen:onSideOpen, onClose:onSideClose } = useDisclosure()
  const btnRef = React.useRef()
  const [isNotSmallerScreen] = useMediaQuery('(min-width:600px)');
  const [expertDetails, setExpertDetails] = useState({})
  const [questions, setQuestions] = useState()
  const [verifiedCount,setVerifiedCount] = useState()
  const navigate = useNavigate()
  useEffect(async () => {
    const token = localStorage.getItem('hoardQToken')
    if (!token) {
      navigate('/')
    }
    const res = await ApiService.getExpertDetails(token)
    setExpertDetails(res.data.expert)
    setQuestions(res.data.expert.questionsAssigned)
    setVerifiedCount(res.data.expert.totalVerified)
  }, [])
  
  return (
      <>
      <Flex>
        <Link to="/">
          <IconButton icon={<FaHome/>} m={isNotSmallerScreen?10:3}/>
        </Link>
          <IconButton onClick={toggleColorMode}icon={colorMode==='light'?<FaMoon/>:<FaSun/>} alignSelf={"center"}></IconButton>
            <Spacer />
              <IconButton m={isNotSmallerScreen?10:3}ref={btnRef} icon={<BiMenu/>} onClick={onSideOpen}></IconButton>
            <ExpertDrawer isOpen={isSideOpen}
              placement='right'
              onClose={onSideClose}
              btnRef={btnRef}
              name={expertDetails.name} email={expertDetails.email} subjects={expertDetails.subjects} totalVerified={verifiedCount}/>
          </Flex>
      {
        typeof questions === 'undefined'?<Text align={"center"}>Loading...</Text>:''
      }
      {
        questions?.length ===0?<Text align={"center"}>No questions assigned</Text>:''
      }
      {
        questions?.map((question, index) => (<ExpertQuestion index={index} setVerifiedCount={setVerifiedCount}key={question._id}question={question} setQuestions={setQuestions}/>))
          }
      

        
      </>
  )
}

export default Expert