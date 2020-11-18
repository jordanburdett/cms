var express = require('express');
var router = express.Router();

router.get("/getContacts", (req, res) => {
    console.log("getting contacts");
    res.json({
        message: "Here is the contacts",
        contacts: {
            id: 0,
            name: "jordan",
            number: "some number"
        }
    });
});

router.put("/putContacts", (req, res) => {
    
    // check if we have contacts in the body
    if (!req.body.contacts) {
        console.log(req.body)


        res.json({
            message: "we could not find contacts in the body"
        });

        return;
    }

    // validate the data before inserting

    // call mongodb database to update the contacts

    console.log("attempting to post " + req.body.contacts.name);

    res.json({
        message: "successfully updated... not really."
    });
})

module.exports = router; 