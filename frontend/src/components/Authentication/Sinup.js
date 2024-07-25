import React, { useState } from "react";
import axios from "axios";
import {
  VStack,
  StackDivider,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
const Sinup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [cpass, setcpass] = useState("");
  const [pic, setpic] = useState("null");
  const history = useHistory();
  const postdetails = (pics) => {};
  const toast = useToast();
  const handlePictureChange = (e) => {
    setpic(e.target.files[0]);
  };
  const submithandler = async () => {
    if (!name || !email || !pass || !cpass) {
      toast({
        title: "Warning",
        description: "Enter All the fields.",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    if (pass !== cpass) {
      toast({
        title: "Warning",
        description: "Password do not match",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      // const pass1 = pass;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("pass", pass);
      formData.append("email", email);
      formData.append("pic", pic);
      const { data } = await axios.post(
        "/api/user",
        formData,
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast({
        title: "Hurray",
        description: "Registration successful",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      history.push("/chats");
      return;
    } catch (err) {
      toast({
        title: "Error Occured",
        description: err.response.data,
        status: "error",
        duration: 9000,
        isClosable: true,
      });

      console.log(err.response.data);
    }
  };
  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={"3px"}
      align="stretch"
      width={"100%"}
    >
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
      </FormControl>
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
      <FormControl isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => {
            setcpass(e.target.value);
          }}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Upload Picture</FormLabel>
        <Input type="file" onChange={handlePictureChange} accept="image/*"></Input>
      </FormControl>
      <Button mt={4} colorScheme="teal" onClick={submithandler}>
        Submit
      </Button>
    </VStack>
  );
};

export default Sinup;
