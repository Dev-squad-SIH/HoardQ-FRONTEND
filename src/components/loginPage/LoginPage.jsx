import styles from './styles.module.css'
import React from 'react';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Icon
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <Flex width="full" alignItems="center" justifyContent="center" marginTop="130px">
    <Box  p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg" width="350px" heigth="600px" border="1.5px solid #cad7cd">
      <Box textAlign="center">
        <Heading>Login</Heading>
      </Box>
      <Box my={4} textAlign="left">
          <FormControl mt={10} isRequired>
            <FormLabel>Email</FormLabel>
            <Input p={6} mt={3} type="email" placeholder="Enter your email id" borderWidth={2} border="1px solid #cad7cd" />
          </FormControl>
          <FormControl mt={6} isRequired>
              <FormLabel>Password</FormLabel>
              <Input p={6} mt={3} type="password" placeholder="*******" borderWidth={2} />
            </FormControl>
          {/* <FormControl mt={5}>
            <FormLabel p={1} w={14} fontSize="30px" borderWidth={1} borderRadius={6} transform="rotate(90deg)" display="flex" alignItems="center" justifyContent="center">^</FormLabel>
          </FormControl> */}
          <Button width="full" mt={10} type="submit" backgroundColor="#f54642" color="white">
            Login
          </Button>
          <Link to='/'>
            <Button width="full" mt={5} type="submit" colorScheme={"blue"} color="white">
              Home
            </Button>
          </Link>
          
      </Box>
    </Box>
  </Flex>
  )
}

export default LoginPage