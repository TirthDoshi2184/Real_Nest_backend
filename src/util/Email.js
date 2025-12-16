const mailer = require('nodemailer')

const sendingmail = async  (to,subject,text) => {

    const transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user:'realnest2109@gmail.com',
            pass: 'dqeh kbqf axwn bqxe'
        }
    })
    
    const mailOptions = {
        from : 'realnest2109@gmail.com',
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