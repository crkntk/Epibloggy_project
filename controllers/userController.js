import userMod from '../models/userModel.js'
export async function getUser(req,res){
    //userMod.findOne({username: req.params.username}).then((user) => {
    //    res.json(user);
    //}).catch((err) => {
    //    console.log(err);
    //    res.status(500).send('Server Error');
    //});
    try{
        const user = await userMod.findById(req.params.id);
    }
    catch(err){
        console.log(err);
        res.status(500).send('Server Error');
    }
}
export async function createUser(req,res){
    //const newUser = new userMod({
    //    username: req.body.username,
    //    password: req.body.password,
    //    email: req.body.email
    //});
    //newUser.save().then((user) => {
    //    res.json(user);
    //}).catch((err) => {
    //    console.log(err);
    //    res.status(500).send('Server Error');
    //});
    try{
        const newUser = await userMod.create(req.body);
        res.send(newUser);
    }catch(err){
        console.log(err);
        res.status(400).send('Invalid data');
    }
}
export async function updateUser(req,res){
try{
    userMod.findByIdAndUpdate(req.params.id, req.body,{
    new: true,
    runValidators: true
})
}
catch(err){
    console.log(err);
    res.status(500).send('Server Error');
}}

export async function deleteUser(req, res) {
    try{
        await userMod.findByIdAndDelete(req.params.id);
        //res.send('User deleted');
    }catch(err){
        console.log(err);
        res.status(500).send('Server Error');
    }
 
}
