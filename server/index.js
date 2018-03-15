const express = require('express');
const bodyParser = require('body-parser');
var massive = require('massive');
var session = require('express-session');
var config = require('./config.js');

const puppeteer = require('puppeteer');

const app = module.exports = express();

app.use(bodyParser.json());
app.use(session({
  secret: config.secret,
    resave: true,
    saveUninitialized: false,
    cookie:{
      maxAge: (1000*60*60*24*14)
    }
}))

massive(config.connection)
.then( db => {
  app.set('db', db);
}).catch(err=>{});

app.use(express.static(__dirname + './../build'))

var userController = require("./userController.js");


/*********************** Instagram stuff *********************************/

let oneDay = 1000*60*60*24;

app.post('/startScript', (req, res) => {
  let {email, password, username} = req.body.info;
  let profiles = req.body.profiles; //array
  db.getPeopleFollowedByScript()
  .then( response => {
    peopleFollowedByScript = JSON.parse(response[0]);
    instagram(email, password, username, profiles, peopleFollowedByScript);
  })
})

app.post('/stopScript', (req, res) => {
  // push to DB
  // stop script
})


async function followUnfollow(page, profiles, peopleFollowedByScript){
  let continueWhileLoop = true;
  let runningDay = new Date().getTime();

  if (await paidForToday()){
    while (continueWhileLoop){
      let today = new Date().getTime();

      if (today <= runningDay + oneDay){
        
        
        // all things follow unfollow go here
        // update people followed by script variable with username & date
        
      }else{
        // if it's a new day, update the info in the database
        db.pushInfoToDb(JSON.stringify(peopleFollowedByScript))
        .then(result=>{}).catch(err=>{});

        // Check if user's subscription is going to end
        checkForSubscriptionEnd();

        // then check if the user has paid for the new date
        if (await paidForToday()){
          runningDay = new Date().getTime();
        }else{
          // if user has not paid for today, end the while loop, and therefore the function
          continueWhileLoop = false;
        }

      }
    }
  }else{
    // user hasn't paid
  }
}

async function paidForToday(){
  // check if the user has paid for today
  db.getDateUserHasPaidThrough()
  .then( futureDateUserHasPaidThrough => {
    let today = new Date().getTime();
    if (today <= futureDateUserHasPaidThrough){
      return true;
    }else{
      return false;
    }
  })
  .catch(err=>{});
}

function setFutureDateUserHasPaidThrough(){
  let today = new Date();
  let todayMS = today.getTime();
  let month = today.getMonth();
  let days = [null, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let msInThisMonth = days[month] * 24*60*60*1000;
  let futureDateUserHasPaidThrough = todayMS + msInThisMonth;
  db.setFutureDateUserHasPaidThrough([futureDateUserHasPaidThrough])
  .then( result => {
    // this means that we successfully set the future date in the database
  })
  .catch(err => {});
}

// puppeteer stuff
const logInOption = '#react-root > section > main > article > div._kbq82 > div:nth-child(2) > p > a';
const emailInput = '#react-root > section > main > article > div._kbq82 > div:nth-child(1) > div > form > div:nth-child(1) > div > div._ev9xl input';
const passwordInput = '#react-root > section > main > article > div._kbq82 > div:nth-child(1) > div > form > div:nth-child(2) > div > div._ev9xl input';
const logInBtn = '#react-root > section > main > article > div._kbq82 > div:nth-child(1) > div > form > span > button';
const profileLink = 'a[href="/'+config.username+'/"]';
const followingBtn = '#react-root > section > main > article > header > section > ul > li:nth-child(3) > a';
followingList = '._gs38e ul div';
async function instagram(email, password, username, profiles, peopleFollowedByScript) {
  let peopleFollowed = 0;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();  
  
  await page.goto('https://www.instagram.com/');
  
  await page.waitForSelector(logInOption);
  await page.click(logInOption);
  
  await page.waitForSelector(emailInput);
  await page.type(emailInput, email);
  await page.type(passwordInput, password);
  await page.click(logInBtn);
  
  await page.waitForSelector(profileLink);
  await page.click(profileLink);
  
  await page.waitForSelector(followingBtn);
  await page.click(followingBtn);
  
  await page.waitForSelector(followingList);
  
  await followUnfollow(page, profiles, peopleFollowedByScript);

  // the follow unfollow script runs until the subscription runs out or the user stops the script.
  // When that happens, close the puppeteer browser window
  browser.close();

}





app.listen(config.port, console.log("you are now connected on " + config.port));
