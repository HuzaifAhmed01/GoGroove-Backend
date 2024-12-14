import nodemailer from 'nodemailer';

export let createUserWithEmailNotification = async (req, res, next) => {
  let { email, firstName, } = req.body; 

  try {

    let htmlPage = `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to GoGroove - Your Account is Ready</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            font-family: 'Arial', sans-serif;
            color: #333;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #000000;
            color: #ffffff;
            text-align: center;
            padding: 30px 20px;
            position: relative;
        }
        .header img {
            width: 100%;
            height: auto;
            border-radius: 10px 10px 0 0;
        }
        .header h1 {
            margin: 20px 0;
            font-size: 26px;
            font-weight: bold;
        }
        .content {
            padding: 30px 20px;
        }
        .content h2 {
            margin-bottom: 20px;
            font-size: 22px;
            color: #495057;
        }
        .content p {
            margin-bottom: 20px;
            font-size: 16px;
            color: #6c757d;
        }
        .cta-button {
            display: block;
            background-color: #ffc107;
            color: #fff;
            text-align: center;
            padding: 12px 20px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
            font-size: 16px;
            margin-top: 20px;
            transition: background-color 0.3s ease;
        }
        .cta-button:hover {
            background-color: #e0a800;
        }
        .footer {
            background-color: #343a40;
            color: #ffffff;
            text-align: center;
            padding: 15px 20px;
        }
        .footer a {
            color: #ffc107;
            text-decoration: none;
        }

    </style>
</head>
<body>

    <div class="email-container">
        <div class="header">
            <h1>Welcome to GoGroove, ${firstName}!</h1>
        </div>
        <div class="content">
            <h2>We're Excited to Have You On Board!</h2>
            <p>Your account has been successfully created. Now, you can explore a wide range of exciting products and enjoy exclusive offers tailored just for you.</p>
            <p>Let’s make your shopping experience seamless, fun, and rewarding.</p>
            <a href="#" class="cta-button">Shop Now</a>
        </div>
        <div class="footer">
            <p>Need help? <a href="#">Contact Us</a></p>
        </div>
    </div>

</body>
</html>



    `;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false, 
      auth: {
        user: process.env.USER_EMAIL, 
        pass: process.env.USER_PASS, 
      },
    });

    const info = await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: email, 
      subject: 'Welcome to GoGroove!', 
      text: 'Your account has been successfully created.', 
      html: htmlPage, 
    });

    console.log('Email sent: %s', info.messageId);

    next();

  } catch (error) {
    console.log('Error occurred while sending email:', error.message);
  }
};
