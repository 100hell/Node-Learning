import User from "../models/userModal.js";

const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const userTomodify = await User.findById(id);
    const currentUser = await User.findById(userId);
    if (id === userId.toString())
      return res
        .status(400)
        .json({ message: "You can't follow/unfollow yourself." });
    if (!userTomodify || !currentUser)
      return res.status(400).json({ error: "User not Found!" });

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      // Lets consider a case john wants to follow/unfollow jane.
      // it means user followss another user then we will unfollow the target person,For that we will remove the id of jane from the following array of john and will remove the id of john from the followers array of jane.
      await User.findByIdAndUpdate(userId, { $pull: { following: id } }); //This will modify following list of john
      await User.findByIdAndUpdate(id, { $pull: { followers: userId } }); //This will modify followers list of jane
      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      // In this case we will just do the opposite of the last if condition we will just ids to the following and followers list of john and jane respectively.
      await User.findByIdAndUpdate(userId, { $push: { following: id } }); //This will modify following list of john
      await User.findByIdAndUpdate(id, { $push: { followers: userId } }); //This will modify followers list of jane
      res.status(200).json({ message: "User followed successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("error in Follow unfollow user: ", error.message);
  }
};

export default followUnfollowUser;
