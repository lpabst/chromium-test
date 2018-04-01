var app = require('./index.js');
var config = require('./config.js');

const puppeteer = require('puppeteer');

let users = {
  1: {
    followScriptBasicRunning: false,
  }
}

module.exports = {

  instagramFollowScriptBasic: async function(req, res){
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
    }
    
  }
}