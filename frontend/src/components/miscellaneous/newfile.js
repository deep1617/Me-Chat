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
      d="flex"
      flexDir="column"
      justifyContent="flex-end"
      p={3}
      bg="#E8E8E8"
      w="100%"
      h="90%"
      borderRadius="lg"
      overflowY="hidden"
    >
      {!loading ? (
        <Spinner
          size="xl"
          w={20}
          h={20}
          alignSelf="center"
          margin="auto"
          marginLeft={"45%"}
          marginTop={"24%"}
        />
      ) : (
        <div className="messages">

          <ScrollableChat messages={message} />
        </div>
      )}
      <FormControl onKeyDown={sendmessage} isRequired mb={"0px"}>
        <Input
          variant="filled"
          bg="#E0E0E0"
          w={"63%"}
          placeholder="Enter a message.."
          value={newMessage}
          onChange={typinghandler}
        />
      </FormControl>
    </Box>
  </>
) : (
  <>Gandu select kar nahi toh tera ghar jayega</>
)}