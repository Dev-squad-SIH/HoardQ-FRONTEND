import { Flex, VStack,Select, IconButton,useMediaQuery,useDisclosure, Tag, TagCloseButton, TagLabel, Spacer, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, TagLeftIcon, filter, Spinner, Text } from '@chakra-ui/react';
import { FaFilter } from 'react-icons/fa'
import SelectTopics from '../selectTopics';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { useSubject } from '../../subjectContext'
import InfiniteScroll from 'react-infinite-scroll-component';
import FilterQuestionCard from '../filterQuestionCard';
import { ApiService } from '../../api.services';
const FilterQuestions = () => {
  const {types,difficulties,subjects,topics} = useSubject()
  const [sub, setSub] = useState()
  const [difficulty, setDifficulty] = useState()
  const [type, setType] = useState()
  const [isNotSmallerScreen] = useMediaQuery('(min-width:600px)');
  const [topicArr, setTopic] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [page, setPage] = useState(0)
  const [questions, setQuestions] = useState()
  const [isFiltering, setIsFiltering] = useState(false);
  const [canFilter, setCanFilter] = useState(false);
  const [filterLoading,setFilterLoading] =useState(false)
  const limit = 5;
  // Fix infinite scrolling
  const filterHandler = async () => {
    setFilterLoading(true)
    const data = { topics:topicArr, difficulty, subject:sub, type }
    const query = {page:page+1,limit}
    const res = await ApiService.getFilteredQuestion(data, query)
    console.log(res)
    setFilterLoading(false)
      // setQuestions([])

    // check this - Previous elements aren't replaced(bug)

      setQuestions(res.data.data)
    // setPage(page => page + 1)
    // if (!questions?.length) {
    //   setIsFiltering(false)
    //   return
    // }
    // setIsFiltering(true)
  }
  // const fetchQuestion = async () => {
  //   console.log(questions)
  //     const data = { topics:topicArr, difficulty, subject:sub, type }
  //     const query = {page:page+1,limit}
  //     const res = await ApiService.getFilteredQuestion(data,query)
  //   console.log(res)
  //   if (res.status === 200) {
  //     setQuestions(questions.concat(res.data.data))
  //   }
      
  //   setPage(page => page + 1)
  // }
  useEffect(() => {
    if (!type || !difficulty || !sub || !topicArr.length) {
      setCanFilter(false)
    } else {
      setCanFilter(true)
    }
  }, [type,difficulty,sub,topicArr])
  return (
    <>
      <VStack px={isNotSmallerScreen?10:2} py={isNotSmallerScreen?6:2} width={"100%"} align={"flex-start"}>
        <Flex>
          <Select placeholder='Select Type'm={isNotSmallerScreen?'5':'2'}value={type}onChange={e=>setType(e.target.value)}>
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
          <IconButton isLoading={filterLoading} icon={<FaFilter/>} m={isNotSmallerScreen?'5':'2'} disabled={!canFilter} onClick={()=>filterHandler()}></IconButton>
        </Flex>
        {
           questions?.length===0?<Text align="center">No question found!</Text>:''
        }
        {
          questions?.map((question) => (
                <FilterQuestionCard question={question} key={question._id}/>
              ))
          // isFiltering ? (
          // <>
          // {questions.slice(0,limit).map((question) => (
          //       <FilterQuestionCard question={question} key={question._id}/>
          //     ))}
              
          //   <InfiniteScroll
          //     dataLength={questions.length}
          //     next={fetchQuestion}
          //     hasMore={true}
          //     loader={<h4>Loading ...</h4>}
              
          //   >
          //     {questions.slice(limit).map((question) => (
          //       <FilterQuestionCard question={question} key={question._id}/>
          //     ))}
          //   </InfiniteScroll>
          //     </>
          // ):''
        }
            
      </VStack>
      
      <SelectTopics isOpen={isOpen} onClose={onClose} sub={sub} topics={topics} topicArr={topicArr}setTopic={setTopic}/>
    </>
    
  )
}

export default FilterQuestions