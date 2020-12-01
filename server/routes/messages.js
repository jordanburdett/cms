var express = require('express');
var router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/messages-model');
const Contact = require('../models/contacts-model');

let contacts = [];

// c is === contacts from the database
Contact.find().then( c => {
  contacts = c;
})

router.get('/', (req, res, next) => {
    
    Message.find()
    .then(messages => {
      

      messages.forEach(message => {
        const index = contacts.findIndex(contact => {
          return contact.id === message.id;
        });

       

        if (index < 0) {
          message.sender = "Unknown";
        }
        else {
          message.sender = contacts[index].name;
        }

        
      })
      
      
      res.json(messages);
    })
    .catch(err => {
      res.json({
        err: err,
        msg: "we failed... I don't know why..."
      })
    })
 });

 router.post('/', (req, res, next) => {
    const maxDocumentId = sequenceGenerator.nextId("messages");
  
    const message = new Message({
      id: maxDocumentId,
      subject: req.body.subject,
      msgText: req.body.msgText,
      sender: req.body.sender
    });
  
    message.save()
      .then(createdMessage => {
        console.log("Created ");
        console.log(createdMessage);


        res.status(201).json({
          message: 'message added successfully',
          message: createdMessage
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
    Message.findOne({ id: req.query.id })
      .then(message => {
        message.subject = req.body.subject;
        message.msgTxt = req.body.msgText;
        message.sender = req.body.sender;
  
        Message.updateOne({ id: req.query.id }, message)
          .then(result => {
            res.status(204).json({
              message: 'message updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'message not found.',
          error: { message: 'message not found'}
        });
      });
  });

  router.delete("/", (req, res, next) => {
    Message.findOne({ id: req.query.id })
      .then(document => {
        Message.deleteOne({ id: req.query.id })
          .then(result => {
            res.status(204).json({
              message: "message deleted successfully"
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
          message: 'Message not found.',
          error: { message: 'Message not found'}
        });
      });
  });

module.exports = router; 