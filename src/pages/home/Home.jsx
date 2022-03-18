import styles from './styles.module.css'
import Navbar from '../../components/navbar/index'
import { VStack } from '@chakra-ui/react'
import ExpertPage from '../../components/expert-page'
const Home = () => {
  return (
    <VStack>
      {/* <Navbar /> */}
      <ExpertPage />
    </VStack>
  )
}

export default Home