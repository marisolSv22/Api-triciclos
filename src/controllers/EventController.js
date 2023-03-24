export function index(req, res) {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM evento', (err, evento) => {
      if(err) {
        res.json(err);
      }
      res.render('event/index', { evento });
    });
  });
}

export function create(req, res) {
  res.render('event/create');
}
  
export function storeEvent (req, res) {
  const data = req.body;
  
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM evento WHERE nombre = ?', [data.nombre], (err, userdata) => {
      if(userdata?.length > 0) {
        res.render('event/create', { error: 'Error: event already exists !' });
      } else {
          
        req.getConnection((err, conn) => {
          conn.query('INSERT INTO evento SET ?', [data], (err, rows) => {
                
            req.session.loggeding = true;
            req.session.usuario = data.usuario;
  
            res.redirect('/ev');
          });
        });
      }
    });
  });
}
  
export function destroy(req, res) {
  const id = req.body.id;
  
  req.getConnection((err, conn) => {
    conn.query('DELETE FROM evento WHERE id = ?', [id], (err, rows) => {
      res.redirect('/ev');
    });
  });
}
  
export function edit(req, res) {
  const id = req.params.id;
  
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM evento WHERE id = ?', [id], (err, evento) => {
      if(err) {
        res.json(err);
      }
      res.render('event/edit', { evento });
    });
  });
}
  
export function update(req, res) {
  const id = req.params.id;
  const data = req.body;
  
  req.getConnection((err, conn) => {
    conn.query('UPDATE evento SET ? WHERE id = ?', [data, id], (err, rows) => {
      res.redirect('/ev');
    });
  });
}
