import express from 'express';
const app = express();
const PORT = 3000;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


app.use(passport.initialize());
app.use('local', LocalStrategy({ passReqToCallback: true}, 
  (req,username,password,done) => {
    console.log(username,password);
    done(null, {username: username, password: password});
  })
  );

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.get('/login', (req, res) => {
  res.send('Login');
}
);

app.get('/logout', (req, res) => {
  res.send('Logout');
}
);

app.get('/register', (req, res) => {
  res.send('Register');
}
);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
