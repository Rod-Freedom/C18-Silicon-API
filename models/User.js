import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address!'],
        },
        posts: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            },
        ],
        links: [
            {
            type: Schema.Types.ObjectId,
            ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

userSchema.virtual('linkCount').get(function () {
    if (this.links) return this.links.length;
});

const User = model('User', userSchema);

export default User;