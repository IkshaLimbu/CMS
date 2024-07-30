require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/roleRoutes');
const db= require('./models');
const Users = db.Users;
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/role', roleRoutes);

const createAdmin = async () => {
    try {
        const adminExists = await Users.findOne({ where: { email: 'admin@example.com' } });
        if (!adminExists) {
            //const saltRounds = 10;
            const hashedPassword = await bcrypt.hash('admin_password', 12);
            await Users.create({
                name: 'admin',
                email: 'admin@example.com',
                password: hashedPassword,
                type: 'admin'
            });
            console.log('Admin user created.');
        }
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
};

db.sequelize.sync()
    .then(async () => {
        await createAdmin()
        app.listen(3000, () => {
            console.log("Server is running on port", 3000);
        });
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });