var express = require('express');
var router = express.Router();
var http = require("http");


/* GET users listing. */
router.get('/', function(req, res, next) {
    
    var food = req.query.food;
    console.log(req);
    console.log(food);
    
    var key = '2FLKBk1CIBRkMB4ovR5tYwWNePU1JkIV3bJsxuPW';
    var url = 'http://api.nal.usda.gov/ndb/search/?format=json&q='+food+'&sort=r&max=25&offset=0&ds=Standard%20Reference&api_key='+key+'';
    
    http.get(url, function (response) {
        
        response.setEncoding('utf-8');
        let rawData = '';
        
        response.on('data', (chunk) => { rawData += chunk; });
        
        response.on('end', () => {
            try {
              let parsedData = JSON.parse(rawData);
              res.send(parsedData);
            } catch (e) {
              console.error(e.message);
            }
        });
    });
});

module.exports = router;
