import User from "../models/userModal.js";

const getExploreUsers = async (req, res) => {
  try {
    const exploreUser = await User.find({});
    res.status(200).json(exploreUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("error in get explore user: ", error.message);
  }
};

export default getExploreUsers;
