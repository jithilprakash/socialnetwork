const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator/check");
const User = require("../../models/User");
const Post = require("../../models/Post");
const auth = require("../../middlewares/auth");

//@route    POST
//@desc     create new post
//@access   Private

router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPosts = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const post = await newPosts.save();
      res.json(post);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

//@routes   GET
//@desc     Get all posts
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

//@routes   GET
//@desc     Get all posts/id
router.get("/:id", auth, async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);
    if (!posts) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(posts);
  } catch (error) {
    console.log(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    return res.status(500).send("Server Error");
  }
});

//@routes   DELETE
//@desc     DELETE posts/id
router.delete("/:id", auth, async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);
    if (posts.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await posts.remove();
    res.json({ msg: "Post deleted" });
  } catch (error) {
    console.log(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    return res.status(500).send("Server Error");
  }
});

//@routes   PUT
//@desc     PUT /like/id
router.put("/like/:id", auth, async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);
    // console.log(posts)

    if (
      posts.likes.filter(like => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post Already Liked" });
    }

    posts.likes.unshift({ user: req.user.id });
    await posts.save();
    res.json(posts.likes);
  } catch (error) {
    console.log(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    return res.status(500).send("Server Error");
  }
});

//@routes   PUT
//@desc     PUT /unlike/id
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);
    // console.log(posts)

    if (
      posts.likes.filter(like => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post not yet liked" });
    }
    const removeIndex = posts.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);
    posts.likes.splice(removeIndex, 1);

    await posts.save();
    res.json(posts.likes);
  } catch (error) {
    console.log(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    return res.status(500).send("Server Error");
  }
});

//@route    POST
//@desc     create new comment comment/:id
//@access   Private

router.post(
  "/comment/:id",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };
      post.comments.unshift(newComment);
      await post.save();

      res.json(post.comments);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

//@routes   DELETE comment /postid/comment id
//@desc delete comment from post
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );
    if (!comment) {
      res.status(404).json({ msg: "Comment does not exist" });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
