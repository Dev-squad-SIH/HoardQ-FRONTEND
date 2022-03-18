import styles from './styles.module.css'
import Navbar from '../../components/navbar'
import { VStack } from '@chakra-ui/react'
import FilterQuestions from '../../components/filterQuestions/FilterQuestions'

const Home = () => {  
  return (
    <VStack>
      <Navbar />
      <FilterQuestions />
    </VStack>
  )
}

export default Home