const Database = require('./lib/database');
const validator = require('./lib/validator.js');

console.log(validator.isString('hello world'));

const personOne = {
  firstName: 'Allison',
  lastName: 'Busse',
  married: false,
  kids: 0
};

const personTwo = {
  firstName: 'Abbey',
  lastName: 'Masters',
  married: true,
  kids: 0
};

Database.connect('./example');
const exampleModel = require('./models/example-model');
exampleModel.create(personOne)
  .then(result => {
    console.log(result);
    exampleModel.findById(result.id)
      .then(result => {
        console.log(result);
      });
  });

exampleModel.create(personTwo)
  .then(result => {
    console.log(result);
  });

exampleModel.find()
  .then(result => {
    console.log('all:', result);
  });
  




const DocumentCollection = require('./lib/document-collection');

const documents = new DocumentCollection('./documents');
const objExample = { name: 'Allison' };
documents.save(objExample)
  .then(objExample => {
    console.log(objExample);
    documents.get(objExample.id)
      .then(returnedObjects => {
        console.log(returnedObjects);
      })
      .then(() => {
        documents.getAll()
          .then(res => {
            console.log(res);
          });
      });
  }
  );


