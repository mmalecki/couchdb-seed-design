var nano = require('nano');
var seed = require('../');
var db = nano('http://localhost:5984/design');

seed(db, {
  person: {
    views: {
      byFirstName: function (doc) {
        emit(doc.firstName);
      },
      byLastName: function (doc) {
        emit(doc.lastName);
      },
      byFullName: function (doc) {
        emit(doc.firstName + ' ' + doc.lastName);
      }
    },
    updates: {
      firstName: function (doc, req) {
        doc.firstName = req.body;
        return [doc, 'ok'];
      }
    }
  }
}, function () {
  console.dir(arguments);
});
