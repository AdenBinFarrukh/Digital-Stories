const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const moment = require("moment");

//* create a post

router.post("/", async (req, res) => {
    console.log(req.body);
    const newPost = new Post(req.body);
    console.log(newPost);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//* update a post

router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("the post has been updated");
        } else {
            res.status(403).json("you can update only your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//!delete a post

router.delete("/:id/:userId", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        console.log(
            "🚀 ~ file: posts.js:43 ~ router.delete ~ post.userId:",
            post.userId
        );
        console.log(
            "🚀 ~ file: posts.js:44 ~ router.delete ~ req.params.userId:",
            req.params.userId
        );
        if (post.userId == req.params.userId) {
            await post.deleteOne();
            res.status(200).json("the post has been deleted");
        } else {
            res.status(403).json("you can delete only your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//* like / dislike a post

router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({
                $push: { likes: req.body.userId },
                $inc: { points: 1 },
            });
            res.status(200).json("The post has been liked");
        } else {
            await post.updateOne({
                $pull: { likes: req.body.userId },
                $inc: { points: -1 },
            });
            res.status(200).json("The post has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//* get a post

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

//* get timeline posts

router.get("/timeline/:userId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id }).sort({
            createdAt: -1,
        });

        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId }).sort({ createdAt: -1 });
            })
        );

        const filteredFriendPosts = friendPosts.filter(
            (posts) => posts.length > 0
        );
        const flattenedFriendPosts = filteredFriendPosts.flat();
        res.status(200).json(flattenedFriendPosts.concat(userPosts));
    } catch (err) {
        res.status(500).json(err);
    }
});

//* add comments to a post in mongodb post schema
router.put("/:id/comment", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        console.log(post);
        await post.updateOne({
            $push: { comments: req.body },
            $inc: { points: 1 },
        });
        res.status(200).json("Commented");
    } catch (err) {
        res.status(500).json(err);
    }
});

//* Get comment from a specific post
router.get("/:postId/getcomments", async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const comments = post.comments;
        res.status(200).json({ comments });
    } catch (err) {
        res.status(500).json(err);
    }
});

//! Delete a comment
router.delete("/:postId/comments/:commentId", async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const comment = post.comments.id(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        const index = post.comments.indexOf(comment);
        post.comments.splice(index, 1);
        post.points -= 1;
        await post.save();
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
});

//* Route to get the most liked and commented posts in the last 3 days
router.get("/List/Trending", async (req, res) => {
    const threeDaysAgo = moment().subtract(3, "days").toDate();

    try {
        const posts = await Post.aggregate([
            { $match: { createdAt: { $gte: threeDaysAgo } } },
            { $addFields: { numLikes: { $size: "$likes" } } },
            { $addFields: { numComments: { $size: "$comments" } } },
            { $sort: { numLikes: -1, numComments: -1 } },
            { $limit: 10 },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user",
                },
            },
            { $unwind: "$user" },
            {
                $project: {
                    _id: 1,
                    userId: 1,
                    desc: 1,
                    image: 1,
                    video: 1,
                    likes: 1,
                    is_public: 1,
                    points: 1,
                    comments: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    numLikes: 1,
                    numComments: 1,
                    "user.username": 1,
                },
            },
        ]);

        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
