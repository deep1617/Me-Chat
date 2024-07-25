import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const ChatContext = createContext();
const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectchat, setselectchat] = useState();
  const [chats, setchats] = useState([]);
  const [loadingchat, setloadingchat] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const userinfo = localStorage.getItem("userInfo");
    if (!userinfo) {
      history.push("/");
    } 
    else {
      setUser(JSON.parse(userinfo));
    }
  }, [history]);

  return (
    <ChatContext.Provider value={{ user, setUser,selectchat,setselectchat,chats,setchats,loadingchat,setloadingchat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatState = () => {
  return useContext(ChatContext);
};

export default  ChatProvider ;
