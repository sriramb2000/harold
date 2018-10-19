const gag = require('node-9gag');
const axios = require('axios');
const cheerio = require('cheerio');
const giphy = require('giphy-api')('im2wgTOGVcDoNZvRHK2Uy0ZxM06iZ34x');



axios.get('http://api.adviceslip.com/advice').then(function(res){
  return res.data.slip.advice;
});

// gag.find('thanos', function(err, res){
//   console.log(res.result.length);
// })
