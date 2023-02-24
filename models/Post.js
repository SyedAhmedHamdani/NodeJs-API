const db = require('../config/db');
const mysql = require('mysql2');

class Post {
    constructor(userId,closetId) {
        this.user_Id = userId;
        this.closet_Id = closetId;
    }

    static findUser(email,password) {
        let sql=`Select * from Users where Email = '${email}' && Password = '${password}'`
        console.log(sql);
        return db.execute(sql);
    }
    
    static findCloset(userId) {
    let sql=`Select * from poshmark_details where user_id = '${userId}'`
    console.log(sql);
    return db.execute(sql);
    }
    async findLogs() {
       var logs='';
       var connection = mysql.createConnection({
        host: process.env.DB_HOST,
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
    
}
module.exports = Post;