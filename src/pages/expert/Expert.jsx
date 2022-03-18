import { Flex, IconButton, Spacer, useDisclosure, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import {BiMenu } from 'react-icons/bi'
import ExpertDrawer from '../../components/expertDrawer'
const Expert = () => {
  const { isOpen:isSideOpen, onOpen:onSideOpen, onClose:onSideClose } = useDisclosure()
  const btnRef = React.useRef()
  const [isNotSmallerScreen] = useMediaQuery('(min-width:600px)');
  return (
      <>
          <Flex>
            <Spacer />
              <IconButton m={isNotSmallerScreen?10:3}ref={btnRef} icon={<BiMenu/>} onClick={onSideOpen}></IconButton>
              <ExpertDrawer isOpen={isSideOpen}
                placement='right'
                onClose={onSideClose}
                btnRef={btnRef}/>
          </Flex>
        
      </>
  )
}

export default Expert