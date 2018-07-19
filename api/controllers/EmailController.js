module.exports = {
  index: (req, res) => {
    console.log("req.query",req.query);
    console.log("req.body",req.body);
    var emailConfig = {
        toEmails:  'mogoyal@deloitte.com',
        ccEmails:  'ankitsaxena7@deloitte.com',
        // bccEmails: 'pdusari@deloitte.com',
        subject: "Query from Devops Portal :"+req.body.name,
        message: req.body.message,
        fromEmail:req.body.email
    }

    EmailService.sendEmail(emailConfig, function(err, response) {
        if (err) {
            return res.status(500).jsonp(err);
        }
        res.status(200).jsonp({
            'message': 'email sent successfully'
        });
  });
  // res.status(200).json({
  //           'message': 'email sent successfully'
  //     });
}
}
