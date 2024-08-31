import { Schema, model } from 'mongoose';
import likeSchema from './Like.js';

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: 'Add a title\nto your post!',
      minlength: 1,
      maxlength: 70
    },
    content: {
      type: String,
      required: 'You forgot\nto write something...',
      minlength: 1,
      maxlength: 1000
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    likes: [likeSchema],
  },
  {
    toJSON: {
      virtuals: true
    },
  }
);

postSchema.virtual('postDate').get(function() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const date = new Date(this.createdAt); 
    console.log(this.createdAt)
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    const formattedDate = `${month} ${day}, ${year}`;

    return formattedDate;
});

postSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

const Post = model('Post', postSchema);

export default Post;