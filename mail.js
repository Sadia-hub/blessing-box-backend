const nodemailer = require("nodemailer")

const sendMail = (receiver = "sadiashah059@gmail.com", id) =>{

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
        subject:"Blessing Box Account Confirmation",
        text:"PLease confirm your account",
        html: "PLease click <a href="+"http://localhost:8080/verify/"+ id +">here</a> your account"
    }

    return mailTransporter.sendMail(details, (err)=>{
        if(err){
            console.log(err)
        }
    })

}

module.exports = sendMail