const db = require('../config/db');
const mysql = require('mysql2');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
class Post {
    constructor(userId,closetId,serverDatabase) {
        this.user_Id = userId;
        this.closet_Id = closetId;
        this.serverDatabase=serverDatabase;
    }

    static findUser(email,password) {
        let sql=`Select * from Users where Email = '${email}' && Password = '${password}'`
        console.log(sql);
        return db.execute(sql);
    }
    static getSchedule(userId,closetId) {
        let searchSql=`Select schedule from schedules where user_id='${userId}' && closet_Id='${closetId}'`
        return db.execute(searchSql);
    }
    static async addUser(firstName,lastName,phoneNo,email,password) {

        const customer = await stripe.customers.create({ email: email, name: firstName });
        let addSql=`Insert into Users set First_Name='${firstName}', Last_Name='${lastName}',Phone_No='${phoneNo}',Email='${email}',Password='${password}',stripe_customer_id='${customer.id}'`
        return db.execute(addSql);
    }
    

    static async addSchedule(userId,closetId,schedules,serverDatabase) {
        
        let searchSql=`Select * from schedules where user_id='${userId}' && closet_Id='${closetId}'`
        let [response,_] = await db.execute(searchSql);
        if(response.length>0)
        {
            let updateSql=`Update schedules set schedule='${schedules}',update_status='${1}' where user_id='${userId}' && closet_Id='${closetId}'`
            let [update_response,_] = await db.execute(updateSql);

            var connection = mysql.createConnection({
                host: serverDatabase,
                user: process.env.DB_NAME,
                database: process.env.DB_NAME_B,
                password:process.env.DB_PASSWORD,
              });
              
              connection.connect();
              let updateServerDb=`Update  schedules set schedule='${schedules}',update_status='${1}' where user_id='${userId}' && closet_Id='${closetId}'`
              let data = await connection.promise().query(updateServerDb);
       
            return "Update"
        }
        else{
            let addSql=`Insert into schedules set user_id='${userId}', closet_Id='${closetId}',schedule='${schedules}',update_status='${1}'`
            let [add_response,_] = await db.execute(addSql);
            var connection = mysql.createConnection({
                host: serverDatabase,
                user: process.env.DB_NAME,
                database: process.env.DB_NAME_B,
                password:process.env.DB_PASSWORD,
              });
              
              connection.connect();
              let addServerDb=`Insert into schedules set user_id='${userId}', closet_Id='${closetId}',schedule='${schedules}',update_status='${1}'`
              let data = await connection.promise().query(addServerDb);
       
            return "Added"
        } 
    }
    static findCloset(userId) {
    let sql=`Select * from poshmark_details where user_id = '${userId}'`
    console.log(sql);
    return db.execute(sql);
    }
    async findLogs() {
       var logs='';
       var connection = mysql.createConnection({
        host: serverDatabase,
        user: process.env.DB_NAME,
        database: process.env.DB_NAME_B,
        password:process.env.DB_PASSWORD,
      });
      
      connection.connect();
      let sql=`Select * from share_logs where user_id='${this.user_Id}' && closet_id='${this.closet_Id}' order by log_time desc limit 100`;
     let data = await connection.promise().query(sql)
            .then( ([rows,fields]) => {logs=rows})
            .catch(console.log)
            .then( () =>
            {
                connection.end();
                return logs
            });
            return data
    }
    async findAllLogs() {
        var logs='';
        var connection = mysql.createConnection({
         host: process.env.DB_HOST,
         user: process.env.DB_NAME,
         database: process.env.DB_NAME_B,
         password:process.env.DB_PASSWORD,
       });
       
       connection.connect();
       let sql=`Select * from share_logs`;
      let data = await connection.promise().query(sql)
             .then( ([rows,fields]) => {logs=rows})
             .catch(console.log)
             .then( () =>
             {
                 connection.end();
                 return logs
             });
             return data
     }

