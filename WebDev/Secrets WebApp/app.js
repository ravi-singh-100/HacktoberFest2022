require('dotenv').config()
const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const app=express();
const mongoose=require("mongoose");

const session=require("express-session");
const passport=require("passport");
const passportLocalMongoose=require("passport-local-mongoose");
const GoogleStrategy=require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  }));

app.use(passport.initialize());
app.use(passport.session())  

mongoose.connect(`mongodb+srv://saipranith:${process.env.DB_PWD}@cluster0.htyqh.mongodb.net/test3?retryWrites=true&w=majority`,{ useNewUrlParser: true,useUnifiedTopology: true })

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);  
mongoose.set('useCreateIndex', true);
//mongoose.connect("mongodb://localhost:27017/secretsDB", {useNewUrlParser: true,useUnifiedTopology: true});
app.get("/",(req,res)=>{
    res.render("screen")
});

const secretsSchema = new mongoose.Schema({
  secrets:String
});


const userSchema=new mongoose.Schema({
    email:String,
    password:String,
    googleId:String
});

const secretsModel = new mongoose.model("secretsModel", secretsSchema);

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User=mongoose.model("User",userSchema);
passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"

  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id,username: profile.id}, function (err, user) {
      return cb(err, user);
    });
  }
));


app.get("/",(req,res)=>{
  res.render("screen")
})

app.get("/guidelines",(req,res)=>
{
  res.render("guidelines");
})

app.get("/contactus",(req,res)=>
{
  res.render("contactus")
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/register",(req,res)=>{
    res.render("register")
})

app.get("/confessions",(req,res)=>{
    if(req.isAuthenticated()){
        res.render("confessions");
    }
    else
    res.redirect("/login");
})

app.get("/logout",(req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
})


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

  app.get('/auth/google/secrets', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/confessions');
  });

app.post("/register",(req,res)=>{
    
   

    User.register({username:req.body.username},req.body.password,(err,user)=>{

        if(err){
            console.log(err);
            res.redirect("/register")
        }
        else
        passport.authenticate("local")(req,res,function(){
            res.redirect("/confessions");
        })

    })
   
    
})

app.post("/submit", (req,res)=>{
  res.render("success");
})

app.post("/login",(req,res)=>{

    
    const user = new User({
        username: req.body.username,
        password: req.body.password
      });
    
      req.login(user, function(err){
        if (err) {
          console.log(err);
        } else {
          passport.authenticate("local")(req, res, function(){
            res.redirect("/confessions");
          });
        }
      });

});

app.post("/confessions",(req,res)=>
{
    const secretins = new secretsModel({
        secrets: req.body.secret
    })
    
    secretins.save();

    res.render("success");
    
})

app.get("/faq", (req,res)=>
{
    res.render("faq");
})



app.listen(process.env.PORT||3000,function(){

    console.log("Server started in port 3000");
});