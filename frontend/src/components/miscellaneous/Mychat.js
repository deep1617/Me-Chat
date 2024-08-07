import React, { useEffect, useState } from 'react'
import { useChatState } from '../../context/chatprovider'
import { Box, useToast, Button, Stack, Text } from "@chakra-ui/react";
import axios from 'axios';
import Chatload from './chatload';
import GroupChatModal from './GroupChatModal';

const Mychat = ({ fetchagain }) => {
  // const [loggeduser, setloggeduser] = useState();
  const { selectchat, setselectchat, chats, setchats, user, loadingchat } =
    useChatState();
  const toast = useToast();
  const getSender = (users) => {
    return users[0]._id === user._id ? users[1].name : users[0].name;
  };
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setchats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  useEffect(() => {
    fetchChats();
    // eslint-disable-next-line
  }, [fetchagain]);
  return (
    <Box
      d={{ base: selectchat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
        <Button d="flex" fontSize={{ base: "17px", md: "10px", lg: "17px" }}>
          New Group Chat
        </Button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="90%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => {setselectchat(chat)}}
                cursor="pointer"
                bg={selectchat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectchat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
                
              </Box>
            ))}
          </Stack>
        ) : (
          <Chatload />
        )}
      </Box>
    </Box>
  );
};

export default Mychat