const mailer = require('nodemailer')

const sendingmail = async  (to,subject,text) => {

    const transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user:'doshitirth99@gmail.com',
            pass: 'jrst tokd empt jmda'
        }
    })
    
    const mailOptions = {
        from : 'doshitirth99@gmail.com',
        to : to,
        subject : subject ,
        text : text
    }

    const mailers = await transporter.sendMail(mailOptions)
    console.log("mailers ... ", mailers)
    return mailers
}
module.exports={
    sendingmail
}