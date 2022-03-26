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
  const [filterLoading, setFilterLoading] = useState(false)
  const [hasMore,setHasMore] = useState(true)
  const limit = 5;
  // Fix infinite scrolling
  const filterHandler = async () => {
    setPage(0)
    console.log(page)
    setHasMore(true)
    setFilterLoading(true)
    const data = { topics:topicArr, difficulty, subject:sub, type }
    const query = {page:page+1,limit}
    console.log(query)
    const res = await ApiService.getFilteredQuestion(data, query)
    console.log(res)
    setFilterLoading(false)
    if (!res.data.data.length) {
      setIsFiltering(false)
      return
    }
    setQuestions(()=>[...res.data.data])
    setPage(page => page + 1)
    setIsFiltering(true)
  }
  const fetchQuestion = async () => {
      const data = { topics:topicArr, difficulty, subject:sub, type }
      const query = {page:page+1,limit}
      const res = await ApiService.getFilteredQuestion(data,query)
      console.log(res)
    if (res.status === 200) {
      if (!res.data.data.length) {
          setHasMore(false)
          return
        }
        setQuestions(questions.concat(res.data.data))
      }
        
      setPage(page => page + 1)
  }
  useEffect(() => {
    if (!type || !difficulty || !sub || !topicArr.length) {
      setCanFilter(false)
    } else {
      setCanFilter(true)
    }
  }, [type,difficulty,sub,topicArr])
  return (
    <>
      <VStack px={isNotSmallerScreen?10:2} py={isNotSmallerScreen?6:2} width={"100%"} align={"center"}>
        <Flex mr={"auto"}>
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
        {/* {
          questions?.slice(0,limit).map((question) => (
            <FilterQuestionCard question={question} key={question._id} />
          ))
        } */}
        {
          isFiltering ? (
          <>
          {questions.slice(0,limit).map((question) => (
                <FilterQuestionCard question={question} key={question._id}/>
              ))}
              
            <InfiniteScroll
              dataLength={questions.length}
                next={fetchQuestion}
                hasMore={hasMore}
              loader={<h4>Loading ...</h4>}
                endMessage={<h4>You have seen it all!</h4>}
                style={{width:"92vw"}}
              >
                {/* Fix Box size(width 100% isn't working) */}
                {questions.slice(limit).map((question) => (
                  <>
                    <FilterQuestionCard question={question} key={question._id}/>
                    <div style={{height:"8px"}}></div>
                </>
                
              ))}
            </InfiniteScroll>
              </>
          ):''
        }
            
      </VStack>
      
      <SelectTopics isOpen={isOpen} onClose={onClose} sub={sub} topics={topics} topicArr={topicArr}setTopic={setTopic}/>
    </>
    
  )
}

export default FilterQuestions