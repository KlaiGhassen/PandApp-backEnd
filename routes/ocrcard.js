var express = require("express");
var router = express.Router();

var request = require('request');   // install request module by - 'npm install request'
var fs = require('fs')


const form_data = {
  file: fs.createReadStream('test.jpg'),
}

const options = {
    url : "https://app.nanonets.com/api/v2/OCR/Model/e9a95cc3-6ef9-4ac1-9754-e058086ccdbd/LabelFile/?async=false",
    formData: form_data,
    headers: {
        'Authorization' : 'Basic ' + Buffer.from('4vPcRHbXU1RZ4f6IWkKktZ5QTgnIa0pt' + ':').toString('base64')
    }
}
request.post(options, function(err, httpResponse, body) {
    console.log(body);
});













module.exports = router;