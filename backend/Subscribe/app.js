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
          subject: 'Discover the Power of GAIL Bot - Your Ultimate Chatbot Solution!',
          text : 
`Introducing GAILBOT: Your AI-Powered Solution

Meet GAILBOT, our advanced AI chatbot platform designed to boost efficiency and streamline communication across your organization. Whether you're in HR, IT, or another department, GAILBOT is here to transform how you manage queries and interact with information.

🌟 Key Features of GAILBOT
- Automated Query Handling: GAILBOT quickly answers common HR, IT, and other organizational queries, reducing support team workloads and providing instant, accurate responses.
- 📄 Advanced Document Processing: It analyzes and extracts key info from documents, making it easy to handle document-related tasks like summarizing content.
- ⚡ Scalability and Performance: GAILBOT efficiently supports multiple users, offering fast responses (under 5 seconds) for up to 5 concurrent users.
- 🔒 Enhanced Security: Featuring Two-Factor Authentication (2FA) and inappropriate language filtering, GAILBOT ensures secure and professional interactions.
- 👌 User-Friendly Interface: Simply click the chat icon at the bottom right of your screen to start interacting. Type your queries, and GAILBOT will respond instantly.
- 🔧 Customizable and Flexible: Tailor GAILBOT to meet your organization’s specific needs, whether handling custom queries or integrating with existing systems.

🤔 Why Choose GAILBOT?
GAILBOT isn’t just a chatbot—it’s a comprehensive solution for improved communication, efficiency, and growth. Here’s why it stands out:

- ⏱️ Efficiency: Automates repetitive tasks, freeing your HR and IT teams to focus on more strategic work.
- 🌐 Accessibility: Provides instant, reliable answers, boosting productivity and communication.
- 🛡️ Security: With 2FA and language filtering, GAILBOT keeps interactions secure and professional.
- 📈 Scalability: GAILBOT grows with your organization, managing more users and queries without losing performance.

📝 Getting Started with GAILBOT
- Click the chat icon at the bottom right of your screen.
- Type your query and hit Enter.
- Follow the chatbot’s guidance.
- Continue interacting for further help or information.

📌 Tips for Best Use
- Be clear and detailed in your queries for better responses.
- Use relevant keywords to enhance GAILBOT's understanding.
- Follow the chatbot’s instructions for optimal results.
- Need more help? Contact our support team anytime!

We’re excited for you to explore the potential of GAILBOT and see how it can revolutionize your organization’s communication. Reach out if you need more info!`

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