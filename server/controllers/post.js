import mongoose from 'mongoose'
import PostMessage from '../models/postMessage.js'


            //getPost//
export const getPosts = async(req, res) => {
    try {
        const PostMessages = await PostMessage.find();
        res.status(200).json(PostMessages)

    } catch (error) {
        res.status(404).json({message: error.message});
    }
};


            //createPost//
export const createPost = async(req, res) => {

    const post = req.body;

    const newPost = new PostMessage(post)

    try {
        await newPost.save();
        res.status(201).json(newPost);

    }catch (error) {
        res.status(409).json({message: error.message});
    }
};


            //updatePost//
export const updatePost = async(req, res) => {

    const {id: _id} = req.params;

    const post = req.body;

        if( !mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id},
            {new: true});

            res.json(updatedPost);

};


            //deletePost//
export const deletePost = async(req, res) => {

        const { id: _id } = req.params;
        
            if( !mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

            await PostMessage.findByIdAndDelete(_id);

            res.json({message: 'Post deleted successfully'});
};


            //likeCount//
export const likePost = async(req, res) => {
    const { id:_id } = req.params;

        if( !mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

        const post = await PostMessage.findById(id);

        const updatedPost = await PostMessage.findOneAndUpdate(id, {likeCount: post.likeCount + 1}, {new: true});

        res.json({updatedPost})
}