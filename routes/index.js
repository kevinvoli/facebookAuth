var express = require('express');
const passport = require('passport');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index.ejs', { title: 'Express' });
});

router.get('/profile',isLoggedIn, (req,res)=>{
  console.log(req.user)
  res.render('pages/profile.ejs',{
    user:req.user
  })
})
router.get('/error',isLoggedIn,(req,res)=>{
  res.render('pages/error.ejs');
})

router.get('/auth/facebook', passport.authenticate('facebook',{
  scope:['email']
}));
router.get('/auth/facebook/callback',
passport.authenticate('facebook',{
  successRedirect: '/profile',
  failureRedirect:'/error'
}));

router.get('/logout',(req,res)=>{
  req.logout();
  res.redirect('/')
})
function isLoggedIn(req,res,next){
  console.log(req.isAuthenticated())
  if(req.isAuthenticated()){
    return next();
  }
  // res.redirect('/')
}
module.exports = router;