     static async getProduct() {
        let data=[];
        const product = await stripe.products.list({
          });
        const price = await stripe.prices.list({
        });
        data.push({product:product,price:price})
        return data
        // let addSql=`Insert into user_cards set card_no='${cardNo}', expiry_date='${expiryDate}',holder_name='${holderName}'`
        // return db.execute(addSql);
    }  
    static async getSubscription() {
        const listsubscription = await stripe.subscriptions.list({
            limit: 3,
          });
          return listsubscription
        // let addSql=`Insert into user_cards set card_no='${cardNo}', expiry_date='${expiryDate}',holder_name='${holderName}'`
        // return db.execute(addSql);
    }  

     static async addCard(holderName,cardNo,expiryDate) {

        let addSql=`Insert into user_cards set card_no='${cardNo}', expiry_date='${expiryDate}',holder_name='${holderName}'`
        return db.execute(addSql);
    }
    static async addPaymentMethod(cardNo,exp_month,exp_year,cvc) {
        
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
              number: cardNo,
              exp_month: exp_month,
              exp_year: exp_year,
              cvc: cvc,
            },
          });
        return paymentMethod
        // let addSql=`Insert into user_cards set card_no='${cardNo}', expiry_date='${expiryDate}',holder_name='${holderName}'`
        // return db.execute(addSql);
    }  
    static async attachPaymentMethod(paymentMethodId,customerId) {
        
        const paymentMethod = await stripe.paymentMethods.attach(
            'pm_1MgkQ3FiqFjlS2ot3UVpi6tP',
            {customer: 'cus_NRGtut4DKjMYYZ'}
          );
          
        return paymentMethod
        // let addSql=`Insert into user_cards set card_no='${cardNo}', expiry_date='${expiryDate}',holder_name='${holderName}'`
        // return db.execute(addSql);
    }
    static async getSubscription(customerId,priceId) {
        const subscription = await stripe.subscriptions.create({
            customer: 'cus_NRGtut4DKjMYYZ',
            items: [
              { price: 'price_1Mg1OaFiqFjlS2otmtSp3LNY' },
            ],
          });
        return subscription
        // let addSql=`Insert into user_cards set card_no='${cardNo}', expiry_date='${expiryDate}',holder_name='${holderName}'`
        // return db.execute(addSql);
    }

    static async removeSubscription(subscriptionId){
        const CancelSubscriptions = await stripe.subscriptions.del(
            subscriptionId
          );
        return CancelSubscriptions
    }

    static async linkCloset(closetName,password,country,userId) {

        const getProxyQuery=`SELECT proxies.proxy_ip, COUNT(poshmark_details.proxy) FROM proxies LEFT JOIN poshmark_details ON proxies.proxy_ip = poshmark_details.proxy GROUP BY proxies.proxy_ip ORDER By COUNT(poshmark_details.proxy) ASC`;
        const [proxies,p]= await db.execute(getProxyQuery);
        const getServerQuery=`SELECT servers.server_ip,servers.db_ip, COUNT(poshmark_details.server_ip) FROM servers LEFT JOIN poshmark_details ON servers.server_ip = poshmark_details.server_ip GROUP BY servers.server_ip ORDER By COUNT(poshmark_details.server_ip) ASC`
        const [servers,s]= await db.execute(getServerQuery); 

        let RandomServer=servers[Math.floor(Math.random()*servers.length)].server_ip;
        let RandomProxy=proxies[Math.floor(Math.random()*proxies.length)].proxy_ip;
        let RandomServerDatabase=servers[Math.floor(Math.random()*servers.length)].db_ip;

        let addAppDb=`Insert into poshmark_details set closet_name='${closetName}',password='${password}',country='${country}',user_id='${userId}',proxy='${RandomProxy}',server_ip='${RandomServer}',db_ip='${RandomServerDatabase}',update_status='${1}'`
         const [result,_]= await db.execute(addAppDb);
   
        var connection = mysql.createConnection({
         host: RandomServerDatabase,
         user: process.env.DB_NAME,
         database: process.env.DB_NAME_B,
         password:process.env.DB_PASSWORD,
       });
       
       connection.connect();
       let addServerDb=`Insert into closet_app_info set user_id_main_server='${userId}',closet_id_main_server='${result.insertId}', closet_name='${closetName}',password='${password}',country='${country}',proxy='${RandomProxy}',update_status='${1}'`
       let data = await connection.promise().query(addServerDb);

        return 'SuccessFul'
             
     }
    
}
module.exports = Post;