const createError = require("http-errors");
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const eventRoute = require("./routes/event");
const uploadRoute = require("./routes/upload");
const placeRoute = require("./routes/place");
const eventTypeRoute = require("./routes/eventType");
const imagesRoute = require("./routes/images");
const attachmentRoute = require("./routes/attachment");
const customerRoute = require("./routes/customer")
const addressRoute = require("./routes/address")
const menuRoute = require("./routes/menu")
const orderRoute = require("./routes/order")
const chatRoute = require("./routes/chat")
const chatroomRoute = require('./routes/chatroom')
const messageRoute = require("./routes/message")
const messageSeenRoute = require("./routes/message_seen")
const likeRoutes = require("./routes/like")
const pingRoutes = require("./routes/ping")
const publicApi = require("./routes/publicApi")
const transactionRoutes = require("./routes/transaction")
const roleRoutes = require("./routes/role")
const permissionRoutes = require("./routes/permission")
const clientRoutes = require("./routes/client")
const customerGroupRoutes = require('./routes/customer_group')

let cookieParser = require("cookie-parser");
const { decodeToken } = require("./middleware");
app.use(cookieParser());

app.use(logger("dev"));
app.use(express.json());

//cors phải nằm đầu tiên trước tất cả router middleware nếu ko sẽ dính lỗi cors
app.use(
	cors({
		origin: (origin, callback) => {
			return callback(null, true)
		},
		methods: "GET,POST,PUT,DELETE",
	})
);


app.use('/',publicApi)
app.use('/api/*',decodeToken)
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/events", eventRoute);
app.use("/api/places", placeRoute);
app.use("/api/upload", uploadRoute);
app.use("/images", imagesRoute);
app.use("/api/attachments", attachmentRoute);
app.use("/api/event_types", eventTypeRoute);
app.use("/api/customers", customerRoute);
app.use("/api/address", addressRoute);
app.use("/api/menus", menuRoute);
app.use("/api/chat", chatRoute);
app.use("/api/chatroom", chatroomRoute);
app.use("/api/chatroom", chatroomRoute);
app.use("/api/messages", messageRoute);
app.use("/api/message_seen", messageSeenRoute);
app.use("/api/likes", likeRoutes);
app.use("/api/ping", pingRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/customergroups", customerGroupRoutes);

app.use("/api/order", orderRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
	return res.send({ error: true, message: "hello" });
});

const server = app.listen(5000, function () {
	console.log("Server is running on port 5000");
});
module.exports = app;
