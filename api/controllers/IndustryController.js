module.exports = {
    view: (req, res) => {

        if (!req.params && !req.params.industryID) {
            sails.log.error("No industry ID to fetch data");
            return res.render("400", {"message" : "Please select a proper industry, or contact admin"})
        }

        res.render("industry");
    }
}