const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressStatusMonitor = require('express-status-monitor');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const config = {
    healthChecks: [{
        protocol: 'http',
        host: 'localhost',
        path: '/',
        port: '3000'
    }, {
        protocol: 'http',
        host: 'localhost',
        path: '/users',
        port: '3000'
    }]
}
 app.use(expressStatusMonitor(config));

const users = [
  {id: 0, username: "wedeycode", url: "wedeycode.com"},
  {id: 1, username: "adewale", url: "https://wedeycode.com"},
  {id: 2, username: "farouq", url: "http://wedeycode.com"},
  {id: 3, username: "amina", url: "www.wedeycode.com"}
];

/* GET users listing. */
app.get('/users', function(req, res) {
  res.status(200).json(users);
});

app.listen(3000, () => {
    console.log('listening on port 3000')
})

/// http://localhost:3000/status
// health check url