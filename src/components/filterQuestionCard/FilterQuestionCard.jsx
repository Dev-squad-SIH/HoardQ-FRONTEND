import { LinkIcon } from '@chakra-ui/icons';
import { Box, Button, Container, Flex, IconButton, Spacer, Tag, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const FilterQuestionCard = ({ question }) => {
    const { subject, topics, difficulty, id, description, type, options, answer, solution } = question;
    const [openAnswer,setOpenAnswer] = useState(false)
    const [openSoln,setOpenSoln] = useState(false)
    return (
    <Container maxW='container.xl' border={"2px"} p={5}>
            <Flex w={"100%"} >
              <Box>
                  <span><b>Subject</b><Tag mx={1}>{subject}</Tag></span>
                  <Tag mx={3}>{difficulty}</Tag>
                  <Tag mx={3}>{type}</Tag>
              </Box>
            <Spacer />
            <Link to="/question/23">
              <IconButton icon={<LinkIcon/>}/>
            </Link>
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
                  options.map((option,index) => (
                      <Text key={index}>{`${index+1})`} {option}</Text>
                  ))
                }
                
              </VStack>
            ):''}
          
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