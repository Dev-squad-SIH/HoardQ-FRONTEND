import styles from './styles.module.css'
import React from 'react'
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  ModalFooter,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  Button,
  NumberInput,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper
} from '@chakra-ui/react';

import { useDisclosure } from "@chakra-ui/react";
import { ChevronDownIcon, DownloadIcon } from "@chakra-ui/icons"
const SetPaper = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader textAlign="center">Set Question Paper</ModalHeader>
          <ModalCloseButton />

          <ModalBody display="flex" justifyContent="flex-end">

            <ModalBody display="flex" flexDirection="column" alignItems="flex-start" >

              <ModalBody display="flex" alignItems="center">
                <h1>Subject</h1>
                <Menu>
                  <MenuButton ml="10px" as={Button} rightIcon={<ChevronDownIcon />}>
                    Actions
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Science</MenuItem>
                    <MenuItem>Mathematics</MenuItem>
                  </MenuList>
                </Menu>
              </ModalBody>

              <ModalBody display="flex" alignItems="center">
                <h1>Topics</h1>
                <Menu>
                  <MenuButton ml="18px" as={Button} rightIcon={<ChevronDownIcon />}>
                    Actions
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Matrix</MenuItem>
                    <MenuItem>Hydrocabons</MenuItem>
                    <MenuItem>Rotational Dynamcis</MenuItem>
                  </MenuList>
                </Menu>
              </ModalBody>
            </ModalBody>

            <ModalBody display="flex" flexDirection="column"  >
              <ModalBody display="flex" alignItems="center">
                <p>Fill ups:</p>
                <NumberInput ml="10px" maxW="75px" size="md" defaultValue={1} min={1} max={6}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </ModalBody>
              <ModalBody display="flex" alignItems="center">
                <p>Match:</p>
                <NumberInput ml="10px" maxW="75px" size="md" defaultValue={1} min={1} max={6}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </ModalBody>
              <ModalBody display="flex" alignItems="center">
                <p>MCQs:</p>
                <NumberInput ml="10px" maxW="75px" size="md" defaultValue={1} min={1} max={6}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </ModalBody>

            </ModalBody>


          </ModalBody>

          <ModalBody>
            <Button m="10px">Lorem</Button>
            <Button m="10px">Ipsum</Button>
            <Button m="10px">Ipsum</Button>

          </ModalBody>
          <ModalBody display="flex" alignItems="center">
            <h1>Difficulty</h1>
            <Menu>
              <MenuButton ml="18px" as={Button} rightIcon={<ChevronDownIcon />}>
                Actions
              </MenuButton>
              <MenuList>
                <MenuItem>Easy</MenuItem>
                <MenuItem>Moderate</MenuItem>
                <MenuItem>Tough</MenuItem>
              </MenuList>
            </Menu>
            <Button ml="15px">Generate</Button>
          </ModalBody>
          <ModalBody>
            <Button m="10px">Preview</Button>
            <Button m="5px" rightIcon={<DownloadIcon />}>Questions</Button>
            <Button m="5px" rightIcon={<DownloadIcon />}>Answers</Button>

          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  )
}

export default SetPaper