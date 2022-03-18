import React from 'react'
import { Button, Flex, Icon, IconButton, Spacer, Text, useColorMode, useMediaQuery, useDisclosure } from '@chakra-ui/react'
import styles from './styles.module.css'
import { FaMoon,FaSun } from 'react-icons/fa'
import { BiLogIn, BiUpload, BiMenu } from 'react-icons/bi'
import SideDrawer from '../sideDrawer'
import UploadQuestion from '../uploadQuestion'
import SetPaper from '../setPaper'
import { Link } from 'react-router-dom'

const Navbar = ({topics,subjects,difficulties,types}) => {
  const { isOpen:isSideOpen, onOpen:onSideOpen, onClose:onSideClose } = useDisclosure()
  const { isOpen:isUploadOpen, onOpen:onUploadOpen, onClose:onUploadClose } = useDisclosure()
  const { isOpen:isPaperOpen, onOpen:onPaperOpen, onClose:onPaperClose } = useDisclosure()
  const btnRef = React.useRef()
  const { colorMode, toggleColorMode } = useColorMode()
  const [isNotSmallerScreen] = useMediaQuery('(min-width:600px)');
  return (
    <>
      <Flex px={isNotSmallerScreen?10:4} py={6} w={'100%'}>
      {
          isNotSmallerScreen ? (
            <>
              <Flex>
                <Button px={3} py={2} mr={isNotSmallerScreen?'6':'2'} onClick={onUploadOpen}>
                  <Icon as={BiUpload} mr={3}/>
                  <Text>Upload</Text>
                </Button>
                <Link to="/auth">
                  <Button px={3} py={2}>
                    <Icon as={BiLogIn} mr={2}/>
                    <Text>Login</Text>
                  </Button>
                </Link>
                
              </Flex>
              <Spacer />
              <Flex>
                <Button px={3} py={2} onClick={onPaperOpen}>
                  <Text>Set Question Paper</Text>
                </Button>
                <IconButton onClick={toggleColorMode}icon={colorMode==='light'?<FaMoon/>:<FaSun/>} alignSelf={"center"} ml={6}></IconButton>
              
              </Flex>
              
            </>
          ) : (
            <>
              <Spacer />
              <IconButton ref={btnRef} icon={<BiMenu/>} onClick={onSideOpen}></IconButton>
              <SideDrawer isOpen={isSideOpen}
                placement='right'
                onClose={onSideClose}
                btnRef={btnRef}/>
            </>
            
          )
      }
      </Flex>

      <UploadQuestion isOpen={ isUploadOpen}onClose={onUploadClose}/>
      <SetPaper isOpen={isPaperOpen} onClose={onPaperClose}/>
    </>
  )
}

export default Navbar