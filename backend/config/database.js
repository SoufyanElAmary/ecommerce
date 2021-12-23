const mongoose = require('mongoose');
const connectDatabase = ()=>{
	mongoose.Promise = global.Promise; 
    mongoose.connect(process.env.URL, {

    }).then(con =>{
        console.log('succes connexion'+' '+con.connection.host)
    }); 
}
module.exports = connectDatabase;   