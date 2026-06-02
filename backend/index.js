const express = require('express');
const cors = require('cors');
const user_model = require('./db/user');

require('./db/config');

const app = express();

app.use(express.json());
app.use(cors());

// Signup Route
app.post('/signup', async (req, res) => {
    try {
        console.log(req.body);

        const user = new user_model(req.body);

        await user.save();

        console.log('User Saved');

        res.send(user);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// Get All Users Route
app.get('/users', async (req, res) => {
    try {
        const users = await user_model.find();
        res.send(users);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

app.listen(5000, () => {
    console.log('Server Running on Port 5000');
});