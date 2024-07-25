import React, { useEffect, useState } from "react";
import { useChatState } from "../../context/chatprovider";
import {
  Flex,
  Text,
  Spinner,
  Box,
  FormControl,
  Input,
  Toast,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import Lottie from "react-lottie";
import Profile from "./Profile";
import "./style.css";
import UpdateGroupChatModal from "./UpdateGroupModal";
import ScrollableChat from "./ScrollableChat.js";
import { getSenderFull } from "../config/ChatLogics.js";
import axios from "axios";
const SingleChat = ({ fetchagain, setfetchagain }) => {
  const getSender = (user, users) => {
    return users[0]._id === user._id ? users[1] : users[0];
  };
  const toast = useToast();
  const [message, setmessage] = useState([]);
  const [istyping, setistyping] = useState(false);
  const [loading, setloading] = useState(true);
  const [newMessage, setnewMessage] = useState();
  const { selectchat, user, setselectchat } = useChatState();
  const fetchmessages = async () => {
    if (!selectchat) return;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      setloading(false);
      const { data } = await axios.get(
        `/api/message/${selectchat._id}`,
        config
      );
      console.log(data);
      setmessage(data);
      setloading(true);
    } catch (err) {
      toast({
        title: "Error Occured!",
        description: "Failed to load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const sendmessage = async (e) => {
    if (e.key == "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setnewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectchat._id,
          },
          config
        );

        setmessage([...message, data]);
        console.log(data);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to Send the messages",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    }
  };
  const defaultOptions = {};
  useEffect(() => {
    fetchmessages();
  }, [selectchat]);
  const typinghandler = (e) => {
    setnewMessage(e.target.value);
  };

  const ENDPOINT = "http://localhost:5000";
  var socket ,selectedChatCompare;
  return (
    <>
      {selectchat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            {!selectchat.isGroupChat ? (
              <Text
                marginTop={"2px"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                {getSender(user, selectchat.users).name}
                <Profile user={getSender(user, selectchat.users)} />
              </Text>
            ) : (
              <Text
                marginTop={"2px"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                {selectchat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchmessages={fetchmessages}
                  fetchagain={fetchagain}
                  setfetchagain={setfetchagain}
                />
              </Text>
            )}
          </Text>
          <Box
            // position={"fixed"}
            d="flex"
            flexDir="col"
            justifyContent="flex-end"
            // p={3}
            bg="#E8E8E8"
            w="100%"
            h="90%"
            borderRadius="lg"
            // overflowY="hidden"
          >
            {!loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (

                <ScrollableChat messages={message} />
            )}

<FormControl
              w={"100%"}
              onKeyDown={sendmessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typinghandler}
              />
            </FormControl>
          </Box>
          
        </>
      ) : (
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
