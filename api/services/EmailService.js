/**
 * sendgrid
 *
 * @description :: Service side logic to send mails using SendGrid.
 */
/**
 * areEmailsUnique - method to check if emails(to,cc and bcc) are unique
 * @param  {[String]} toEmails  - Array of emails to be sent
 * @param  {[String]} ccEmails  - Array of emails to be cc'ed
 * @param  {[String]} bccEmails - Array of emails to be bcc'ed
 * @param  {Function} callBack  - Method to call after checking for uniqueness of emails
 */
var areEmailsUnique = function(toEmails, ccEmails, bccEmails, callBack) {
    /**
     * response - Oject that has to be sent as repsonse
     *            {
     *              status : Boolean  - Says if all the emails are unique or not-active. Unique if true else false
     *              emails : String   - Repeated emails are ', ' seperated and held here.
     *            }
     * @type {Object}
     */
    var response = {
        status: true
    };


    /**
     * _.intersection gives a new array with common elements in both arrays
     * WORKS ONLY FOR 2 ARRAYS
     *
     * In all the following conditions we send back response as soon as we find there are common email ids
     */
    if (_.intersection(toEmails, ccEmails).length) {
        response.status = false;
        response.emails = _.intersection(toEmails, ccEmails).join(', ');
    }
    if (_.intersection(ccEmails, bccEmails).length) {
        response.status = false;
        response.emails = _.intersection(ccEmails, bccEmails).join(', ');
    }
    if (_.intersection(bccEmails, toEmails).length) {
        response.status = false;
        response.emails = _.intersection(bccEmails, toEmails).join(', ');
    }
    callBack(response);
};

/**
 * createEmailsObjects - Creates objects that are used in configuring sendGrid.
 * @param  {[String]} emailList - List of email adress to be configured.
 * @return {[Object]}           - Returns Array of Objects where each Object has a emailID.
 */
var createEmailsObjects = function(emailList) {
    /**
     * refinedEmailList - Email configuation Object for email list sent in as parameter.
     * @type {Array}
     */
    var refinedEmailList = [];

    emailList.forEach(function(emailID) {
        refinedEmailList.push({
            'email': emailID
        });
    });

    return refinedEmailList;
};

module.exports = {
    /**
     * sendEmail - Method that validates and sends emails to configured emails.
     * @param  {Object}   params   - Configuration Object to send emails. Described below.
     *                               {
     *                                  toEmails  : String   =>  ',' seperated emailIDs to which emails have to be sent
     *                                  ccEmails  : String   =>  ',' seperated emailIDs to which emails have to be cc'ed
     *                                  bccEmails : String   =>  ',' seperated emailIDs to which emails have to be bcc'ed
     *                                  subject   : String   =>  Subject to be set on te email
     *                                  message   : String   =>  Message to be send in the body of email
     *                               }
     * @param  {Function} callBack  - Callback to be called after sendGrid is called.
     */
    sendEmail: function(params, callBack) {

        var SendGridAPIKey = process.env.SENDGRID_APIKEY,
            sendgrid = require('sendgrid')(SendGridAPIKey),
            toEmails = params.toEmails ? params.toEmails.split(',') : [],
            ccEmails = params.ccEmails ? params.ccEmails.split(',') : [],
            bccEmails = params.bccEmails ? params.bccEmails.split(',') : [],
            fromEmail = params.fromEmail ? params.fromEmail : 'test@test.com';

        /**
         * Send grid does not allow duplicate email ID personalizations object.
         * Hence we have to check if all the emails are Unique
         */
        areEmailsUnique(toEmails, ccEmails, bccEmails, function(emailValidator) {
            if (emailValidator.status) {
                // We enter this condition only if all the emails IDs provided are unique
                toList = createEmailsObjects(toEmails);
                ccList = createEmailsObjects(ccEmails);
                bccList = createEmailsObjects(bccEmails);

                // Check if toList is has atleast on email
                if (!toList.length) {
                    sails.log.error('You have to send this mail to atleast one recepient.');
                    // For error code used refer - http://www.restapitutorial.com/httpstatuscodes.html
                    return callBack({
                        'message': 'You have to send this mail to atleast one recepient.'
                    }, null);
                }

                // ccList or bccList or toList should go into personalization object only if there is a email address in it.
                // send grid is not accepting empty array in its place. Hence creating personalization object out side configuration.

                var personalizationObject = {
                    'to': toList,
                    'subject': params.subject
                };

                if (ccList.length) {
                    personalizationObject.cc = ccList;
                }

                if (bccList.length) {
                    personalizationObject.bcc = bccList;
                }


                var request = sendgrid.emptyRequest({
                    method: 'POST',
                    path: '/v3/mail/send',
                    body: {
                        personalizations: [personalizationObject],
                        from: {
                            'email': fromEmail,
                        },
                        content: [{
                            type: 'text/html',
                            value: params.message,
                        }, ],
                    },
                });
                sendgrid.API(request, function(error, response) {
                    if (error) {
                        sails.log.error(error);
                        return callBack(error, null);
                    } else {
                        callBack(null, response);
                    }
                })

            } else {
                sails.log.error('These email addresses(' + emailValidator.emails + ') are repeated. Please make sure that all the email addresses are unique.');
                // For error code used refer - http://www.restapitutorial.com/httpstatuscodes.html
                return callBack({
                    'message': 'These email addresses(' + emailValidator.emails + ') are repeated. Please make sure that all the email addresses are unique.'
                }, null);
            }
        });

    }
};
