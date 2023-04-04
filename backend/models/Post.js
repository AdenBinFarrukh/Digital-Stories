const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
      min: 3,
      max: 20,
    },
    desc: {
      type: String,
      max: 500,
    },
    image: String,
    video: String,
    likes: {
      type: Array,
      default: [],
    },
    is_public: {
      type: Boolean,
      default: false,
    },
    points: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        text: {
          type: String,
          required: true,
        },
        author: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "User",
          required: true,
        },
      },
      { timestamps: true },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
