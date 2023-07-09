import { Box, Container, Text,Tab,TabPanels,Tabs,TabList,TabPanel } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Login from "../components/Authentication/Login.js";
import Sinup from "../components/Authentication/Sinup.js";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";
const Homepage = () => {
  const history = useHistory();
  useEffect(()=>{
    const userinfo = JSON.parse(localStorage.getItem("userInfo"));
    if(userinfo){
        history.push("/chats")
    }
  },[history])
  return (
    <Container maxW="x1" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        paddingLeft={"150px"}
        paddingRight={"150px"}
        bg={"#a2e0fe"}
        m="20px 0 15px 0"
        borderRadius="20px"
        borderWidth={"1px"}
        textAlign={"Center"}
        w="40%"
      >
        <Text fontSize={"1rem"} color={"blue"}>
          Me-Chat
        </Text>
        <Text>Chat with your friends</Text>
      </Box>
      <Box bg={"#a2e0fe"} w="40%" borderRadius={"20px"} borderWidth={"1px"}>
        <Tabs variant="soft-rounded">
          <TabList mb="0.5">
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Sinup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
