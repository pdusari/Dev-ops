/**
 * @description :: Server-side logic for retrieving data for home page
 */

var request = require('request');


function parseDate(dateString) {
    var d = new Date(dateString);
    return (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
}

/**
 * contentfulRequestHandler - helper function to handle the response from the contentful space
 *
 * @param {Object} error
 * @param {Object} response
 * @param {Object} body
 */
function contentfulRequestHandler(error, response, body) {
    try {
        var result = JSON.parse(body);
        this.callBack(null, result);
    } catch (error) {
        this.callBack(error, null);
    }
}

module.exports = {
    /**
     * getHomePageData - method to get data from contentfull or json and send back the JSON that drives
     *                   the handlebar
     * @param  {function} callBack callback funtion
     * @return {JSON}              JSON with which handle bar should render
     */
    getHomePageData: function(callBack) {
        this.callBack = callBack;
        var ContentfulKey = process.env.CONTENTFUL_KEY,
            ContentfulSpace = process.env.CONTENTFUL_SPACE,
            cf_api = process.env.CF_PREVIEW_API;
            console.log('https://' + cf_api + '/spaces/' + ContentfulSpace + '/entries?access_token=' + ContentfulKey + '&content_type=devops');

        request('https://' + cf_api + '/spaces/' + ContentfulSpace + '/entries?access_token=' + ContentfulKey + '&content_type=devops', contentfulRequestHandler.bind(this));
    },
    getSearchData: function(Value,callBack) {
        this.callBack = callBack;
        var ContentfulKey = process.env.CONTENTFUL_KEY,
            ContentfulSpace = process.env.CONTENTFUL_SPACE,
            cf_api = process.env.CF_PREVIEW_API;
            console.log('https://' + cf_api + '/spaces/' + ContentfulSpace + '/entries?access_token=' + ContentfulKey + '&content_type=projects&fields.title[match]=pep');
        request('https://' + cf_api + '/spaces/' + ContentfulSpace + '/entries?access_token=' + ContentfulKey + '&content_type=projects&fields.title[match]='+Value, contentfulRequestHandler.bind(this));
    },
    getAllData: function(callBack) {
        this.callBack = callBack;
        var ContentfulKey = process.env.CONTENTFUL_KEY,
            ContentfulSpace = process.env.CONTENTFUL_SPACE,
            cf_api = process.env.CF_PREVIEW_API;
            console.log('https://' + cf_api + '/spaces/' + ContentfulSpace + '/entries?access_token=' + ContentfulKey + '&content_type=devops');

        request('https://' + cf_api + '/spaces/' + ContentfulSpace + '/entries?access_token=' + ContentfulKey, contentfulRequestHandler.bind(this));
    },
    getPillarsData: function(callBack) {
        this.callBack = callBack;
        var ContentfulKey = process.env.CONTENTFUL_KEY,
            ContentfulSpace = process.env.CONTENTFUL_SPACE,
            cf_api = process.env.CF_PREVIEW_API;
        //    console.log('https://' + cf_api + '/spaces/' + ContentfulSpace + '/entries?access_token=' + ContentfulKey+'&content_type=industries');
        request('https://' + cf_api + '/spaces/' + ContentfulSpace + '/entries?access_token=' + ContentfulKey+'&content_type=pillars', contentfulRequestHandler.bind(this));
    },
    getToolsData: function(callBack) {
        this.callBack = callBack;
        var ContentfulKey = process.env.CONTENTFUL_KEY,
            ContentfulSpace = process.env.CONTENTFUL_SPACE,
            cf_api = process.env.CF_PREVIEW_API;
           console.log('https://' + cf_api + '/spaces/' + ContentfulSpace + '/entries?access_token=' + ContentfulKey+'&content_type=tools');
        request('https://' + cf_api + '/spaces/' + ContentfulSpace + '/entries?access_token=' + ContentfulKey+'&content_type=tools', contentfulRequestHandler.bind(this));
    },
    getReviewsData: function(callBack) {
        this.callBack = callBack;
        var ContentfulKey = process.env.CONTENTFUL_KEY,
            ContentfulSpace = process.env.CONTENTFUL_SPACE,
            cf_api = process.env.CF_PREVIEW_API;
        //    console.log('https://' + cf_api + '/spaces/' + ContentfulSpace + '/entries?access_token=' + ContentfulKey+'&content_type=industries');
        request('https://' + cf_api + '/spaces/' + ContentfulSpace + '/entries?access_token=' + ContentfulKey+'&content_type=review', contentfulRequestHandler.bind(this));
    },
    getdevOpsCycleStagesData: function(callBack) {
        this.callBack = callBack;
        var ContentfulKey = process.env.CONTENTFUL_KEY,
            ContentfulSpace = process.env.CONTENTFUL_SPACE,
            cf_api = process.env.CF_PREVIEW_API;
           // console.log('https://' + cf_api + '/spaces/' + ContentfulSpace + '/entries?access_token=' + ContentfulKey+'&content_type=industries');
        request('https://' + cf_api + '/spaces/' + ContentfulSpace + '/entries?access_token=' + ContentfulKey+'&content_type=devOpsCycleStages&order=fields.orderby', contentfulRequestHandler.bind(this));
    },
    getIndustriesData: function(callBack) {
        console.log("once");
        this.callBack = callBack;
        var ContentfulKey = process.env.CONTENTFUL_KEY,
            ContentfulSpace = process.env.CONTENTFUL_SPACE,
            cf_api = process.env.CF_PREVIEW_API;
          // console.log('https://' + cf_api + '/spaces/' + ContentfulSpace + '/entries?access_token=' + ContentfulKey+'&content_type=industries');
        request('https://' + cf_api + '/spaces/' + ContentfulSpace + '/entries?access_token=' + ContentfulKey+'&content_type=industries', contentfulRequestHandler.bind(this));
    },

    getProjectData: function(ProjectID, callBack) {
        this.callBack = callBack;
        var ContentfulKey = process.env.CONTENTFUL_KEY,
            ContentfulSpace = process.env.CONTENTFUL_SPACE,
            cf_api = process.env.CF_PREVIEW_API;
    //  console.log('https://preview.contentful.com/spaces/qwppyk7r0xj8/entries?access_token=463fb6aaded084865adc68a8e08d20f192d60f7d73bd9c43fdebd49801abb47d&content_type=projects&fields.industry.sys.id=6jWhczfSJqkK6AY6MOEsse');
        request('https://' + cf_api + '/spaces/' + ContentfulSpace + '/entries?access_token=' + ContentfulKey + '&content_type=projects&fields.industry.sys.id='+ProjectID, contentfulRequestHandler.bind(this));
    },
    getProject: function(spaceid,callBack) {
        this.callBack = callBack;
        var ContentfulKey = process.env.CONTENTFUL_KEY,
            ContentfulSpace = process.env.CONTENTFUL_SPACE,
            cf_api = process.env.CF_PREVIEW_API;
//spaces/{space_id}/content_types/{content_type_id}?access_token={access_token}
        console.info('https://' + cf_api + '/spaces/' + ContentfulSpace + '/entries/'+spaceid+'?access_token=' + ContentfulKey);
        request('https://' + cf_api + '/spaces/' + ContentfulSpace + '/entries/'+spaceid+'?access_token=' + ContentfulKey, contentfulRequestHandler.bind(this));
    },
    getEntry: function(spaceid,assetid,callBack) {
        this.callBack = callBack;
        var ContentfulKey = process.env.CONTENTFUL_KEY,
            ContentfulSpace = process.env.CONTENTFUL_SPACE,
            cf_api = process.env.CF_PREVIEW_API;
//spaces/{space_id}/content_types/{content_type_id}?access_token={access_token}
        console.info('https://' + cf_api + '/spaces/' + spaceid + '/assets/'+assetid+'?access_token=' + ContentfulKey);
        request('https://' + cf_api + '/spaces/' + spaceid + '/assets/'+assetid+'?access_token=' + ContentfulKey, contentfulRequestHandler.bind(this));
    },


    /**
     * getSubmissions - method to get data from salesforce or json and send back the JSON that drives
     *                   the handlebar
     * @param  {function} callBack callback funtion
     * @return {JSON}              JSON with which handle bar should render
     */
    getSubmissions: function(id, offset, callBack) {
        // TODO also handle no submissions
        var query = "SELECT Id, Indication__c, LLIR_Stage__c, LLIR_Submission_Status__c, LLIR_Compound__r.Name,LLIR_Date_of_Submission__c, LLIR_Medical_Liaison_Email__c, LLIR_Medical_Liaison__r.Name,LLIR_Summary_Description__c,LLIR_Thereapeutic_Area__c,LLIR_Unique_Submission_Identifier__c, LLIR_Title__c, LLIR_Concept_Title__c, CreatedDate, LLIR_Trial_Category__c, LLIR_Request_Type__c FROM LLIR_Submission__c WHERE ExoStar_ID__c = '" + id + "' AND RecordType.Name IN('Concept') Order By CreatedDate DESC LIMIT 5 OFFSET " + offset;
        ForceService.Query(query, function(err, result) {
            if (err) {
                return callBack(err, null);
            }

            if (result.records) {
                result.records.forEach(function(record) {
                    record.CreatedDate = parseDate(record.CreatedDate);
                });
            }
            callBack(null, result);
        });

    },

    getLatestSubmission: function(flag, id, callBack) {
        // Check if logged in
        if (!flag) {
            return callBack(null, null);
        }

        // TODO also handle no submissions
        var query = "SELECT LLIR_Concept_Title__c, CreatedDate FROM LLIR_Submission__c WHERE ExoStar_ID__c = '" + id + "' AND RecordType.Name IN('Concept') ORDER BY CreatedDate DESC NULLS FIRST";

        ForceService.Query(query, function(err, result) {
            if (err || result.totalLength < 1) {
                return callBack(err, null);
            }

            if (result.records && result.records.length > 0) {
                result.records[0].CreatedDate = parseDate(result.records[0].CreatedDate);
                callBack(null, result.records[0]);
            } else {
                callBack(null, {});
            }
        });

    },
    getSearchSubmissions: function(id, text, callBack) {

        // Masking reserved characters of SFDC
        text = text.replace(/([!&^*()+\[\]\\'/{}|":?~-])/g, "\\$1");

        //Append * to the text if not present in it already.
        text = (text.split('').pop() === '*') ? text : (text + '*');


        var query = "FIND {" + text + "} IN ALL FIELDS RETURNING LLIR_Submission__c( Id, LLIR_Stage__c, LLIR_Submission_Status__c, LLIR_Compound__r.Name,LLIR_Date_of_Submission__c, LLIR_Medical_Liaison_Email__c, LLIR_Medical_Liaison__r.Name,LLIR_Summary_Description__c,LLIR_Thereapeutic_Area__c,LLIR_Unique_Submission_Identifier__c, LLIR_Concept_Title__c, CreatedDate, LLIR_Trial_Category__c, LLIR_Request_Type__c WHERE ExoStar_ID__c = '" + id + "' AND RecordType.Name IN('Concept') Order By CreatedDate DESC)";

        ForceService.Search(query, function(err, result) {
            if (err) {
                sails.log.error("Issue while retrieving submissions");
                return callBack(err, null);
            }

            result = result ? result : {};
            result.searchRecords = result.searchRecords || [];

            result.searchRecords.forEach(function(record) {
                record.CreatedDate = parseDate(record.CreatedDate);
            });

            callBack(null, result); 
        });


    }

};
