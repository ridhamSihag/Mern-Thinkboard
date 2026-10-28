
const express = require('express');
const morgan = require('morgan')
const app = express();
const userModel = require('./public/models/user')
const dbConnection = require('./config/db')



app.use (morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))



// Set EJS as the view engine
app.set('view engine', 'ejs');

// Home page
app.get('/', (req, res) => {
    res.render('index');
});

// About page
app.get('/about', (req, res) => {
    res.send('About Page');
});

// Profile page
app.get('/profile', (req, res) => {
    res.send('Profile Page');
});

app.get('/register',(req,res) =>{
    res.render('register')
})



app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const newUser = await userModel.create({
            username: username,
            email: email,
            password: password
        });

        console.log("User saved:", newUser);

        res.send("User registered successfully!");
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send("Error registering user");
    }
});


app.post('/get-form-data', (req, res) => {
    console.log(req.body);
    res.send('data received');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
