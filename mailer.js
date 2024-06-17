const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const passkey = 'zjfd uvqw ubxt leks';

const sendEmail = () => {
    return new Promise((resolve, reject) => {
        const htmpath = path.join(__dirname, 'views', 'emailtemplate.ejs');
        ejs.renderFile(htmpath, { name: 'jaichandartesting@gmail.com' }, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                try {
                    const mailOptions = {
                        from: 'testing@ipl.com',
                        to: 'jaichandarmuthamizh@gmail.com',
                        subject: 'testingemail',
                        html: data,
                    }

                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'jaichandarmuthamizh@gmail.com',
                            pass: passkey
                        }
                    });
                    transporter.sendMail(mailOptions, (err, info) => {
                        if (err) {
                            reject({ err })
                        }
                        resolve(info);
                    })
                } catch (error) {
                    reject(error);
                }
            }
        })
    })
}

module.exports = sendEmail;