import {
  Box,
  Button,
  Tooltip,
  Text,
  MenuButton,
  Menu,
  MenuList,
  Avatar,
  MenuItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";
import Profile from "./Profile";
import { useChatState } from "../../context/chatprovider";
import Drawer1 from "./drawer";
const Side = () => {
  const [search, setsearch] = useState("");
  const [loadChat, setloadChat] = useState();
  const history = useHistory();
  const {user} = useChatState();
  const logout = ()=>{
    localStorage.removeItem("userInfo");
    history.push("/");
  }
  const myprofile = ()=>{
    return(
      <Profile/>
    )
  }
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        background={"#ffffff"}
        py={2}
        border={"5px"}
      >
        <Tooltip  hasArrow placement="bottom-end">
          <Button variant="ghost" borderRadius={"5px"}>
            <Drawer1 search={search} setsearch = {setsearch} />
          </Button>
        </Tooltip>
        <Text marginRight={"100px"} fontSize={"26px"} display={"flex"}>
          <img
            src="https://image.winudf.com/v2/image1/Y29tLndTb21vQXBwX2ljb25fMTU1MjM4MTEyMV8wMzc/icon.png?w=340&fakeurl=1"
            alt=""
            width={53}
          />{" "}
          MeChat
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <i
                class="fa fa-bell"
                aria-hidden="true"
                style={{ width: "10px", marginRight: "30px", fontSize: "35px" }}
              ></i>
            </MenuButton>

            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button}>
              <Avatar size="sm" cursor={"pointer"} name={user.name}></Avatar>
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Profile user={user} children={"My Profile"} />
              </MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  );
};

export default Side;
