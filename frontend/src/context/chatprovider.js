import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const userinfo = localStorage.getItem("userInfo");
    if (!userinfo) {
      history.push("/chats");
    } else {
      setUser(JSON.parse(userinfo));
    }
  }, [history]);

  return (
    <ChatContext.Provider value={{ user, setUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatState = () => {
  return useContext(ChatContext);
};

export default  ChatProvider ;
