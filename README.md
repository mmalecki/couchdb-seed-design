# couchdb-seed-design
Seed CouchDB design documents with [`nano`](https://github.com/dscape/nano).

## Installation

```sh
npm install couchdb-seed-design
```

## Usage

```js
var nano = require('nano');
var seed = require('couchdb-seed-design');
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
    }
  }
}, function () {
  console.dir(arguments);
});
```

## API

### `couchdb-seed-design(db, design, cb)`

* `db` (`object`, required) - `nano` (or compatible) database object
* `design` (`object`, required) - design object
* `cb` (`function`, optional) - callback

Creates a set of CouchDB design documents basing on `design` object. Each key
in `design` object becomes a separate design document called (`'_design/' + key`).

If no changes between remote design documents and `design` object are detected,
no updates are sent to CouchDB.
