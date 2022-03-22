import { EditIcon } from '@chakra-ui/icons';
import { Box, Button, Container, Flex, IconButton, Select, Spacer, Tag, Text, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useSubject } from '../../subjectContext';
import SelectTopics from '../selectTopics';

const ExpertQuestion = ({ question }) => {
    const { subject, topics, difficulty, id, description, type, options, answer, solution,verifiedBy } = question;
    const { difficulties } = useSubject()
  const [topicArr, setTopic] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
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
                  options.map((option,index) => (
                      <Text key={index}>{`${index+1})`} {option}</Text>
                  ))
                }
                
              </VStack>
            ) : ''}
            <VStack alignItems={"flex-start"} mt={6}>
                <Flex w={"100%"}alignItems={"center"}>
                    <Text as={'u'} fontWeight={"bold"}>Answer</Text>
                    <Spacer/>
                    <IconButton icon={<EditIcon />}/>
                </Flex>
            <Text>{answer}</Text>
            </VStack>
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
                        <Button mt={5} mr={3}>Drop</Button>
                        <Button mt={5} mr={3}>Edit</Button>
              <Button mt={5} onClick={onOpen}>Set topics</Button>
                    </Flex>
                    
                  
                  <Select placeholder='Set Difficulty'>
                        {
                        difficulties.map(difficulty=>(<option key={difficulty}>{difficulty}</option>))
                        }
                    </Select>
                    <Button mt={5}>Freeze</Button>
          </VStack>
          
        </Flex>
          
    </Container>
      <SelectTopics isOpen={isOpen} onClose={onClose} sub={"English"} topics={{ "English": ["topic1","topic2"] }} topicArr={topicArr}setTopic={setTopic}/>
                        </>
    )
}

export default ExpertQuestion