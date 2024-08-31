import { Schema } from 'mongoose';

const likeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
  },
  {
    id: false
  }
);

export default likeSchema;
