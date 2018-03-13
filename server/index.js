const express = require('express');
const bodyParser = require('body-parser');
var massive = require('massive');
var session = require('express-session');
var config = require('./config.js');

const puppeteer = require('puppeteer');

const nodeApp = module.exports = express();

nodeApp.use(bodyParser.json());
nodeApp.use(session({
  secret: config.secret,
    resave: true,
    saveUninitialized: false,
    cookie:{
      maxAge: (1000*60*60*24*14)
    }
}))

massive(config.connection)
.then( db => {
  nodeApp.set('db', db);
}).catch(err=>{});

nodeApp.use(express.static(__dirname + './../build'))

var userController = require("./userController.js");


// puppeteer
async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('https://www.instagram.com/');
  
  await page.waitFor(200);
  
  const input = await page.$('._ev9xl input');
  await input.click();
  await page.$eval('._ev9xl input', el => el.value = 'lorenpabst@gmail.com');
  
  await page.waitFor(200);
  await page.screenshot({ path: 'screenshots/instagram.png' });
  
  console.log('done');
  browser.close();

  // await page.click('#react-root > section > main > article > div._kbq82 > div:nth-child(2) > p > a');
}

run();


//////////Endpoints for the front end




nodeApp.listen(config.port, console.log("you are now connected on " + config.port));
