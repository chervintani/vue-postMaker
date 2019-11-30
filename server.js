const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const app = express()
const http = require('http').Server(app);
const port = process.env.PORT || 8080
//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')))

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
	res.sendFile(path.join(__dirname, '/dist/index.html'))
})

http.listen(port, '0.0.0.0', function () {
	console.log('listening on port ' + port);
});