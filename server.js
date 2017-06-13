// Creating a basic http object
var http = require('http');
var fs = require('fs');


// reading all the public files just once and serving them later
var index_html = fs.readFileSync("./public/index.html", 'utf8');
var style_css = fs.readFileSync("./public/style.css", 'utf8');
var index_js = fs.readFileSync("./public/index.js", 'utf8');
var error_html = fs.readFileSync("./public/404.html", 'utf8');

// Server Code
http.createServer(function (req, res) {

    console.log(req.url);
    var url = req.url;

    if(url == '/' || url == '/index.html'){
        // serving the basic index file
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(index_html);
    }else if(url == '/style.css'){
        // serving the style.css file here
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(style_css);
    }else if(url == '/index.js'){
        // serving the index.js file here
        res.writeHead(200, {'Content-Type': 'text/js'});
        res.write(index_js);
    }else if(url == '/favicon.ico'){
        // since we do not have a favicon.ico file we wont serve anything here
    }else{
        // for any other request we will serve the error file
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(error_html);
    }
    // for every request we send something and end the response finally 
    res.end();
}).listen(process.env.PORT || 3000);
