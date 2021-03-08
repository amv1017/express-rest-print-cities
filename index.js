const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false});
const path = require('path');
const chalk = require('chalk');

const _dirname = path.resolve();

let cities = ['Ярославль']

app.use(express.static('public'));
app.get('/', function(req, res){
    res.sendFile(_dirname + "/" + "index.html");
})

app.post('/getcity', urlencodedParser, function(req, res){
    response = { city : req.body.city };
    console.log(response)
    cities.push(response.city)
    res.writeHead(200,{
        'Content-Type':'text/html; charset=utf-8'
    });
    res.end(JSON.stringify(response));
    console.log(cities)
})

app.get('/list',(req,res) => {
    res.writeHead(200,{
        'Content-Type':'text/html; charset=utf-8'
    });

   result = '<ul><li>'+cities.join('</li><li>')+'</ul>';
   return res.end(result)
})

const PORT = process.env.PORT || 3000;
const uri = 'http://localhost:'+PORT+'/index.html';

app.listen(PORT, () => { 
    console.log(`${chalk.bold(uri)}`);
});
