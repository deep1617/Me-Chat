import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  VStack,
  StackDivider,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast
} from "@chakra-ui/react";
import axios from "axios";



const Login = () => {
  const history = useHistory();
  const toast = useToast();
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
    const loginhandle = async ()=>{
        if(!email || !pass){
            toast({
              title: "Warning",
              description: "Enter All the fields.",
              status: "warning",
              duration: 3000,
              isClosable: true,
            });
            return;
        }
        try{
            const config = {
              headers: {
                "Content-type": "application/json",
              },
            };
            const {data} = await axios.post("/api/user/login",{email,pass},config);
            toast({
              title: "logged in",
              description: "successfully",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            // console.log(data.token);
            localStorage.setItem("userInfo",JSON.stringify(data));
            history.push('/chats')
        }
        catch(err){
          toast({
            title: "Error",
            description: err.response.data,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          console.log("fsaf");
        }
    }
  return (
    <VStack
      divider={<StackDivider borderColor="gray.100" />}
      spacing={"5px"}
      align="stretch"
    >
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter Your Password"
          onChange={(e) => {
            setpass(e.target.value);
          }}
        />
      </FormControl>

      <Button mt={4} colorScheme="teal" onClick={()=>{loginhandle()}}>
        Login
      </Button>
      <Button mt={1} colorScheme="red"
      onClick={()=>{
        setemail("guest@example.com");
        setpass("123456");
      }}
      >
        Continue As Guest User
      </Button>
    </VStack>
  );
};

export default Login;
