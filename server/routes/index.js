'use restrict';

var express = require('express');
var router = express.Router();

/**
 * Get the body of urlPage and return the html
 * @param  {String} url [Full url of page]
 * @return {Object}
 */
router.get('/:url', function(req, res, next) {
  var url = req.params.url,
    response = {};

  _request(options, function(err, response, body) {
    if ( err ) {
      response = err;
    } else {
      response.status = 'success';
      responde.data = body;
    }
    
    res.json( response );
  });
});

module.exports = router;