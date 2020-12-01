var express = require('express');
var router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contacts-model');

router.get('/', (req, res, next) => {
    Contact.find()
      .populate('group')
      .then(contacts => {
        res.status(200).json(contacts);
      })
      .catch(error => {
        res.status(500).json({
          message: 'An error occurred',
          error: error
        });
      });
  });

 router.post('/', (req, res, next) => {
    const maxContactId = sequenceGenerator.nextId("contacts");

    
  
    const contact = new Contact({
      id: maxContactId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      imageUrl: req.body.imageUrl
    });

    console.log("1");
  
    contact.save()
      .then(createdContact => {
        console.log("Created ");
        console.log(createdContact);


        res.status(201).json({
          message: 'Contact added successfully',
          contact: createdContact
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
  });


router.put('/', (req, res, next) => {

    console.log(req.query.id);

    console.log("putting");
    Contact.findOne({ id: req.query.id })
      .then(contact => {
        contact.name = req.body.name;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.imageUrl = req.body.imageUrl
  
        Contact.updateOne({ id: req.query.id }, contact)
          .then(result => {
              console.log("in success")
            res.status(204).json({
              message: 'contact updated successfully',
              result: result
            })
          })
          .catch(error => {
            console.log("in Error")
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'contact not found.',
          error: { contact: 'contact not found'}
        });
      });
  });

  router.delete("/", (req, res, next) => {

    console.log("contact to delete");
    console.log(req.query.id);

    Contact.findOne({ id: req.query.id })
      .then(contact => {
        Contact.deleteOne({ id: req.query.id })
          .then(result => {
            res.status(204).json({
              message: "Contact deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Contact not found.',
          error: { contact: 'contact not found'}
        });
      });
  });

module.exports = router; 