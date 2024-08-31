import { User, Post } from "../models/index.js";

export default class UserCtrl {
    static async getUsers (req, res) {
        try {
            const users = await User.find()
                .select('-__v -posts -links');
            
            if (!users || users.length === 0) res.status(200).json({ message: 'Sorry, no users yet!' })
            else res.status(200).json(users)

        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }
    
    static async getUsersFull (req, res) {
        try {
            const users = await User.find()
                .populate('posts links')
            
            if (!users || users.length === 0) res.status(200).json({ message: 'Sorry, no users yet!' })
            else res.status(200).json(users)

        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }
    
    static async getUser (req, res) {
        const { params } = req;
        
        try {
            const user = await User.findOne(params)
                .select('-__v')
                .populate('posts links', '-__v -posts -user');
            
            if (!user) res.status(404).json({ message: 'Sorry, no user found' })
            else res.status(200).json(user)

        } catch (error) {
            res.status(400).json(error)
        }
    }
    
    static async addUser (req, res) {
        const { body } = req;
        
        try {
            const newUser = await User.create(body);
            
            res.status(200).json(newUser);

        } catch (error) {
            const { message } = error;
            res.status(400).json({ message })
        }
    }
    
    static async deleteUser (req, res) {
        const { params, params: { _id: userID } } = req;
        
        try {
            const postsQuery = { user: userID };
            const linksQuery = { links: userID };

            const deletedUser = await User.deleteOne(params);
            const deletedPosts = await Post.deleteMany(postsQuery);
            const linkedUsers = await User.find(linksQuery);

            let index = 0;
            const limit = linkedUsers.length;
            const updatedUsers = [];

            const deleteLinks = async () => {
                const i = linkedUsers[index].links.indexOf(userID);
                linkedUsers[index].links.splice(i, 1);
                const uptUser = await linkedUsers[index].save();
                
                updatedUsers.push(uptUser);
                index++;

                if (index < limit) await deleteLinks()
                else return
            }

            await deleteLinks();
            
            res.status(200).json({deletedUser, deletedPosts, updatedUsers});

        } catch (error) {
            console.log(error)
            res.status(400).json(error);
        }
    }
    
    static async updateUser (req, res) {
        const { body: { username, email }, params } = req;
        
        try {
            const limUpdate = { username, email };

            const updatedUser = await User.findOneAndUpdate(params, limUpdate, { new: true });
            
            res.status(200).json(updatedUser);

        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }
    
    static async addRemoveLink (req, res) {
        const { body, body: { _id: idOne }, params, params: { _id: idTwo } } = req;
        
        try {
            if (!idOne) return res.status(404).json({ message: 'Missing user id' })
            if (idOne === idTwo) return res.status(404).json({ message: 'Can\'t link the same user id' })

            // the params id(idOne) is the adder, while the body id(idTwo) is the added one.
            let userOne = await User.findOne(params);
            let userTwo = await User.findOne(body);
            
            const linkOneIndex = userOne.links.indexOf(idOne);
            const linkTwoIndex = userOne.links.indexOf(idTwo);

            if (linkOneIndex !== -1) {
                userOne.links.splice(linkOneIndex, 1);
                userTwo.links.splice(linkTwoIndex, 1);
            } else {
                userOne.links.push(idOne);
                userTwo.links.push(idTwo);
            }
            
            userOne = await userOne.save();
            userTwo = await userTwo.save();
            
            return res.status(200).json({ user: userOne, linkedUser: userTwo });

        } catch (error) {
            res.status(400).json(error);
        }
    }
}