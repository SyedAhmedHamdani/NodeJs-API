const Post = require('../models/Post');


exports.getAllLogs= async (req,res,next) => {
    console.log("Getting All Logs")
    let post = new Post();
    post = await post.findAllLogs(); 
    res.status(200).json({post})
}

exports.getUserLogs= async (req,res,next) => {
    let {userId,closetId,serverDatabase,flag} = req.body;
    let post = new Post(userId,closetId,serverDatabase,flag);
    post = await post.findLogs(); 
    res.status(200).json({post:post})
}
exports.getUser= async (req,res,next) => {
    let {email,password} = req.body;
    let [user,_] = await Post.findUser(email,password); 
    res.status(200).json({user:user});
}
exports.getUserCloset= async (req,res,next) => {
    let {userId} = req.body;
    let [closet,_] = await Post.findCloset(userId); 
    res.status(200).json({closet:closet});
}
exports.addUserSchedule= async (req,res,next) => {
    let {userId,closetId,schedules,serverDatabase} = req.body;
    let schedule= await Post.addSchedule(userId,closetId,schedules,serverDatabase); 
    res.status(200).json({schedule:schedule});
}
exports.getUserSchedule= async (req,res,next) => {
    let {userId,closetId} = req.body;
    let [schedule,_]= await Post.getSchedule(userId,closetId); 
    res.status(200).json({schedule:schedule});
}
exports.signupNewUser= async (req,res,next) => {
    let {firstName,lastName,phoneNo,email,password} = req.body;
    let [user,_]= await Post.addUser(firstName,lastName,phoneNo,email,password); 
    res.status(200).json({user:user});
}
exports.addUserCard= async (req,res,next) => {
    let {holderName,cardNo,expiryDate} = req.body;
    let [card,_]= await Post.addCard(holderName,cardNo,expiryDate); 
    res.status(200).json({card:card});
}
exports.addNewSubscription= async (req,res,next) => {
    let {customerId,priceId} = req.body;
    let subscription= await Post.getSubscription(customerId,priceId); 
    res.status(200).json({subscription:subscription});
}
exports.addNewPaymentMethod= async (req,res,next) => {
    let {cardNo,exp_month,exp_year,cvc} = req.body;
    let payment_method= await Post.addPaymentMethod(cardNo,exp_month,exp_year,cvc); 
    res.status(200).json({payment_method:payment_method});
}
exports.attachNewPaymentMethod= async (req,res,next) => {
    let {paymentMethodId,customerId} = req.body;
    let payment_method= await Post.attachPaymentMethod(paymentMethodId,customerId); 
    res.status(200).json({payment_method:payment_method});
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
    let [closet]= await Post.linkCloset(closetName,password,country,userId); 
    res.status(200).json({closet:closet});
}
exports.updateLinkCloset= async (req,res,next) => {
    let {closetName,password,country,userId,serverDatabase} = req.body;
    let closet= await Post.updateLinkCloset(closetName,password,country,userId,serverDatabase); 
    res.status(200).json({closet:closet});
}
exports.getCurrentActivity= async (req,res,next) => {
    let {userId,closetId,serverDatabase} = req.body;
    let Activity= await Post.getCurrentActivity(userId,closetId,serverDatabase); 
    res.status(200).json({Activity:Activity});
}
exports.getStatsCount= async (req,res,next) => {
    let {userId,closetId,serverDatabase} = req.body;
    let Stats= await Post.getStatsCount(userId,closetId,serverDatabase); 
    res.status(200).json({Stats:Stats});
}
exports.getPaymentStatus= async (req,res,next) => {
    let [Status,_]= await Post.checkingPaymentStats(); 
    res.status(200).json({Stats:Status});
}
exports.getCompetitionItem= async (req,res,next) => {
    let {userId,closetId,serverDatabase} = req.body;
    let Item= await Post.getCompetitionItem(userId,closetId,serverDatabase); 
    // let data=[];
    // Item[0].data.split('[').forEach(element => {
    //       element.split(']').forEach(ele=>{
    //         if(ele!=='')
    //         {
    //             ele=ele.replaceAll("{",'')
    //             ele=ele.replaceAll("}",'')
    //             data.push(ele)
    //         }      
    //       })    
    // });
    // let array=[];
    // data.forEach((ele)=>{
    //     if(ele.split(",")!='')
    //     {
    //         array.push(ele.split(","))
    //     }
       
    // })
    // let obj=[];
    // let temp=[];
    // array.forEach((element)=>{
    //         obj=[]
    //         for (let index = 0; index < element.length; index=index+5) {
    //             if(element[index] !=='')
    //             obj.push({id:element[index],price:element[index+1],title:element[index+2],image:element[index+3],condition:element[index+4]})
    //         }
    //         temp.push(obj)
    // })
     
    // console.log(temp[0]);
    
    res.status(200).json({Items:Item});
}