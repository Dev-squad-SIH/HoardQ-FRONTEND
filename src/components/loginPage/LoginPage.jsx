import styles from './styles.module.css'
import React, { useState } from 'react';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Icon,
  useToast
} from '@chakra-ui/react';
import { Link,useNavigate } from 'react-router-dom';
import { ApiService } from '../../api.services';

const LoginPage = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()
  const loginHandler = async () => {
    setIsLoading(true)
    try {
      if (!email || !password) {
        setIsLoading(false)
        toast({
            title: "Fill all fields",
            status: 'warning',
            isClosable: true,
            duration:"3000"
        })
        return
      }
      const data = { email, password }
      const res = await ApiService.expertLogin(data)
      console.log(res)
      if (res.status === 200) {
        const hoardQToken = res.data.token;
        localStorage.setItem('hoardQToken', hoardQToken);
        setIsLoading(false)
        navigate('/expert')
        return
      }
    } catch (err) {
      console.log(err.response)
      if (err.response) {
        if (err.response.status === 404) {
          setIsLoading(false)
          toast({
            title: "Invalid credentials",
            status: 'warning',
            isClosable: true,
            duration:"3000"
          })
          return
        }
      }
    }
    
    
    
  }
  return (
    <Flex width="full" alignItems="center" justifyContent="center" marginTop="50px">
    <Box  p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg" width="350px" heigth="600px" border="1.5px solid #cad7cd">
      <Box textAlign="center">
        <Heading>Login</Heading>
      </Box>
      <Box my={4} textAlign="left">
          <FormControl mt={10} isRequired>
            <FormLabel>Email</FormLabel>
            <Input p={6} mt={3} type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email id" borderWidth={2} border="1px solid #cad7cd" />
          </FormControl>
          <FormControl mt={6} isRequired>
              <FormLabel>Password</FormLabel>
              <Input p={6} mt={3} type="password"value={password} onChange={e=>setPassword(e.target.value)} placeholder="*******" borderWidth={2} />
            </FormControl>
          {/* <FormControl mt={5}>
            <FormLabel p={1} w={14} fontSize="30px" borderWidth={1} borderRadius={6} transform="rotate(90deg)" display="flex" alignItems="center" justifyContent="center">^</FormLabel>
          </FormControl> */}
          <Button width="full" mt={10} isLoading={isLoading} onClick={() => loginHandler()}type="submit" backgroundColor="#f54642" color="white">
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