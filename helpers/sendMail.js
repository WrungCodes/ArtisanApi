import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { StatusResponse } from '../helpers';

dotenv.config();


/**
 * @description - send emails to inputed email address
 * @param {string} email 
 * @returns {JSON} - res
 */
const sendMails = async (email, subject, text, html = '') => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVICE,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        }
    });

    const mailOptions = {
        from: process.env.MAIL_FROM_ADDRESS,
        to: email,
        subject: subject,
        text: text,
        html: html
    }

    const emailSend = await transporter.sendMail(mailOptions, (err, res) => {
        if (err){
            console.log(err);
        }
        else{
            console.log(res);
        }
    });
}

export default sendMails;
