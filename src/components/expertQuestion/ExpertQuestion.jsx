import { EditIcon } from '@chakra-ui/icons';
import { Box, Button, Container, Flex, IconButton, ScaleFade, Select, Spacer, Tag, Text, useDisclosure, useToast, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { ApiService } from '../../api.services';
import { useSubject } from '../../subjectContext';
import SelectTopics from '../selectTopics';

const ExpertQuestion = ({ index, question, setQuestions,setVerifiedCount }) => {
  const { topics } = useSubject()
  const toast = useToast()
  const { subject, _id:id, description, questionType:type, option, answer, solution } = question;
  const { difficulties } = useSubject()
  const [topicArr, setTopic] = useState([])
  const [difficulty,setDifficulty] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isDropping,setIsDropping] = useState(false)
  const [isFreezing, setIsFreezing] = useState(false)
  const [isFreezable,setIsFreezable] = useState(false)
  useEffect(() => {
    if (topicArr.length && difficulty) setIsFreezable(true)
    return
  }, [topicArr,difficulty])
  
  const freezeHandler = async () => {
    
    setIsFreezing(true)
    const qID = id;
    const token = localStorage.getItem('hoardQToken')
    const data = { topics:topicArr, difficulty }
    const res = await ApiService.freezeQuestion(token, qID,data)
    console.log(res)
    if (res.status === 200) {
      toast({
        title: "Question added successfully!",
        duration: "3000",
        status: "success",
        isClosable:true
      })
      setQuestions(questions =>[...questions.slice(0,index),...questions.slice(index+1)])
      setTopic([])
      setDifficulty('')
      setVerifiedCount(count=>count+1)
    }
    setIsFreezing(false)
    return
  }
  const dropHandler = async () => {
    setIsDropping(true)
    const qID = id;
    const token = localStorage.getItem('hoardQToken')
    const res = await ApiService.dropQuestion(token, qID)
    console.log(res)
    if (res.status === 200) {
      toast({
        title: "Question deleted successfully!",
        duration: "3000",
        status: "success",
        isClosable:true
      })
      setQuestions(questions =>[...questions.slice(0,index),...questions.slice(index+1)])
      setTopic([])
      setDifficulty('')
    }
    setIsDropping(false)
  }
  return (
    <>
        <Container maxW='container.xl' border={"2px"} p={5}mt={5}>
                    <Flex
                    w={"100%"} mb={2}>
                      <Box>
                          <span><b>Subject</b><Tag mx={1}>{subject}</Tag></span>
                          
                        </Box>
                        <Spacer/>
                          <Tag >{type}</Tag>
                    </Flex>
                  
                    <Box m={"3"} fontWeight={"semibold"} mt={6}>
                        <Text as={"u"} fontWeight={"extrabold"}>Question</Text>
                      <Text>{description}</Text>
                    </Box>
                    {type === "MCQs" ? (
                        <VStack align={"flex-start"} m={3}>
                        <Text as={"u"} fontWeight={"extrabold"}>Options</Text>
                      {
                          option.options?.map((option,index) => (
                              <Text key={index}>{`${index+1})`} {option}</Text>
                          ))
                        }
                        
                      </VStack>
                    ) : ''}
                    {type === "Matches" ? (
                    <VStack align={"flex-start"} m={3}>
                      <Flex w={"100%"}alignItems={"center"}>
                            <Text as={'u'} fontWeight={"bold"}>Match</Text>
                            <Spacer/>
                            <IconButton icon={<EditIcon />}/>
                        </Flex>
                        {
                                    [...Array(option.matchOptions?.lhs.length).keys()].map((index) => (
                                        <Flex width={"90%"}>
                                        <Box width={"50%"}>{option.matchOptions?.lhs[index]}</Box>
                                          <Box width={"50%"}>{option.matchOptions?.rhs[index]}</Box>
                                        </Flex>
                                    ))
                        }
                      </VStack>
                      ) : ''}
                      {
                        type !== 'Matches' ? (
                          <VStack alignItems={"flex-start"} mt={6}>
                                    
                                      <Flex w={"100%"}alignItems={"center"}>
                                          <Text as={'u'} fontWeight={"bold"}>Answer</Text>
                                          <Spacer/>
                                          <IconButton icon={<EditIcon />}/>
                                      </Flex>
                                  <Text>{answer}</Text>
                                  </VStack>
                        ):''
                      }
                    
                    <VStack alignItems={"flex-start"} mt={6}>
                        <Flex w={"100%"}alignItems={"center"}>
                            <Text as={'u'} fontWeight={"bold"}>Solution</Text>
                            <Spacer/>
                            <IconButton icon={<EditIcon />}/>
                        </Flex>
                    <Text>{solution}</Text>
                    </VStack>
                <Flex flexWrap={"wrap"}>
                        <VStack align={"flex-start"} >
                            <Flex>
                                <Button mt={5} mr={3} isLoading={isDropping} onClick={()=>dropHandler()}>Drop</Button>
                                <Button mt={5} mr={3}>Edit</Button>
                      <Button mt={5} onClick={onOpen}>Set topics</Button>
                            </Flex>
                            
                          
                          <Select placeholder='Set Difficulty' value={difficulty} onChange={e=>setDifficulty(e.target.value)}>
                                {
                                difficulties?.map(difficulty=>(<option key={difficulty}>{difficulty}</option>))
                                }
                            </Select>
                      <Button mt={5} isLoading={isFreezing} disabled={!isFreezable} onClick={()=>freezeHandler()}>Freeze</Button>
                  </VStack>
                  
                </Flex>
                  
            </Container>
      
      <SelectTopics isOpen={isOpen} onClose={onClose} sub={subject} topics={topics} topicArr={topicArr}setTopic={setTopic}/>
                        </>
    )
}

export default ExpertQuestion