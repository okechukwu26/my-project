require('dotenv/config')
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
process.env

const sendEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'priceblings@gmail.com',
        subject: 'Thank you for joining',
        text: `wlecome to the app ${name}. we hope you enjoy using our app`
    })
}
const deleteAccountEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'priceblings@gmail.com',
        subject: 'delete account',
        text: `${name} you have successfully deleted your account`
    })
}

module.exports = {
    sendEmail,
    deleteAccountEmail
}

// sgMail.send({
//     to: 'emordiokechukwu26@gmail.com',
//     from: 'priceblings@gmail.com',
//     subject: 'this is my first email',
//     text: 'i hope this one actually get to you'
// })

// 
// const sendgridTransport = require('nodemailer-sendgrid-transport');
// const { TRANSPORT_KEY } = require('../config/config.js')

// //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


// const transport = nodemailer.createTransport(sendgridTransport({
//     auth: {
//         api_key: TRANSPORT_KEY
//     }
// }))

// const sendEmail = (option) => {
//     transport.sendMail({
//         from: option.from,
//         to: option.to,
//         subject: option.subject,
//         html: '<b> Awesome sauce</b>'
//     })
// }
// module.exports = sendEmail


