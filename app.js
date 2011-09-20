var express = require('express'), path = require('path');

var app = module.exports = express.createServer().configure(function() {
    this.set('views', path.join(__dirname, "views"));
    this.use(express.static(path.join(__dirname, "public")));
    
    this.set('view engine', 'ejs.html');
    this.register('ejs.html', require('ejs'));
});

var cellData =  {
    'B1' : "from server"
};

app.get('/grid', function (req, res) {
    res.render('grid', {cellData: cellData});
});

app.listen(8080);
