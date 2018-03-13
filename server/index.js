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
const logInOption = '#react-root > section > main > article > div._kbq82 > div:nth-child(2) > p > a';
const emailInput = '#react-root > section > main > article > div._kbq82 > div:nth-child(1) > div > form > div:nth-child(1) > div > div._ev9xl input';
const passwordInput = '#react-root > section > main > article > div._kbq82 > div:nth-child(1) > div > form > div:nth-child(2) > div > div._ev9xl input';
const logInBtn = '#react-root > section > main > article > div._kbq82 > div:nth-child(1) > div > form > span > button';
const profileLink = 'a[href="/'+config.username+'/"]';
const followingBtn = '#react-root > section > main > article > header > section > ul > li:nth-child(3) > a';
followingList = '._gs38e ul div';

async function instagram() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();  
  
  await page.goto('https://www.instagram.com/');
  
  await page.waitForSelector(logInOption);
  await page.click(logInOption);

  await page.waitForSelector(emailInput);
  await page.type(emailInput, config.email);
  await page.type(passwordInput, config.password);
  await page.click(logInBtn);
  
  await page.waitForSelector(profileLink);
  await page.click(profileLink);

  await page.waitForSelector(followingBtn);
  await page.click(followingBtn);

  await page.waitForSelector(followingList);
  
  // take a screenshot to check progress
  let r = Math.floor(Math.random()*1000000);
  await page.screenshot({ path: `screenshots/instagram${r}.png` });

  console.log('done ' + r);
  browser.close();

}

instagram();




nodeApp.listen(config.port, console.log("you are now connected on " + config.port));
