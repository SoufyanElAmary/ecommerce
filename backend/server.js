const app = require('./app');
const dotenv = require('dotenv');

// Handle Uncaught exceptions 
process.on('uncaughtException', err => {
    console.log(`ERROR : ${err.message}`);
    console.log('Shutting down due to Uncaught Exception');
    process.exit(1);
} )



const connectDatabase =require('./config/database');
dotenv.config({ path: "backend/config/config.env" });    
app.get('/',(req,res)=>{
    res.send("hello");
    res.end();
})
connectDatabase();
const server = app.listen(process.env.PORT,()=>{console.log(`access to port ${process.env.PORT}`)});
// Handle unhandled promise rejections
process.on("unhandledRejection",err=>{
    console.log(err.message);
    console.log('shutting donw the server ...');
    server.close(()=> process.exit())
})

