import styles from './styles.module.css'
import React, { useState } from 'react';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button
} from '@chakra-ui/react';


const UploadQuestion = () => {
  const [question, setQuestion] = useState('');
  const [option, setOption] = useState('');
  const [answer, setAnswer] = useState('');
  const [solution, setSolution] = useState('');
  const handleSubmit = event => {
    event.preventDefault();
    alert(`Question: ${question} & Option: ${option} & Answer: ${answer} & Solution: ${solution}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.uploadquestion}>
      <div className={styles.header}>Upload Question</div>
        <div className={styles.card}>
        <form onSubmit={handleSubmit}>
    {/* <Flex width="full" align="center" justifyContent="center">
       <Box p={2}>
        <Box textAlign="center">
          <Heading>Upload Question</Heading>
        </Box> */}
        <div className={styles.contain} >
              <b className={styles.sub}>Subject</b>
              <div className={styles.subjects}>
              <select name="languages" className={styles.subject}>
                <option className={styles.inputElements} value="subject1">Subject1</option>
                <option className={styles.inputElements} value="subject2">Subject2</option>
                <option className={styles.inputElements} value="subject3">Subject3</option>
              </select>
              </div>
              <b className={styles.typ}>Type</b>
              <div className={styles.subjects}>
              <select name="languages" className={styles.type}>
                <option className={styles.inputElements} value="mcq1">MCQs1</option>
                <option className={styles.inputElements} value="mcq2">MCQ2</option>
                <option className={styles.inputElements} value="mcq3">MCQ3</option>
              </select>
              </div>
              <b className={styles.top}>Topic</b>
              <div className={styles.subjects}>
              <select name="languages" className={styles.topic}>
                <option className={styles.inputElements} value="topic1">Topic1</option>
                <option className={styles.inputElements} value="topic2">Topic2</option>
                <option className={styles.inputElements} value="topic3">Topic3</option>
              </select>
              </div>
            </div>
        {/* <Box my={4} textAlign="left">
          <form>
            <FormControl isRequired>
              <FormLabel className={styles.question}>Question</FormLabel>
              <Input className={styles.inputElementQuestion} type="question" placeholder="Enter Question" onChange={event => setQuestion(event.currentTarget.value)}/>
            </FormControl>
            <FormControl mt={6} isRequired>
              <FormLabel className={styles.option}>Options</FormLabel>
              <Input type="option"
                className={styles.inputElement}
                onChange={event => setOption(event.currentTarget.value)} />
            </FormControl>
            <div className={styles.add}>+</div>
            <FormControl mt={6} isRequired>
              <FormLabel className={styles.answer}>Answers</FormLabel>
              <select name="languages" className={styles.answers} onChange={event => setAnswer(event.currentTarget.value)}>
                <option className={styles.inputElements} value="1">1</option>
                <option className={styles.inputElements} value="2">2</option>
                <option className={styles.inputElements} value="3">3</option>
                <option className={styles.inputElements} value="4">4</option>
              </select>
            </FormControl>
            <FormControl mt={6} isRequired>
              <FormLabel className={styles.solution}>Solution</FormLabel>
              <input
                type="text"
                className={styles.inputElement}
                placeholder="Enter Solution"
                onChange={event => setSolution(event.currentTarget.value)}
                required
              />
            </FormControl>
          </form>
        </Box>
      </Box>
    </Flex> */}
            <div className={styles.group} >
              <b className={styles.question} required>Question</b>
              <input
                type="text"
                className={styles.inputElementQuestion}
                placeholder="Enter Question"
                onChange={event => setQuestion(event.currentTarget.value)}
                required
              />
            </div>
            <div className={styles.group} >
              <b className={styles.option}>Options</b>
              <input
                type="text"
                className={styles.inputElement}
                onChange={event => setOption(event.currentTarget.value)}
                required
              />
            </div>
            <div className={styles.add}>+</div>
            <div className={styles.group} >
              <b className={styles.answer}>Answer</b>
              <select name="languages" className={styles.answers} onChange={event => setAnswer(event.currentTarget.value)}>
                <option className={styles.inputElements} value="1">1</option>
                <option className={styles.inputElements} value="2">2</option>
                <option className={styles.inputElements} value="3">3</option>
                <option className={styles.inputElements} value="4">4</option>
              </select>
            </div>
            <div className={styles.group} >
              <b className={styles.solution}>Solution</b>
              <input
                type="text"
                className={styles.inputElement}
                placeholder="Enter Solution"
                onChange={event => setSolution(event.currentTarget.value)}
                required
              />
            </div>
            <div className={styles.group} >
              <input
                type="submit"
                value="Upload"
                className={styles.submitBtn}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UploadQuestion