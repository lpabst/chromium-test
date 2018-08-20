var app = require('./index.js');
var config = require('./config.js');

const puppeteer = require('puppeteer');

let userIdsRunningTheScript = {
  1: {
    scriptRunning: false,
    profilesToTarget: ['https://www.instagram.com/psercia/', 'https://www.instagram.com/lpabst/'],
    peopleFollowedByScript: [
      {
        n:'psercia', //name
        d:'17633', //date the user was followed
        u:0 //unfollowed
      },
      {
        n:'1',
        d:'17632',
        u:0
      }, 
      {        
        n:'2',
        d:'17628',
        u:0
      },
      {        
        n:'3',
        d:'17620',
        u:0
      },
      {        
        n:'4',
        d:'17610',
        u:1
      },
      {        
        n:'5',
        d:'17530',
        u:0
      }, 
    ],
    peopleToUnfollow: []
  },
  id: 1,
  currentDay: Math.round(new Date().getTime() / 1000 / 60 / 60 /24)
  //need to add username
}

function followedByScriptBefore(username) {
  for(let i=0; i<userIdsRunningTheScript[userIdsRunningTheScript.id].peopleFollowedByScript.length; i++){
    if(username === userIdsRunningTheScript[userIdsRunningTheScript.id].peopleFollowedByScript[i].n){
      return true;
    }
    if(userIdsRunningTheScript[userIdsRunningTheScript.id].username && username === userIdsRunningTheScript[userIdsRunningTheScript.id].username){ //this line will also return true if the user is in the list of the target's followers. This is needed because you can't follow yourself, so there is no follow button, which will break the code.
      return true;
    }
  }
  return false;
}

module.exports = {

  instagramFollowScriptBasic: async function(req, res){

    try{
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
        
        userIdsRunningTheScript[userId] = {
          scriptRunning: true,
          profilesToTarget: profilesToTarget, 
          peopleFollowedByScript: [],
          peopleToUnfollow: [],
          id: userId,
          currentDay: Math.round(new Date().getTime() / 1000 / 60 / 60 /24)
          // need to add username
        }
        // console.log('creating user in global object:');
        // console.log(userIdsRunningTheScript);
      }
      
      userIdsRunningTheScript[userId].scriptRunning = true; //Script is allowed to start if this line gets run.

      const logInOption = '#react-root > section > main > article > div.rgFsT > div:nth-child(2) > p > a';
      // const emailInput = '#react-root > section > main > article > div.rgFsT > div:nth-child(1) > div > form > div:nth-child(1) > div > div.f0n8F input';
      const emailInput = '#react-root > section > main > div > article > div > div:nth-child(1) > div > form > div:nth-child(1) > div > div.f0n8F input';
      const passwordInput = '#react-root > section > main > div > article > div > div:nth-child(1) > div > form > div:nth-child(2) > div > div.f0n8F input';
      const logInBtn = '#react-root > section > main > div > article > div > div:nth-child(1) > div > form > span > button';
      const profileLink = 'a[href="/'+config.username+'/"]';
      const followingBtn = '#react-root > section > main > article > header > section > ul > li:nth-child(3) > a';
      const followingList = '.j6cq2 ul div';
      const followersButton = '#react-root > section > main > div > header > section > ul > li:nth-child(2) > a';
      const followersListReady = 'div.j6cq2 > ul > div > li:nth-child(1) > div > div.BW116';
      const followersList = '._p4iax > li:nth-child(0) >';
      
      let {email, password, headless} = req.body;
      
      const browser = await puppeteer.launch({headless: headless});
      const unfollowPage = await browser.newPage(); 
      const page = await browser.newPage(); 
      
      await page.waitFor(5000);
      await page.goto('https://www.instagram.com/accounts/login/');
      // await page.waitForSelector(logInOption);
      // await page.click(logInOption);
      await page.waitForSelector(emailInput);
      await page.type(emailInput, email);
      await page.type(passwordInput, password);
      await page.click(logInBtn);
      await page.waitFor(5000);
      await page.goto(userIdsRunningTheScript[userId].profilesToTarget[0]);
      await page.waitForSelector(followersButton);
      await page.click(followersButton);
      await page.waitForSelector(followersListReady);
      
      let numberOfPeopleToFollow = 10;
      let peopleFollowed = 0;
      
      for(let i=1; i<=numberOfPeopleToFollow; i++){
        console.log('j ' + userIdsRunningTheScript[userId].scriptRunning)
        if(userIdsRunningTheScript[userId].scriptRunning){

          await page.waitFor(5000)
          if(i<=25){ // This will scroll the page until 270 peeps are on the DOM.
            await page.evaluate(() => {document.getElementsByClassName('j6cq2')[0].scrollTop = document.getElementsByClassName('j6cq2')[0].scrollHeight });
          }
          await page.waitFor(600)
          
          ///////////////////////////// Should the follow button get pressed ? ///////////////////////
          let clickedUsername = await page.evaluate((i) => { 
            return document.getElementsByClassName('FPmhX')[i].innerHTML; 
          }, i);

          let buttonText = await page.evaluate((i) => {
            if(document.getElementsByClassName("oF4XW")[i]){
              return document.getElementsByClassName("oF4XW")[i].innerHTML;
            } else {
              return "Nah"
            }
          }, i);

          // console.log('buttonText:', i, buttonText)

          if (buttonText === "Follow" && !followedByScriptBefore(clickedUsername)) {
            console.log('bout to click ', i)
            // const followButton = `body > div:nth-child(14) > div > div._o0j5z > div > div.j6cq2 > ul > div > li:nth-child(${i}) > div > div.oF4XW > span > button`
            await page.evaluate((i) => {
              document.getElementsByClassName("oF4XW")[i].click();
            }, i)
            let clickedUserInfo = {
              n:clickedUsername,
              d:Math.round( new Date().getTime() / 1000 / 60 / 60 / 24 ),
              u:0
            }
            userIdsRunningTheScript[userId].peopleFollowedByScript.push(clickedUserInfo);
            console.log(userIdsRunningTheScript[userId].peopleFollowedByScript);
          }
    
          let rightNow = Math.round(new Date().getTime() / 1000 / 60 / 60 /24) // days since 1970
          userIdsRunningTheScript[userId].peopleToUnfollow = userIdsRunningTheScript[userId].peopleFollowedByScript.filter(i => !i.u && i.d <= rightNow - 4)
          // console.log(userIdsRunningTheScript[userId].peopleToUnfollow);
    
          if(userIdsRunningTheScript[userId].peopleToUnfollow.length){
            await unfollowPage.goto(`https://www.instagram.com/${userIdsRunningTheScript[userId].peopleToUnfollow[0].n}/`)
    
            //unfollow this person
          }
    
          // unfollow people that were followed over 4 days ago
    
          // people followed over 3 months ago should be spliced from the peopleFollowed array (65,000 people in 90 days running 24/7 =~ 66 megabytes of ram)
    
        } else {
          userIdsRunningTheScript[userId].scriptRunning = false;
          browser.close();
          res.status(200).send("scriptRunning changed to false")
          //can do something here if scriptRunning is false?
        }
      }
      userIdsRunningTheScript[userId].scriptRunning = false;
      browser.close();
      res.status(200).send("for loop ended")
      // console.log(userIdsRunningTheScript);
    }
    catch(error){
      // userIdsRunningTheScript[userId].scriptRunning = false;
      // browser.close();
      res.status(200).send("an error stopped the script")
      console.log(error)
    }
    
  }
}