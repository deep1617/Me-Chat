import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
  Text,
  Box,
  useToast,
  Spinner
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useChatState } from "../../context/chatprovider";
import axios from "axios";
import Chatload from "./chatload";
import UserListItem from "../Useravatar/UserListItem";
// import { accesschat } from "../../../../backend/constrollers/chatcontroller";


const  Drawer1 = ({search,setsearch})=> {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setselectchat, chats, setchats,loadingchat,setloadingchat } = useChatState();
  const btnRef = React.useRef();
  const toast = useToast();
  const [searchR, setsearchR] = useState([]);
  const [loading,setloading] = useState(false);
  
  const handlesearch = async ()=>{
    if(!search){
        toast({
          title: "Warning",
          description: "Write somthing to search",
          status: "warning",
          duration: 2000,
          isClosable: true,
          position : "top-left"
        });
        return;
    }
    try{
        setloading(true);
        const config = {
            headers:{
                Authorization : `Bearer ${user.token}`
            }
        };
        const {data} = await axios.get(`/api/user?search=${search}`,config);
        setloading(false);
        setsearchR(data);
    }
    catch(err){
        setloading(false);
        toast({
          title: "Error",
          description: err.message,
          status: "warning",
          duration: 2000,
          isClosable: true,
          position: "top-left",
        });
    }
  }
  const accessChat2 =async  (userId)=>{
    try{
        setloadingchat(true);
        const config = {
          headers: {
            "Content-type" : "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const {data} = await axios.post('/api/chat',{userId},config);
        if(!chats.find((c)=>c._id=== data._id)){
            setchats([data,...chats]);
        }
        // console.log(data);
        setselectchat(data);
        setloadingchat(false);
        onClose();
        return;
    }
    catch(err){
        setloadingchat(false);
        console.log(err.message);
        toast({
          title: "Error fs",
          description: err.message,
          status: "warning",
          duration: 2000,
          isClosable: true,
          position: "top-left",
        });
        return;
    }
  }
  return (
    <>
      <div ref={btnRef} onClick={onOpen} style={{display : "flex"}}>
        <i className="fas fa-search"></i>
        <Text d={{ base: "none", md: "flex" }} px={2}>
          Search User
        </Text>
      </div>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search User</DrawerHeader>

          <DrawerBody>
            <Box display="flex" pb={2}>
            <Input placeholder="Type here..." onChange={(e)=>setsearch(e.target.value)} value={search}/>
            <Button marginLeft={"10px"} onClick={handlesearch}>Search </Button>
            </Box>
            {
                loading ? (<Chatload />):(
                    searchR.map((user)=>{
                        return (<UserListItem user = {user} handleFunction={()=>accessChat2(user._id)}/>)
                    })
                )
            }
            {loadingchat && <Spinner ml = "auto" display={"flex"}/>}
          </DrawerBody>

          <DrawerFooter>
            
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default Drawer1
