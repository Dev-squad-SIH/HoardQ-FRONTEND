import { useState } from 'react'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import styles from './styles.module.css'
const SelectTopics = ({ isOpen, onClose, sub,topics,topicArr,setTopic }) => {
  
  const selectTopicHandler = (e,topic) => {
    console.log(topic);
    if (topicArr.includes(topic)) {
      
      let topicIndex = topicArr.indexOf(topic);
      topicArr.splice(topicIndex,1)
      setTopic(topicArr)
      console.log(topicArr);
    } else {
      topicArr.push(topic);
      setTopic(topicArr);
      
    }
    // console.log(topicArr)
    // console.log(topics[sub]);
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Topics</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
    <>
      { 
              sub?topics[sub].map(topic => (
                <Tag size={'md'} key={topic}mr={2} variant='subtle' colorScheme={topicArr.includes(topic)?'red':'cyan'} value={topic} onClick={e=>selectTopicHandler(e,topic)}>
                  {topicArr.includes(topic) ? (<TagLeftIcon boxSize='12px' as={MinusIcon} />) : (<TagLeftIcon boxSize='12px' as={AddIcon} />)}
                  <TagLabel>{topic}</TagLabel>
                </Tag>
              )):''
            }
    </>
                  
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default SelectTopics