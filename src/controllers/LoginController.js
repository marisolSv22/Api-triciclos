import bcrypt from 'bcrypt';

export function index(req, res) {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM usuario', (err, usuario) => {
      if(err) {
        res.json(err);
      }
      res.render('login/list', { usuario });
    });
  });
}

export function login(req, res) {
  if(req.session.loggeding != true) {

    res.render('login/index');

  } else {
    res.redirect('/');
  }
}

export function auth(req, res)  {
  const data = req.body;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM usuario WHERE correo = ?', [data.correo], (err, userdata) => {
      
      if(userdata?.length > 0) {

        userdata.forEach(element => {
          bcrypt.compare(data.clave, element.clave, (err, isMatch) => {

            if(!isMatch) {
              res.send('login/index', { error: 'Error: incorrect password !' });
            } else {

              req.session.loggeding = true;
              req.session.correo = element.correo
              
              res.redirect('/');
            }
          });
        });

      } else {
        res.render('login/index', { error: 'Error: user not exists !' });     
      }

    });
  });
}

export function register(req, res) {
  if(req.session.loggeding != true) {

    res.render('login/register');

  } else {
    res.redirect('/');
  }
}

export function storeUser(req, res) {
  const data = req.body;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM usuario WHERE correo = ?', [data.correo], (err, userdata) => {
      if(userdata?.length > 0) {
        res.render('login/register', { error: 'Error: user already exists !' });
      } else {

        bcrypt.hash(data.clave, 12).then(hash => {
          data.clave = hash;
      
          req.getConnection((err, conn) => {
            conn.query('INSERT INTO usuario SET ?', [data], (err, rows) => {
              
              req.session.loggeding = true;
              req.session.correo = data.correo;

              res.redirect('/rol');
            });
          });
        });
      }
    });
  });
}

export function logout(req, res) {
  if (req.session.loggeding == true) {

    req.session.destroy();
    
  }
  res.redirect('/login');
}

export function destroy(req, res) {
  const id = req.body.id;

  req.getConnection((err, conn) => {
    conn.query('DELETE FROM usuario WHERE id = ?', [id], (err, rows) => {
      res.redirect('/rol');
    });
  });
}

export function edit(req, res) {
  const id = req.params.id;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM usuario WHERE id = ?', [id], (err, usuario) => {
      if(err) {
        res.json(err);
      }
      res.render('login/edit', { usuario });
    });
  });
}

export function update(req, res) {
  const id = req.params.id;
  const data = req.body;

  req.getConnection((err, conn) => {
    conn.query('UPDATE usuario SET ? WHERE id = ?', [data, id], (err, rows) => {
      res.redirect('/rol');
    });
  });
}
