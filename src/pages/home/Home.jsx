import styles from './styles.module.css'
import Navbar from '../../components/navbar/index'
import { VStack } from '@chakra-ui/react'
import SetPaper from '../../components/setPaper/SetPaper'
const Home = () => {
  return (
    <VStack>
      {/* <Navbar /> */}
      <SetPaper/>
    </VStack>
  )
}

export default Home