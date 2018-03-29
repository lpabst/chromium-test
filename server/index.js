

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

app.post('/api/logIn', userController.logIn);


/*********************** Instagram stuff *********************************/

let oneDay = 1000*60*60*24;

app.post('/api/launchIG', (req, res) => {
  req.session.followScriptRunning = true;
  console.log('hit', req.body, req.session)
  let {email, password} = req.body;
  // let profiles = req.body.profiles;
  // db.getPeopleFollowedByScript()
  // .then( response => {
  //   peopleFollowedByScript = JSON.parse(response[0]);
  //   instagram(email, password, username, profiles, peopleFollowedByScript);
  // })
  // instagramFollowScript(email, password, username, profiles, peopleFollowedByScript);
  instagramFollowScript(email, password);
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

async function instagramFollowScript(email, password, username, profiles, peopleFollowedByScript) {

  const logInOption = '#react-root > section > main > article > div._kbq82 > div:nth-child(2) > p > a';
  const emailInput = '#react-root > section > main > article > div._kbq82 > div:nth-child(1) > div > form > div:nth-child(1) > div > div._ev9xl input';
  const passwordInput = '#react-root > section > main > article > div._kbq82 > div:nth-child(1) > div > form > div:nth-child(2) > div > div._ev9xl input';
  const logInBtn = '#react-root > section > main > article > div._kbq82 > div:nth-child(1) > div > form > span > button';
  const profileLink = 'a[href="/'+config.username+'/"]';
  const followingBtn = '#react-root > section > main > article > header > section > ul > li:nth-child(3) > a';
  const followingList = '._gs38e ul div';
  
  const followersButton = '#react-root > section > main > article > header > section > ul > li:nth-child(2) > a';
  const followersListReady = 'body > div:nth-child(14) > div > div._o0j5z > div > div._gs38e > ul > div > li:nth-child(1) > div > div._mtnzs > span > button';
  const followersList = '._p4iax > li:nth-child(0) >';



  let peopleFollowed = 0;



  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();  


  await page.waitFor(5000);
  
  await page.goto('https://www.instagram.com/');
  
  await page.waitForSelector(logInOption);
  await page.click(logInOption);
  
  await page.waitForSelector(emailInput);
  await page.type(emailInput, email);
  await page.type(passwordInput, password);
  await page.click(logInBtn);
  
  // await page.waitForSelector(profileLink);
  await page.waitFor(10000);

  await page.goto('https://www.instagram.com/psercia/');
  await page.waitForSelector(followersButton);

  await page.click(followersButton);

  await page.waitForSelector(followersListReady)

  for(let i=1; i<10; i++){
    let indexToFollow = `body > div:nth-child(14) > div > div._o0j5z > div > div._gs38e > ul > div > li:nth-child(${i}) > div > div._mtnzs > span > button`

    await page.waitFor(6000)
  
    await page.click(indexToFollow);
  }


  await page.waitFor(5000);

  // await page.click(profileLink);
  
  // await page.waitForSelector(followingBtn);
  // await page.click(followingBtn);
  
  // await page.waitForSelector(followingList);

  let r = Math.floor(Math.random()*1000000);
  // await page.screenshot({ path: `screenshots/instagram${r}.png` });
  await page.screenshot({ path: `screenshots/instagram001.png` });
  
  // await followUnfollow(page, profiles, peopleFollowedByScript);

  // the follow unfollow script runs until the subscription runs out or the user stops the script.
  // When that happens, close the puppeteer browser window
  browser.close();

}

// instagram(config.email, config.password, config.username);
// instagram(config.email2, config.password2, config.username2);





app.listen(config.port, console.log("you are now connected on " + config.port));
