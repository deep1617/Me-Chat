import { Box } from "@chakra-ui/react";
import { useChatState } from "../context/chatprovider";
import Mychat from "../components/miscellaneous/Mychat";
import ChatBox from "../components/miscellaneous/ChatBox";
import Side from "../components/miscellaneous/sided";
import { useState } from "react";
const Chatpage = () => {
  const {user} = useChatState();
  const [fetchagain, setfetchagain] = useState(false);
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
        {user && <Mychat fetchagain = {fetchagain}/>}
        {user && <ChatBox fetchagain = {fetchagain} setfetchagain={setfetchagain}/>}
      </Box>
    </div>
  );
};

export default Chatpage;
