export function index(req, res) {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM infante', (err, infante) => {
      if(err) {
        res.json(err);
      }
      res.render('children/index', { infante });
    });
  });
}

export function create(req, res) {
  res.render('children/create');
}
  
export function storeChildren(req, res) {
  const data = req.body;
  
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM infante WHERE identificacion = ?', [data.identificacion], (err, userdata) => {
      if(userdata?.length > 0) {
        res.render('children/create', { error: 'Error: children already exists !' });
      } else {

        req.getConnection((err, conn) => {
          conn.query('INSERT INTO infante SET ?', [data], (err, rows) => {
                
            req.session.loggeding = true;
            req.session.usuario = data.usuario;
  
            res.redirect('/chil');
          });
        });
      }
    });
  });
}
  
export function destroy(req, res) {
  const id = req.body.id;
  
  req.getConnection((err, conn) => {
    conn.query('DELETE FROM infante WHERE id = ?', [id], (err, rows) => {
      res.redirect('/chil');
    });
  });
}
  
export function edit(req, res) {
  const id = req.params.id;
  
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM infante WHERE id = ?', [id], (err, infante) => {
      if(err) {
        res.json(err);
      }
      res.render('children/edit', { infante });
     });
  });
}
  
export function update(req, res) {
  const id = req.params.id;
  const data = req.body;
  
  req.getConnection((err, conn) => {
    conn.query('UPDATE infante SET ? WHERE id = ?', [data, id], (err, rows) => {
      res.redirect('/chil');
    });
  });
}

