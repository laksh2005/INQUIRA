const express = require("express");
const http = require("http");
const app = express();
const nodemailer = require("nodemailer");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    port: 465,
    auth: {
      user: 'raghavagg2005@gmail.com',
      pass: 'mquf jxjb wnyz gwtn',
    },
});

app.post('/api/subscribe', async(req, res) => {
    const { email } = req.body;
    try {
        const receiver = {
          from: 'raghavagg2005@gmail.com',
          to: `${email}`,
          subject: 'Welcome to GailBot',
          text: 'Hello, Welcome to GailBot!',
        };
        
        await transporter.sendMail(receiver);
        console.log('Email sent successfully!');
        // res.status(200).send('Email sent successfully!');
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email.');
      }
    console.log('Received email from client:', email);
    res.status(200).json({ message: 'Email received and processing.' });
});

app.listen(8080, () => {
    console.log("App Listening at port 8080");
});