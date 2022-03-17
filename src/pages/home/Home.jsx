import styles from './styles.module.css'
import Navbar from '../../components/navbar/index'
import { VStack } from '@chakra-ui/react'
// import SetPaper from '../../components/setPaper/SetPaper'
import LoginPage from '../../components/loginPage/LoginPage'
const Home = () => {
  return (
    <VStack>
      {/* <Navbar /> */}
      {/* <SetPaper/> */}
      <LoginPage/>
    </VStack>
  )
}

export default Home