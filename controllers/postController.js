import postsMod from '../models/postModel.js';

export async function getPost(req, res){
    try {
        const post = await postsMod.findById(req.params.id);
        if (!post) return res.status(404).send('The post with the given ID was not found.');
        res.send(post);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function createPost(req, res){
    try{
        const post = await postsMod.create(req.body);
    }
    catch(error){
        res.status(500).send(error.message);
    }
}
export async function updatePost(req, res) {
try{
    postsMod.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true
    });
}
catch(error){
    res.status(500).send(error.message);
};
}
export async function deletePost(req, res) {
    try{
        const post = await postsMod.findByIdAndDelete(req.params.id);
        if(!post) return res.status(404).send('The post with the given ID was not found.');
        res.send(post);
    }
    catch(error){
        res.status(500).send(error.message);
    }
}