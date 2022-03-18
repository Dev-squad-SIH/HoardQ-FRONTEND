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
  Flex
} from '@chakra-ui/react';
import { useDisclosure } from "@chakra-ui/react";
import { ChevronDownIcon, DownloadIcon } from "@chakra-ui/icons"
import { useSubject } from '../../subjectContext'
import SelectTopics from '../selectTopics';
const SetPaper = ({isOpen,onClose}) => {
  const {types,difficulties,subjects,topics} = useSubject()
  const { isOpen:isTopicOpen, onOpen:onTopicOpen, onClose:onTopicClose } = useDisclosure()
  const [topicArr, setTopic] = useState([])
  const [sub, setSub] = useState()
  const [difficulty, setDifficulty] = useState()
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Set Question Paper</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              {
                types.map(
                  type => (
                    <FormControl mr={3} ml={3} key={type}>
                      <FormLabel>{type}</FormLabel>
                      <NumberInput size='xs' step={1} defaultValue={0} min={0} max={6}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  )
                )
              }
            </Flex>
            <Select placeholder='Select Subject' value={sub} onChange={e => { setSub(e.target.value); setTopic([]) }}>
              {subjects.map(subject => (
                <option value={subject}key={subject}>{subject}</option>
              ))}
            </Select>
            <Select placeholder='Select Difficulty'value={difficulty}onChange={e=>setDifficulty(e.target.value)}>
              {difficulties.map(difficulty => (
                <option value={difficulty}key={difficulty}>{difficulty}</option>
              ))}
            </Select>
            <Button onClick={onTopicOpen} disabled={sub?false:true}>Choose Topics</Button>
            <Button ml={3}>Generate</Button>
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