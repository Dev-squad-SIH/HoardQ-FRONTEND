import styles from './styles.module.css'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Icon,IconButton,Text, Flex, VStack,useColorMode,useDisclosure
} from '@chakra-ui/react'
import { BiLogIn, BiUpload } from 'react-icons/bi'
import { FaMoon,FaSun } from 'react-icons/fa'

import UploadQuestion from '../uploadQuestion'
import { Link } from 'react-router-dom'
import SetPaper from '../setPaper'

const SideDrawer = ({isOpen,onClose,btnRef}) => {
  const { colorMode, toggleColorMode  } = useColorMode()
  const { isOpen:isUploadOpen, onOpen:onUploadOpen, onClose:onUploadClose } = useDisclosure()
  const { isOpen:isPaperOpen, onOpen:onPaperOpen, onClose:onPaperClose } = useDisclosure()
  return (
    <>
    <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
      finalFocusRef={btnRef}
      size={"full"}
      isFullHeight={false}
      >
        <DrawerOverlay />
      <DrawerContent>
        
        <DrawerCloseButton />
        <DrawerHeader>
                <IconButton onClick={toggleColorMode}icon={colorMode==='light'?<FaMoon/>:<FaSun/>} alignSelf={"center"} ml={2}></IconButton>
          
        </DrawerHeader>

        <DrawerBody >
          <VStack height={'100%'}display={"flex"} flexDirection={"column"} justifyContent={"center"}>
            <Button height={"50px" }width={"200px"} onClick={onUploadOpen}>
                  <Icon as={BiUpload} mr={3}/>
                  <Text>Upload</Text>
            </Button>
                <Link to="/auth">
            <Button height={"50px" }width={"200px"}>
                  <Icon as={BiLogIn} mr={2}/>
                  <Text>Login</Text>
                </Button>
                </Link>
            <Button height={"50px" }width={"200px"}onClick={onPaperOpen}>
                  <Text>Set Question Paper</Text>
            </Button>
          </VStack>
                
          </DrawerBody>

          <DrawerFooter>
            
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
              <UploadQuestion isOpen={isUploadOpen} onClose={onUploadClose}/>
      <SetPaper isOpen={isPaperOpen} onClose={onPaperClose}/>
              </>
  )
}

export default SideDrawer