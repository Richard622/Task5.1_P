const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service:'qq',
    auth: {
        user: '963023526@qq.com',
        pass: 'lfajuwlbvdbkbfba'
    }
  });
transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

    exports.send = function(mailOptions) {
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
  }
// function mailsender(){
//     var nodemailer = require('nodemailer');
//     var transporter = nodemailer.createTransport({
//     service: 'qq',
//     auth: {
//     user: '963023526@qq.com',
//     pass: 'lfajuwlbvdbkbfba' //

//     }
//     });
//     var mailOptions = {
//     from: '963023526@qq.com', // sender
//     to: '963023526@qq.com', // recevier
//     subject: 'nodemailer2.5.0邮件发送', //title

//     html: `<h1>Click to Change the Password:</h1><h3>
//     <a href="http://blog.csdn.net/zzwwjjdj1/article/details/51878392">
//     http://blog.csdn.net/zzwwjjdj1/article/details/51878392</a></h3>` 
//     };

//     transporter.sendMail(mailOptions, function (err, info) {
//         if (err) {
//         console.log(err);
//         return;
//         }
//         console.log('Sending successfully');
//     });}