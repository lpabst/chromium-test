var app = require('./index.js');

module.exports = {
  logIn: function(req, res){
    // console.log('hit')
    const db = req.app.get('db');
    db.logIn([req.body.email, req.body.password])
    .then( response => {
        if(response.length){
          console.log(response);
          req.session.isLoggedIn = true;
          response[0].isLoggedIn=true;
          req.session.user = response[0];
        } else {
          req.session.isLoggedIn = false
          return res.status(200).send({
            isLoggedIn: false, 
            message: 'Invalid email or password.'
          })
        }
        return res.status(200).json( response[0] )
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })        
  },
    
  findById: function(accessToken,refreshToken,profile, done){
      db.find_by_id([profile.id],function(err,user){

          if(!user[0]){//if there isnt one, create!!
            console.log('CREATING USER');
            console.log('profile');
            db.create_google_user([profile.id,profile.name.familyName, profile.name.givenName, accessToken],function(err,user){
              console.log('USER CREATED',user);
              return done(err,user);//goes to serialize user
            })
          }else{//if we find a user, return it
            console.log('FOUND USER', user)
            return done(err,user);
          }

      })

  }
  
};
