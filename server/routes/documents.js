const express = require('express');
const router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Document = require('../models/documents-model');

router.get('/', (req, res, next) => {
    // call the Document model find() method to get all documents in the collection
    // if an error occurred
    //    return response status 500 and a JSON object containing information about the error
    // endIf
    // return response status 200 and a JSON object containing the list of documents

    Document.find({}, (err, documents) => {
        if (err) {
            res.status(500).json({
                msg: "Error retrieving data from database"
            })
        }

        console.log("retrieved Documents");
        console.log(documents);
        res.json(documents);
        
    })
 });

 router.post('/', (req, res, next) => {
    const maxDocumentId = sequenceGenerator.nextId("documents");
  
    const document = new Document({
      id: maxDocumentId,
      name: req.body.name,
      description: req.body.description,
      url: req.body.url
    });
  
    document.save()
      .then(createdDocument => {
        console.log("Created ");
        console.log(createdDocument);


        res.status(201).json({
          message: 'Document added successfully',
          document: createdDocument
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
    Document.findOne({ id: req.query.id })
      .then(document => {
        document.name = req.body.name;
        document.description = req.body.description;
        document.url = req.body.url;
  
        Document.updateOne({ id: req.query.id }, document)
          .then(result => {
            res.status(204).json({
              message: 'Document updated successfully',
              result: result
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
          message: 'Document not found.',
          error: { document: 'Document not found'}
        });
      });
  });

  router.delete("/", (req, res, next) => {
    Document.findOne({ id: req.query.id })
      .then(document => {
        Document.deleteOne({ id: req.query.id })
          .then(result => {
            res.status(204).json({
              message: "Document deleted successfully"
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
          message: 'Document not found.',
          error: { document: 'Document not found'}
        });
      });
  });

module.exports = router; 