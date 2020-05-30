const express = require('express')
const fetch = require('node-fetch')
const path = require('path')
const app = express()
const port = 3000
// ----- mustache-express config :
var mustacheExpress = require('mustache-express');
 
// Register '.mustache' extension with The Mustache Express
app.engine('html', mustacheExpress());
app.disable('view cache');
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static('public'));

//ROUTES
app.get('/products', async(req, res)=> {
    const response = await fetch(`https://nike-cci.myshopify.com/admin/api/2020-04/products.json`,{
        headers: {
            Accept: "application/json",
            Authorization: `Basic NDA4NmY1YzFhZWE4OWNkMTkwNzhmZjdhOWQxNzhjMTQ6c2hwcGFfMTlmNjA4ODY0MGNjOWFkZDkxNmUzMTc4MDJmZWUyNDE=`
        }
    });

      res.send(await response.json())
});

// app.get("/", function (req, res) {
//     res.sendFile(path.join(__dirname + "/views/index.html"));
// });

app.get('/', function(req, res) {
    res.render('index.html', {"title": "Nike CCI"});
});


app.listen(port, () => console.log(`App listening on port http://localhost:${port}/`))