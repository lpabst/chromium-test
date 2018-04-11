var app = require('./index.js');
var config = require('./config.js');

const puppeteer = require('puppeteer');

<<<<<<< HEAD
let users = {
  1: {
    followScriptBasicRunning: false,
  }
=======
let userIdsRunningTheScript = {
  // 0: {
  //   scriptRunning: true,
  //   profilesToTarget: ['https://www.instagram.com/psercia/', 'https://www.instagram.com/lpabst/'],
  //   peopleFollowedByScript: [
  //     {
  //       n:'psercia', //name
  //       d:'04/10/2018 22:23:18', //date the user was followed
  //       u:false //unfollowed
  //     }, 
  //     {}
  //   ],
  //   peopleToUnfollow: []
  // }
  // id: 0
>>>>>>> master
}

module.exports = {

  instagramFollowScriptBasic: async function(req, res){
<<<<<<< HEAD
    try{
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
      
      req.session.followScriptBasicRunning = true;
      
      console.log('hit', req.body, req.session)
      
      
      let {email, password} = req.body;
      let peopleFollowed = 0;
      
      
      
      const browser = await puppeteer.launch({headless: false});
      const page = await browser.newPage();
      const searchPage = await browser.newPage();
      
      
      await page.waitFor(5000);
      await page.removeAllListeners();
      await searchPage.removeAllListeners();
      
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
  
      let numberOfPeopleToFollow = 200;
      
      for(let i=1; i<numberOfPeopleToFollow; i++){
  
        const indexToFollow = `body > div:nth-child(14) > div > div._o0j5z > div > div._gs38e > ul > div > li:nth-child(${i}) > div > div._mtnzs > span > button`
  
        await page.waitFor(2000)
        if(i<=20){ 
          await page.evaluate(() => {document.getElementsByClassName('_gs38e')[0].scrollTop = document.getElementsByClassName('_gs38e')[0].scrollHeight });
        }
        await page.waitFor(2000)
        if(i<=20){ 
          await page.evaluate(() => {document.getElementsByClassName('_gs38e')[0].scrollTop = document.getElementsByClassName('_gs38e')[0].scrollHeight });
        }
        await page.waitFor(2000)
        if(i<=20){ 
          await page.evaluate(() => {document.getElementsByClassName('_gs38e')[0].scrollTop = document.getElementsByClassName('_gs38e')[0].scrollHeight });
        }
        await page.waitFor(2000)
        
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
    catch(err){
      console.log(err)
      // id should be running to false
=======

    if (!req.session || !req.session.user || !req.session.user.id){
      return console.log('not logged in');
    }
   
    let userId = req.session.user.id;

    // check to make sure script isn't already running for this user
    if (userIdsRunningTheScript[userId] && userIdsRunningTheScript[userId].scriptRunning){
      return console.log('script is already running for this user');
    }

    // if userId doesn't exist yet in the object up top, create it
    if (!userIdsRunningTheScript[userId]){
      //  we will eventually send this array across in the body
      let profilesToTarget = ['https://www.instagram.com/psercia/', 'https://www.instagram.com/lpabst/'];
      
      userIdsRunningTheScript.id = userId;
      userIdsRunningTheScript[userId] = {
        scriptRunning: true,
        profilesToTarget: profilesToTarget, 
        peopleFollowedByScript: [],
        peopleToUnfollow: []
      }

      console.log('creating user in global object:');
      console.log(userIdsRunningTheScript);
    }
    
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
    
    req.session.followScriptBasicRunning = true;
    
    // console.log('hit', req.body, req.session)
    
    
    let {email, password} = req.body;
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

    let numberOfPeopleToFollow = 5;
    
    for(let i=1; i<numberOfPeopleToFollow; i++){

      const indexToFollow = `body > div:nth-child(14) > div > div._o0j5z > div > div._gs38e > ul > div > li:nth-child(${i}) > div > div._mtnzs > span > button`

      // let list = page.evaluate( document.getElementsByClassName('_gs38e')[0] )
      // const list = await page.evaluateHandle(() => document.getElementsByClassName('_gs38e')[0]);
      await page.waitFor(100)
      if(i<=25){ 
        await page.evaluate(() => {document.getElementsByClassName('_gs38e')[0].scrollTop = document.getElementsByClassName('_gs38e')[0].scrollHeight });
      }
      await page.waitFor(600)
      
      await page.click(indexToFollow);

      // Gets the info for the user we just followed, and adds their info to the peopleFollowedByScript object up top

      let clickedUsername = await page.evaluate((i) => { 
        console.log(i); 
        return document.getElementsByClassName('_2g7d5')[i].innerText; 
      }, i);

      let clickedUserInfo = {
        n:clickedUsername, 
        d:new Date().getTime(), 
        u:false 
      }

      userIdsRunningTheScript[userId].peopleFollowedByScript.push(clickedUserInfo);
      console.log(userIdsRunningTheScript[userId].peopleFollowedByScript);

      // unfollow people that were followed over 4 days ago

      // people followed over 3 months ago should be spliced from the peopleFollowed array (65,000 people in 90 days running 24/7 =~ 66 megabytes of ram)


>>>>>>> master
    }
    
  }
}