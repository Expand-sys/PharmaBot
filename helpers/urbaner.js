  var http = require("https");



async function define(term) {
  return new Promise((resolve, reject) => {
    const path = '/define?term='+term;
    const options = {
  	"method": "GET",
  	"hostname": "mashape-community-urban-dictionary.p.rapidapi.com",
  	"port": null,
  	"path": path,
  	"headers": {
  		"x-rapidapi-key": "1276b32e63msh739dcbdeaf39a12p175d69jsn31c93e5fcdbc",
  		"x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
  		"useQueryString": true
  	}
  };

  const req = http.request(options, (res) => {
    if (res.statusCode < 200 || res.statusCode >= 300) {
          return reject(new Error('statusCode=' + res.statusCode));
      }
      var body = [];
      res.on('data', function(chunk) {
          body.push(chunk);
      });
      res.on('end', function() {
          try {
              body = JSON.parse(Buffer.concat(body).toString());
          } catch(e) {
              reject(e);
          }
          resolve(body);
      });
  });
  req.on('error', (e) => {
    reject(e.message);
  });
  // send the request
  req.end();
});
}

module.exports = {
  define,
};
