import express from "express";
import getData from "./controllers/getData.js";
import getDataMiddleware from "./middlewares/getDataMiddleware.js";
import mongoose from "mongoose";
import cors from "cors";
import { signupUser } from "./controllers/signupUser.js";
import { loginUser } from "./controllers/loginUser.js";
import getExploreUsers from "./controllers/getExploreUsers.js";
import followUnfollowUser from "./controllers/followUnfollowUser.js";

const app = express();

const mongoURI = "mongodb://localhost:27017/myNodeDataBase"; // Change this URL to your MongoDB URI

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());
// Define a route for the root URL
app.get("/getData", getDataMiddleware, getData);
app.post("/signup", signupUser);
app.post("/login", loginUser);
app.get("/api/users/explore", getExploreUsers);
app.post("/api/users/follow/:id", followUnfollowUser);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
