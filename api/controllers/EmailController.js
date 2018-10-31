module.exports = {
  index: (req, res) => {
    console.log(req.body)
    var emailConfig = {
        toEmails:  req.body.emailto,
        // bccEmails: 'pdusari@deloitte.com',
        subject: "Token for Dev-ops portal",
        message: req.body.message,
        fromEmail:'support@dev-ops.com'
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
