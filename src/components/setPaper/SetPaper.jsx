import styles from './styles.module.css'
import React, { useState } from 'react'
// import {ReactSelect} from "react-select"
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  ModalFooter,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  Button,
  NumberInput,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  Select,
  Checkbox,
  FormLabel,
  FormControl,
  Flex,
  Icon
} from '@chakra-ui/react';
import { useDisclosure } from "@chakra-ui/react";
import { FaFilePdf } from "react-icons/fa"
import { useSubject } from '../../subjectContext'
import SelectTopics from '../selectTopics';
const SetPaper = ({isOpen,onClose}) => {
  const {types,difficulties,subjects,topics} = useSubject()
  const { isOpen:isTopicOpen, onOpen:onTopicOpen, onClose:onTopicClose } = useDisclosure()
  const [topicArr, setTopic] = useState([])
  const [sub, setSub] = useState()
  const [difficulty, setDifficulty] = useState()
  const [openDownload, setOpenDownload] = useState(false)
  const [fillUps, setFillUps] = useState(0)
  const [matches, setMatches] = useState(0)
  const [TF,setTF] = useState(0)
  const [MCQ,setMCQ] = useState(0)
  const generateHandler = () => {
    console.log(sub,difficulty,fillUps,matches,TF,MCQ,topicArr)
    setOpenDownload(true)
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Set Question Paper</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexWrap={"wrap"}>
              {
                types.map(
                  type => (
                    <FormControl mx={3} mb={2} key={type}maxW={'100px'}>
                      <FormLabel fontWeight={"bold"}>{type}</FormLabel>
                      <NumberInput size='xs' step={1} defaultValue={0} min={0} max={6}>
                        <NumberInputField value={fillUps} />
                        {
                          type==="Fill Ups"?<NumberInputStepper>
                          <NumberIncrementStepper onClick={() => setFillUps(count=>count<6?count+1:count)}/>
                          <NumberDecrementStepper  onClick={() => setFillUps(count=>count>0?count-1:count)}/>
                        </NumberInputStepper>:''
                        }
                        {
                          type==="Match"?<NumberInputStepper>
                            <NumberIncrementStepper onClick={() => setMatches(count=>count<6?count+1:count)}/>
                            <NumberDecrementStepper  onClick={() => setMatches(count=>count>0?count-1:count)}/>
                          </NumberInputStepper>:''
                        }
                        {
                          type==="True/False"?<NumberInputStepper>
                            <NumberIncrementStepper onClick={() => setTF(count=>count<6?count+1:count)}/>
                            <NumberDecrementStepper  onClick={() => setTF(count=>count>0?count-1:count)}/>
                          </NumberInputStepper>:''
                        }
                        {
                          type==="MCQ"?<NumberInputStepper>
                            <NumberIncrementStepper onClick={() => setMCQ(count=>count<6?count+1:count)}/>
                            <NumberDecrementStepper  onClick={() => setMCQ(count=>count>0?count-1:count)}/>
                          </NumberInputStepper>:''
                        }
                        
                      </NumberInput>
                    </FormControl>
                  )
                )
              }
            </Flex>
            <Select  mt={"5"} placeholder='Select Subject' value={sub} onChange={e => { setSub(e.target.value); setTopic([]) }}>
              {subjects.map(subject => (
                <option value={subject}key={subject}>{subject}</option>
              ))}
            </Select>
            <Select mt={"3"} placeholder='Select Difficulty'value={difficulty}onChange={e=>setDifficulty(e.target.value)}>
              {difficulties.map(difficulty => (
                <option value={difficulty}key={difficulty}>{difficulty}</option>
              ))}
            </Select>
            <Flex mt={5}>
              <Button onClick={onTopicOpen} disabled={sub?false:true}>Choose Topics</Button>
              <Button ml={3}colorScheme={"green"} onClick={()=>generateHandler()}>Generate</Button>
            </Flex>
            {
              openDownload ? (
                <Flex mt={3}>
                  <Button>Question paper <Icon ml={1}as={FaFilePdf}/></Button>
                  <Button ml={3}>Solution <Icon ml={1}as={FaFilePdf}/></Button>
                </Flex>
              ):''
            }
            
            </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <SelectTopics isOpen={isTopicOpen} onClose={onTopicClose} sub={sub} topics={topics} topicArr={topicArr}setTopic={setTopic}/>
    </>
  )
}

export default SetPaper