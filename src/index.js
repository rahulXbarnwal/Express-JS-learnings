require('dotenv').config();
const express = require('express');
const port = 8000;
const app = express();
const path = require('path');
const hbs = require('hbs');
const requests = require('requests');


const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// to set the view engine 
app.set('view engine', 'hbs');

// if you have changed the name of views folder to templates then 
app.set('views', templatePath);

hbs.registerPartials(partialsPath);

// template engine route 
app.get("", (req, res) => {
    res.render('index', {
        dynamicName: "Rahul's",
    });
})

// app.get('/about', (req, res) => {
//     res.render('about')
// })

app.get("/about", (req, res) => {
    requests(`http://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&units=metric&appid=430e0722edebe6affb1d3e6020acac5d`)
        .on('data', (chunk) => {
            const objData = JSON.parse(chunk);
            const arrData = [objData];
            console.log(arrData);
            console.log(`City name is: ${arrData[0].name} and the temp is: ${arrData[0].main.temp}`);

            res.write(arrData[0].name);
        })
        .on('end', (err) => {
            if (err) return console.log('connection closed due to errors', err);

            res.end();
        });
})

app.get('/about/*', (req, res) => {
    res.render('404', {
        errorComment: "This About page is not found",
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorComment: "Page Not Found",
    });
})

app.listen(port, () => {
    console.log(`Listening to port no. ${port}`);
})


// const path = require('path')
// const express = require('express');
// const app = express();
// const port = 8000;

// app.get(route, callback)

// API
// get - read
// post - create
// put - update
// delete - delete

// console.log(__dirname);

// console.log(path.join(__dirname, "../public"));

// const staticPath = path.join(__dirname, "../public");

// builtin Middleware
// app.use(express.static(staticPath));

// app.get("/", (req, res) => {
//     res.send("Hello World");
// })

// app.get("/about", (req, res) => {
//     res.status(200).send("This is About page");
// })

// app.get("/contact", (req, res) => {
//     res.send("This is Contact page");
// })

// app.listen(8000, () => {
//     console.log("Listening to port no. 8000");
// })

// app.listen(port, () => {
//     console.log(`Listening to port no. ${port}`);
// })
