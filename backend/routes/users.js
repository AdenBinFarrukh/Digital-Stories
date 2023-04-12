const User = require("../models/User");
const Post = require("../models/Post");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//?update user
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can update only your account!");
    }
});

//! delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can delete only your account!");
    }
});

//* get a user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
});

//* follow a user

router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({
                    $push: { followings: req.params.id },
                });
                res.status(200).json("user has been followed");
            } else {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({
                    $pull: { followings: req.params.id },
                });
                res.status(200).json("user has been unfollowed");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you cant follow yourself");
    }
});

//* Get a list of connections

router.get("/:id/friends", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const connections = [
            ...new Set([...user.followers, ...user.followings]),
        ];

        const online = await Promise.all(
            connections.map(async (conn) => {
                const temp = await User.findById(conn);
                const { username, profilePicture, logged_in, _id } = temp._doc;
                return { username, profilePicture, logged_in, _id };
            })
        );
        res.status(200).json(online);
    } catch (err) {
        res.status(500).json(err);
    }
});

//* Get Leaders
router.get("/List/leaders", async (req, res) => {
    try {
        const topUsers = await Post.aggregate([
            {
                $group: {
                    _id: "$userId",
                    totalPoints: { $sum: "$points" },
                },
            },
            { $sort: { totalPoints: -1 } },
            { $limit: 10 },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user",
                },
            },
            { $unwind: "$user" },
            {
                $project: {
                    _id: 0,
                    userId: "$user._id",
                    username: "$user.username",
                    profilePicture: "$user.profilePicture",
                    totalPoints: 1,
                },
            },
        ]);
        res.json(topUsers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
