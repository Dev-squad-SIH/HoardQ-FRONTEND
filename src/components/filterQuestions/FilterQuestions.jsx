import { Flex, VStack,Select, IconButton,useMediaQuery,useDisclosure, Tag, TagCloseButton, TagLabel, Spacer, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, TagLeftIcon } from '@chakra-ui/react';
import { FaFilter } from 'react-icons/fa'
import SelectTopics from '../selectTopics';
import styles from './styles.module.css';
import { useState } from 'react';
import { useSubject } from '../../subjectContext'
import InfiniteScroll from 'react-infinite-scroll-component';
import FilterQuestionCard from '../filterQuestionCard';
const FilterQuestions = () => {
  const {types,difficulties,subjects,topics} = useSubject()
  const [sub, setSub] = useState()
  const [difficulty, setDifficulty] = useState()
  const [isNotSmallerScreen] = useMediaQuery('(min-width:600px)');
  const [topicArr, setTopic] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [page, setPage] = useState(0)
  const [questions,setQuestions] = useState([])
  const fetchQuestion = async () => {
    // Sample api
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`)
    const data = await res.json();
    console.log(data)
    setPage(page => page + 1)
    setTimeout(() => {
      setQuestions(questions.concat(data))
    },1500)
  }
  const sampleQuestion = {
    subject: "Subject1",
    topics: ["Topic1","Topic2"],
    difficulty: "Easy",
    id: "1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    type: "MCQs",
    options:["Lorem ipsum dolor sit amet","consectetur adipiscing elit, sed","sed do eiusmod tempor incididunt","labore et dolore magna aliqua."],
    answer: ["Lorem ipsum dolor sit amet"],
    solution:"consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
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
        <FilterQuestionCard question={sampleQuestion}/>
            <InfiniteScroll
              dataLength={questions.length}
              next={fetchQuestion}
              hasMore={true}
              loader={<h4>Loading...</h4>}
            >
              {questions.map((question) => (
                <div key={question.title}>
                  {question.title}
                </div>
              ))}
            </InfiniteScroll>
      </VStack>
      
      <SelectTopics isOpen={isOpen} onClose={onClose} sub={sub} topics={topics} topicArr={topicArr}setTopic={setTopic}/>
    </>
    
  )
}

export default FilterQuestions