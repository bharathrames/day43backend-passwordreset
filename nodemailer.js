import nodemailer from 'nodemailer'


const mail = (randomOTP,Useremail) => {
    const transporter = nodemailer.createTransport({
        host: "my.smtp.host",
        port:"465",
        auth: {
            user:"bharath91505@gmail.com",
            pass:"jqcszxqobfjtcmyd"
        },
        tls:{
            rejectUnauthorized:true
        }
    
    })
    
    const messagesubject = "Reset Your Password"
    const mailtext = `Your OTP - ${randomOTP}`
    
    const info = {
    from:"bharath91505@gmail.com",
    to:Useremail,
    subject:messagesubject,
    text:mailtext
    }
    
    transporter.sendMail(info,(err)=>{
    if(err){
        console.log("mail error ",err)
    }else{
        console.log("email has sent")
    }
    })
}

export default mail;