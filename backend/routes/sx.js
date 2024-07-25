router.post("/",upload.single('pic'),registerUser);
router.post("/login", authUser);
router.get("/",protect,allUsers);
router.post('/',protect,sendmessages);
router.route("/:chatId").get(protect, allmessages);
router.post("/",protect,accesschat);
router.get("/", protect, fetchChats);
router.post("/group",protect,createGroupChat);
router.put("/rename",protect,renameGroup);
router.put("/groupremove",protect,removeFromGroup);
router.put("/addgroup",protect,addToGroup);
// here protect is a middleware where iam using JWT token to verify current user.