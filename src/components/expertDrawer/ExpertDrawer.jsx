import React from "react";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Image,
    Box,
    Text,
    Tag
  } from '@chakra-ui/react'
const ExpertDrawer = ({isOpen,onClose,btnRef,name,email,subjects,totalVerified}) => {
    
  return (
      <>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <Image ml="85px" mt="50px"  borderRadius="full" boxSize="150px" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60" alt="Picture-title" />
          <DrawerHeader textAlign="center">{name?name:''}</DrawerHeader>

          <DrawerBody>
            <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
                <Text fontWeight="bold">EmailID:</Text> 
                <Text ml="15px">{email?email:''}</Text>
                <Button size='sm' ml="10px">Edit</Button>
            </Box>
            <br />
            <Box display="flex">
              <Text fontWeight="bold">Subject:</Text>
              {
                subjects?subjects.map((subject) => (
                  <Tag ml="15px" key={subject}>{subject}</Tag>
                )):''
              }
            
            </Box>
            <br />
            <Box display="flex">
            <Text fontWeight="bold">Total Verified:</Text>
            <Tag ml="15px">{totalVerified?totalVerified:''}</Tag>
            </Box>
        
          </DrawerBody>

          <DrawerFooter>
              <Button mr="50px" colorScheme="blue">Change Password</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer></>
    )
  }
  
  export default ExpertDrawer