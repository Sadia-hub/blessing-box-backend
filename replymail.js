const nodemailer = require("nodemailer")

const replyMail = (receiver,  message) =>{

    const sender = "blessingboks@gmail.com"
    let mailTransporter = nodemailer.createTransport({
        service:"gmail",
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, 
        auth:{
            user:sender,
            pass:process.env.PASSWORD
        }
    });


    let details = {
        from:sender,
        to:receiver,
        subject:"Blessing Box",
        // text:{message},
        html: `<p>${message}</p>`
    }

    return mailTransporter.sendMail(details, (err)=>{
        if(err){
            console.log(err)
        }
    })

}

module.exports = replyMail;