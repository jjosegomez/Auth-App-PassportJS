const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcryptjs');


// Connect to MongoDB
const username = 'admin';
const password = 'admin';
const cluster = 'portfoliocluster';
const dbname = 'Users';

mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.8oseeyj.mongodb.net/?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected successfully to MongoDB Atlas");
});

// User model
const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model('User', UserSchema);

// Passport Local Strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'Incorrect username.' }); }

      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password.' })
        }
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Express application setup
const app = express();
app.use(session({ secret: 'your secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
// Registration
app.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
    if (err) throw err;
    const newUser = new User({
      username: req.body.username,
      password: hashedPass
    });

    newUser.save(err => {
      if (err) {
        res.status(500).send('Error registering new user');
      } else {
        res.redirect('/login');
      }
    });
  });
});

// Login
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
});

// Logout
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
