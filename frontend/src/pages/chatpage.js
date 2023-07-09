import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useChatState } from "../context/chatprovider";
import Mychat from "../components/miscellaneous/Mychat";
import ChatBox from "../components/miscellaneous/ChatBox";
import Side from "../components/miscellaneous/sided";
const Chatpage = () => {
  const {user} = useChatState();
  return (
    <div style={{width:"100%"}}>
      {user && <Side/>}
      <Box
      display = "flex"
      justifyContent={'space-between'}
      w = '100%'
      p = '10px'
      h = '91.5vh'
      >
        {user && <Mychat/>}
        {user && <ChatBox/>}
      </Box>
    </div>
  );
};

export default Chatpage;
