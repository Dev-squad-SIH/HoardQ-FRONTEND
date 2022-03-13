import styles from './styles.module.css'
import Navbar from '../../components/navbar/index'
import { VStack } from '@chakra-ui/react'
import UploadQuestion from '../../components/uploadQuestion/UploadQuestion'
const Home = () => {
  return (
    <VStack>
      {/* <Navbar /> */}
      <UploadQuestion />
    </VStack>
  )
}

export default Home