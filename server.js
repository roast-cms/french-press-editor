const express = require('express');
const path = require('path');
const app = express();

// app.use(express.static(__dirname + '/dist/'));
// app.use('/src/assets', express.static(__dirname + '/src/assets/'));
//
//
// app.listen(process.env.PORT || 8080);




app.set('port', (process.env.PORT || 8080));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});
