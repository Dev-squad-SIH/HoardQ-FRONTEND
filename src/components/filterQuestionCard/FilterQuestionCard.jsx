import { LinkIcon } from '@chakra-ui/icons';
import { Box, Button, Container, Flex, IconButton, Spacer, Tag, Text, VStack,useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {FRONT_URL} from '../../config'
const FilterQuestionCard = ({ question }) => {
    const { subject, topics, difficulty, description, questionType:type,_id:id, option:options, answer, solution } = question;
    console.log( subject, topics, difficulty, description, type,options,answer,solution)
    const [openAnswer,setOpenAnswer] = useState(false)
  const [openSoln, setOpenSoln] = useState(false)
  const toast = useToast();
  const questionLink = () => {
    navigator.clipboard.writeText(`${FRONT_URL}question/${id}`)
    toast({
            title: `Link copied to clipboard`,
            status: 'success',
            isClosable: true,
            duration: 1000,
    })
  }
    return (
    <Container maxW='container.xl' border={"2px"} p={5}>
            <Flex w={"100%"} >
              <Box>
                  <span><b>Subject</b><Tag mx={1}>{subject}</Tag></span>
                  <Tag mx={3}>{difficulty}</Tag>
                  <Tag mx={3}>{type}</Tag>
              </Box>
            <Spacer />
          <IconButton icon={<LinkIcon />} onClick={()=>questionLink()}/>
          </Flex>
            <Flex>
                <span><b>Topics</b></span>
              {
                      topics.map((topic,index) => (
                        <Tag key={index} mx={1}>{topic}</Tag>
                      ))
                  }
          </Flex>
            <Box m={"3"} fontWeight={"semibold"} mt={6}>
                <Text as={"u"} fontWeight={"extrabold"}>Question</Text>
              <Text>{description}</Text>
            </Box>
            {type === "MCQs" ? (
                <VStack align={"flex-start"} m={3}>
                <Text as={"u"} fontWeight={"extrabold"}>Options</Text>
              {
                  options.options.map((option,index) => (
                      <Text key={index}>{`${index+1})`} {option}</Text>
                  ))
                }
                
              </VStack>
            ):''}
          
        {
          type === "Matches" ? (
              <Text as={"u"} fontWeight={"extrabold"}>Options</Text>
            
          ):''
        }
          <VStack align={"flex-start"} m={3} >
                    <Button mt={5}onClick={()=>setOpenAnswer(open=>!open)}>Check Answer</Button>
                        <Text display={openAnswer?'block':'none'}>{answer}</Text>
                    <Button mt={5}onClick={()=>setOpenSoln(open=>!open)}>Solution</Button>
                        <Text display={openSoln?'block':'none'}>{solution}</Text>
                </VStack>
    </Container>
  )
}

export default FilterQuestionCard