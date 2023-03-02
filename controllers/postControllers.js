const Post = require('../models/Post');


exports.getAllLogs= async (req,res,next) => {
    let post = new Post();
    post = await post.findAllLogs(); 
    res.status(200).json({post})
}

exports.getUserLogs= async (req,res,next) => {
    let {userId,closetId,serverDatabase} = req.body;
    let post = new Post(userId,closetId,serverDatabase);
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
    let {userId,closetId,schedules,serverDatabase} = req.body;
    let schedule= await Post.addSchedule(userId,closetId,schedules,serverDatabase); 
    res.status(200).json({schedule});
}
exports.getUserSchedule= async (req,res,next) => {
    let {userId,closetId} = req.body;
    let [schedule,_]= await Post.getSchedule(userId,closetId); 
    res.status(200).json(schedule);
}
exports.signupNewUser= async (req,res,next) => {
    let {firstName,lastName,phoneNo,email,password} = req.body;
    let [user,_]= await Post.addUser(firstName,lastName,phoneNo,email,password); 
    res.status(200).json(user);
}
exports.addUserCard= async (req,res,next) => {
    let {holderName,cardNo,expiryDate} = req.body;
    let [card,_]= await Post.addCard(holderName,cardNo,expiryDate); 
    res.status(200).json(card);
}
exports.addNewSubscription= async (req,res,next) => {
    let {customerId,priceId} = req.body;
    let subscription= await Post.getSubscription(customerId,priceId); 
    res.status(200).json(subscription);
}
exports.addNewPaymentMethod= async (req,res,next) => {
    let {cardNo,exp_month,exp_year,cvc} = req.body;
    let payment_method= await Post.addPaymentMethod(cardNo,exp_month,exp_year,cvc); 
    res.status(200).json(payment_method);
}
exports.attachNewPaymentMethod= async (req,res,next) => {
    let {paymentMethodId,customerId} = req.body;
    let payment_method= await Post.attachPaymentMethod(paymentMethodId,customerId); 
    res.status(200).json(payment_method);
}
exports.getStripeProduct= async (req,res,next) => {
    let product= await Post.getProduct(); 
    res.status(200).json(product);
}
exports.getStripeSubscription= async (req,res,next) => {
    let subscription= await Post.getSubscription(); 
    res.status(200).json(subscription);
}
exports.cancelStripeSubscription= async (req,res,next) => {
    let {subscriptionId} = req.body;
    let subscription= await Post.removeSubscription(subscriptionId); 
    res.status(200).json(subscription);
}
exports.linkCloset= async (req,res,next) => {
    let {closetName,password,country,userId} = req.body;
    let closet= await Post.linkCloset(closetName,password,country,userId); 
    res.status(200).json(closet);
}
exports.updateLinkCloset= async (req,res,next) => {
    let {closetName,password,country,userId,serverDatabase} = req.body;
    let closet= await Post.updateLinkCloset(closetName,password,country,userId,serverDatabase); 
    res.status(200).json(closet);
}
exports.getCurrentActivity= async (req,res,next) => {
    let {userId,closetId,serverDatabase} = req.body;
    let Activity= await Post.getCurrentActivity(userId,closetId,serverDatabase); 
    res.status(200).json(Activity);
}