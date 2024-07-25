import { Box } from "@chakra-ui/react";
import React from "react";
import { useChatState } from "../../context/chatprovider";
import SingleChat from "./SingleChat";
const Chatbox = ({ fetchagain, setfetchagain }) => {
  const { selectchat } = useChatState();

  return (
    <Box
      d={{ base: selectchat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchagain={fetchagain} setfetchagain={setfetchagain} />
    </Box>
  );
};

export default Chatbox;

// export default ChatBox
