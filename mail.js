const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

let transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: process.env.NODEMAILER_SECURE, // true for 465, false for other ports
    auth: {
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASS,
    },
});

let mailSendingResults = [];
let recipients = ['recipient1@example.com', 'recipient2@example.com'];
let mailOptions = {
    from: "FROM <" + process.env.NODEMAILER_AUTH_USER + ">",
    subject: 'Hello',
    html: 'Hello, world!'
};

sendBulkEmails = async (recipients) => {
    console.log("Start sending..");
    console.log("...");
    console.log();

    const recipientsCount = recipients.length;

    for (let i = 0; i < recipientsCount; i++) {
        mailOptions.to = recipients[i];

        mailSendingResults = (new Promise( async (resolve, reject) => {
            await transporter.sendMail(mailOptions, (error, info) => {
                if(error){
                    reject("ERROR : [" + recipients[i] + "] " + error.message);
                }else{
                    resolve("SENDED : [" + recipients[i] + "] " + info.response);
                }
            });
        })); 

        mailSendingResults.then((message) => { 
            console.log(message);
            console.log();
        }).catch((message) => { 
            console.log(message);
            console.log();
        });        
             
    }
}

sendBulkEmails(recipients);
