import styles from './styles.module.css'
import React, { useEffect, useState } from 'react';
import {
  Flex,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
  IconButton,
  InputLeftAddon,
  InputGroup,
  VStack,
  HStack,
  Textarea,
  Text,
  useToast
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { useSubject } from '../../subjectContext'
import { ApiService } from '../../api.services';
const UploadQuestion = ({isOpen,onClose}) => {
  const {types,difficulties,subjects,topics} = useSubject()
  const [type, setType] = useState()
  const [mcqOptCount, setMcqOptCount] = useState([1])
  const [mcqOptions, setMcqOptions] = useState([])
  const [matchOptCount, setMatchOptCount] = useState([1])
  const [matchOptionsA,setMatchOptionsA] = useState([])
  const [matchOptionsB,setMatchOptionsB] = useState([])
  const [sub, setSub] = useState()
  const [question,setQuestion] = useState()
  let [answer,setAnswer] = useState()
  const [solution, setSolution] = useState()
  const [isUploading, setIsUploading] = useState(false)
  const toast = useToast()
  const addMcqHandler = () => {
    // console.log(mcqOptions)
    setMcqOptCount(mcqOptCount=>[...mcqOptCount,mcqOptCount.length+1])
  }
   const minusMcqHandler = () => {
    // console.log(mcqOptions)
    setMcqOptCount(mcqOptCount=>mcqOptCount.slice(0,mcqOptCount.length-1))
  }

  const mcqInputHandler = (e, opt) => {
    setMcqOptions(mcqOptions =>[...mcqOptions.slice(0,opt-1),e.target.value,...mcqOptions.slice(opt,-1)] )
    // console.log(mcqOptions)
  }
const addMatchHandler = () => {
    setMatchOptCount(matchOptCount=>[...matchOptCount,matchOptCount.length+1])
  }
   const minusMatchHandler = () => {
    setMatchOptCount(matchOptCount=>matchOptCount.slice(0,matchOptCount.length-1))
  }

  const matchInputAHandler = (e, opt) => {
    setMatchOptionsA(matchOptionsA =>[...matchOptionsA.slice(0,opt-1),e.target.value,...matchOptionsA.slice(opt,-1)] )
    // console.log(matchOptionsA)
  }
  const matchInputBHandler = (e, opt) => {
    setMatchOptionsB(matchOptionsB =>[...matchOptionsB.slice(0,opt-1),e.target.value,...matchOptionsB.slice(opt,-1)] )
    // console.log(matchOptionsB)
  }
  const uploadHandler = async () => {
    setIsUploading(true)
    let option = {};
    if (type === "MCQs") {
      if (mcqOptions.length < 2) {
        toast({
            title: `More than one option required`,
            status: 'warning',
            isClosable: true,
        })
        setIsUploading(false)
        return
      }
      option.options = mcqOptions
    }
    if (type === "Matches") {
      option.matchOptions = {
        lhs: matchOptionsA,
        rhs: matchOptionsB
      }
      console.log(matchOptionsA.length, matchOptionsB.length)
      const lenA = matchOptionsA.length
      const lenB = matchOptionsB.length;
      if (lenA < 2 || lenB < 2) {
        toast({
            title: `More than 1 row required`,
            status: 'warning',
            isClosable: true,
        })
         setIsUploading(false)
        return
      }
      if(lenA !== lenB) {
        toast({
            title: `Enter all details`,
            status: 'warning',
            isClosable: true,
        })
         setIsUploading(false)
        return
      }
      // Check this
      // setAnswer('answer')
      // console.log(answer)
      answer = 'answer'
    }
    if (type === "True/False") {
      option.boolField = ["true","false"]
    }
    const data = {description:question,subject:sub,questionType:type,answer:answer,option:option,solution:solution}
    // console.log(data)
    for (let i in data) {
      if (!data[i]) {
        console.log(i)
          toast({
            title: `Enter all details`,
            status: 'warning',
            isClosable: true,
          })
      setIsUploading(false)
        return
      }
    }
    const res = await ApiService.uploadQuestion(data)
    if (res.status === 200) {
      setIsUploading(false)
      setType('');
      setAnswer('')
      setSolution('')
      setQuestion('')
      setSub('')
      setMcqOptions([])
      setMcqOptCount([1])
      setMatchOptionsA([])
      setMatchOptionsB([])
      setMatchOptCount([1])
      toast({
            title: `Question uploaded successfully`,
            status: 'success',
            isClosable: true,
        })
    }
    
  }
  const closeHandler = () => {
    setIsUploading(false)
    setType('');
    setAnswer('')
    setSolution('')
    setQuestion('')
    setSub('')
    setMcqOptions([])
    setMcqOptCount([1])
    setMatchOptionsA([])
    setMatchOptionsB([])
    setMatchOptCount([1])
    onClose();
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Question</ModalHeader>
          <ModalCloseButton />
        <ModalBody>
          <Select mb={3}placeholder='Question Type' value={type} onChange={e=>setType(e.target.value)}>
            {
              types.map(type=>(<option value={type}key={type}>{type}</option>))
            }
          </Select>
          {
            type ? <Textarea mb={3}placeholder='Enter Your Question ...'value={question} onChange={e=>setQuestion(e.target.value)} />:''
          }

          {
            type === 'True/False' ? (
              <>
                <Select mb={3} placeholder='Select Answer' key={answer}value={answer} onChange={e=>setAnswer(e.target.value)}>
                  {
                    ['True', 'False'].map(choice => (<option value={choice} key={choice}>{choice}</option>))
                  }
                </Select>
              </>
              
            ) : ''
          }
          {
            type === 'MCQs' ? (
              <>
                    {
                      mcqOptCount.map(opt => (
                        <InputGroup mb={3} key={opt}>
                          <InputLeftAddon children={`${opt}`} />
                        <Input placeholder={`Enter Option ${opt}`} key={opt} value={mcqOptions[opt-1]}onChange={e=>mcqInputHandler(e,opt)}/>
                      
                        </InputGroup>
                        ))
                    }
                <HStack mb={3} alignSelf={"flex-end"}justifyContent={"center"}>
                    <IconButton icon={<MinusIcon />} isDisabled={mcqOptCount.length===1?true:false} onClick={minusMcqHandler}></IconButton>
                    <IconButton icon={<AddIcon/>} isDisabled={mcqOptCount.length===4?true:false} onClick={addMcqHandler}></IconButton>
                  </HStack>
                <Select mb={3}placeholder='Select Answer' value={answer} onChange={e=>setAnswer(e.target.value)}>
                  {
                    mcqOptCount.map(count => (
                      <option key={count}>Option {count}</option>
                    ))
                    }
                </Select>
              </>
              
            ):''
          }
          {
            type === 'Matches' ? (
              <>
                {
                  matchOptCount.map(opt => (
                        <Flex  mb={3} key={opt}>
                      <InputGroup m={1}>
                          <InputLeftAddon children={`${opt}A`} />
                          <Input onChange={e=>matchInputAHandler(e,opt)}></Input>
                        </InputGroup>
                        <InputGroup m={1}>
                          <InputLeftAddon children={`${opt}B`} />
                          <Input onChange={e=>matchInputBHandler(e,opt)}></Input>
                        </InputGroup>
                        
                        </Flex>
                        ))
                    }
                
                <HStack  mb={3}alignSelf={"flex-end"}justifyContent={"center"}>
                    <IconButton icon={<MinusIcon />} isDisabled={matchOptCount.length===1?true:false} onClick={minusMatchHandler}></IconButton>
                    <IconButton icon={<AddIcon/>} isDisabled={matchOptCount.length===4?true:false} onClick={addMatchHandler}></IconButton>
                </HStack>
              </>
              
            ):''
          }
          {type ? <Textarea mb={3}placeholder='Enter Solution Here ...' value={solution} onChange={e=>setSolution(e.target.value)} />:''}
          <Flex>
            {/* <Select placeholder='Select Subject' m={isNotSmallerScreen?'5':'2'}value={sub} onChange={e=>setSub(e.target.value)}> */}
            {type ? <Select placeholder='Select Subject' value={sub} onChange={e => setSub(e.target.value)}>
              {
                subjects.map(subject=>(<option value={subject}key={subject}>{subject}</option>))
              }
            </Select>:''}
              
          </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
             colorScheme='blue' mr={3} onClick={closeHandler}>
              Close
            </Button>
            <Button variant='ghost'isLoading={isUploading} onClick={()=>uploadHandler()}>Upload</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    
  )
}

export default UploadQuestion