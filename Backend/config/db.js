const {Sequelize} = require ('sequelize');
require ('dotenv').config();

const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

sequelize.authenticate()
.then(()=>{
    console.log("Successful db connection")
})
.catch((err)=>{
    console.log("Error while connecting to db: ", err)
})

module.exports = sequelize;