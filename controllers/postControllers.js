const Post = require('../models/Post');


exports.getAllLogs= async (req,res,next) => {
    let post = new Post();
    post = await post.findAllLogs(); 
    res.status(200).json({post})
}

exports.getUserLogs= async (req,res,next) => {
    let {userId,closetId} = req.body;
    let post = new Post(userId,closetId);
    post = await post.findLogs(); 
    res.status(200).json({post})
}
exports.getUser= async (req,res,next) => {
    let {email,password} = req.body;
    let [user,_] = await Post.findUser(email,password); 
    res.status(200).json({user});
}
exports.getUserCloset= async (req,res,next) => {
    let {userId} = req.body;
    let [closet,_] = await Post.findCloset(userId); 
    res.status(200).json({closet});
}
exports.addUserSchedule= async (req,res,next) => {
    let {userId,closetId,schedules} = req.body;
    let schedule= await Post.addSchedule(userId,closetId,schedules); 
    res.status(200).json({schedule});
}
