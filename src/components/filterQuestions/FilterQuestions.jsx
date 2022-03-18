import { Flex, VStack,Select, IconButton,useMediaQuery,useDisclosure, Tag, TagCloseButton, TagLabel, Spacer, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, TagLeftIcon } from '@chakra-ui/react';
import { FaFilter } from 'react-icons/fa'
import SelectTopics from '../selectTopics';
import styles from './styles.module.css';
import { useState } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { useSubject } from '../../subjectContext'
const FilterQuestions = () => {
  const {types,difficulties,subjects,topics} = useSubject()
  const [sub, setSub] = useState()
  const [difficulty, setDifficulty] = useState()
  const [isNotSmallerScreen] = useMediaQuery('(min-width:600px)');
  const [topicArr, setTopic] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <VStack px={isNotSmallerScreen?10:2} py={isNotSmallerScreen?6:2} width={"100%"} align={"flex-start"}>
        <Flex>
          <Select placeholder='Select Type'm={isNotSmallerScreen?'5':'2'}>
            {
              types.map(type=>(<option value={type}key={type}>{type}</option>))
            }
          </Select>
          <Select placeholder='Select Difficulty'm={isNotSmallerScreen?'5':'2'}value={difficulty}onChange={e=>setDifficulty(e.target.value)}>
            {
              difficulties.map(difficulty=>(<option key={difficulty}>{difficulty}</option>))
            }
          </Select>
        </Flex>
        <Flex w={"100%"} flexWrap={"wrap"}>
          <Flex>
            <Select placeholder='Select Subject' m={isNotSmallerScreen ? '5' : '2'} value={sub} onChange={e => { setSub(e.target.value); setTopic([]) }}>
            {
              subjects.map(subject=>(<option key={subject}>{subject}</option>))
            }
          </Select>
          <Button m={isNotSmallerScreen?'5':'2'} px={'10'}onClick={onOpen} disabled={sub?false:true}>Choose Topics</Button>
          
          </Flex>
          <Spacer/>
          <IconButton icon={<FaFilter/>} m={isNotSmallerScreen?'5':'2'}></IconButton>
        </Flex>
      </VStack>
      
      <SelectTopics isOpen={isOpen} onClose={onClose} sub={sub} topics={topics} topicArr={topicArr}setTopic={setTopic}/>
    </>
    
  )
}

export default FilterQuestions