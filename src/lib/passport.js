import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;

const pool = getConnection();
const helpers = require('./helpers');

passport.use('local.signin', new LocalStrategy({
  usernameField: 'correo',
  passwordField: 'clave',
  passReqToCallback: true
}, async (req, correo, clave, done) => {
  const rows = await pool.query('SELECT * FROM usuario WHERE correo = ?', [correo]);
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(clave, user.clave)
    if (validPassword) {
      done(null, user, req.flash('success', 'Welcome ' + user.correo));
    } else {
      done(null, false, req.flash('message', 'Incorrect Password'));
    }
  } else {
    return done(null, false, req.flash('message', 'The Usuario does not exists.'));
  }
}));

passport.use('local.signup', new LocalStrategy({
  usernameField: 'correo',
  passwordField: 'clave',
  passReqToCallback: true
}, async (req, correo, clave, done) => {

  const data = req.body;
  let newUser = {
    correo,
    clave
  };
  newUser.clave = await helpers.encryptPassword(clave);
  // Saving in the Database
  const result = await pool.query('INSERT INTO usuario SET ? ', newUser);
  newUser.id = result.insertId;
  return done(null, newUser);
}));

passport.serializeUser((correo, done) => {
  done(null, correo.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM usuario WHERE id = ?', [id]);
  done(null, rows[0]);
});
