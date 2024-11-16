// import nodemailer from "nodemailer";

// export let userEmailVarification = (req,res,next) => {
//   let {email}= req.body;
//   const transporter = nodemailer.createTransport({
//     host: "Gmail",
//     port: 587,
//     secure: false, // true for port 465, false for other ports
//     auth: {
//       user: process.env.USER_EMAIL,
//       pass: process.env.USER_PASS,
//     },
//   });

//   // async..await is not allowed in global scope, must use a wrapper
//   async function main() {
//     // send mail with defined transport object
//     const info = await transporter.sendMail({
//       from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
//       to: email, // list of receivers
//       subject: "Hello ✔", // Subject line
//       text: "Hello world?", // plain text body
//       html: "<b> pass word changed successfully?</b>", // html body
//     });

//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
//   }

//   main().catch(console.error);

//   next();
// };
