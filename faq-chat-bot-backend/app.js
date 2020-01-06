
//Server configs
var port = 3005;

//Initialize
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));
var cors = require('cors');
app.use(cors());
var formidable = require('formidable');
var spawnSync = require('child_process').spawnSync;



//MongoDB connection layer initialize and User model
var User = require('./models/user');

//Redis-Cache

var generateToken = function() {
    return Math.random().toString(36).substr(2); 
};

app.post('/api/signup', function(req,res) {
    var key = generateToken();
    console.log("body:", JSON.stringify(req.body,null,4));
    
    var user = new User({
        username: req.body.username,
        password: req.body.password,
        accessKey: key
    });

    user.save(function(err){
        if (err) {
            console.error(err);
            res.statusCode = 400;
            return res.json("{error: 'User creating is failed'}");
        }
        res.statusCode = 201;
        res.json("{message: 'User created'}");
    });

});

app.post('/api/login', function(req,res) {
    User.find({ username: req.body.username }, function(err, user) {
        if (err) {
            console.error(err);
            res.statusCode = 400;
            return res.json("{error: 'Login operation is failed'}");
        }

        console.log("user:", user[0]);
        console.log("pass2:", req.body.password);
        if (user[0].password !== req.body.password) {
            res.statusCode = 400;
            return res.json("{error: 'Wrong password'}");
        }

        res.statusCode = 200;
        // res.json('{accessKey:"' + user[0].accessKey + '"}');
        res.json({accessKey: user[0].accessKey});

    });
});

app.post('/api/generate', function(req,res) {
    var form = new formidable.IncomingForm();
    var filePath;

    form.parse(req);
    form.on('fileBegin', function (name, file){
        filePath = './dataset/' + file.name;
        file.path = filePath;
    });
    res.statusCode = 200;
    res.json({});
    
    form.on('end', () => {
        var csvProcess = spawnSync('java', ['-cp', 'ayca_22.jar', 'Main', filePath]);
        var rmProcess = spawnSync('./ayca23.sh');
    });

});

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
});

app.listen(port, () => console.log("Server started at " , port));