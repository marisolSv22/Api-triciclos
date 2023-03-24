export function index(req, res) {
   req.getConnection((err, conn) => {
    conn.query('SELECT * FROM acudiente', (err, acudiente) => {
      if(err) {
        res.json(err);
      }
      res.render('attendant/index', { acudiente });
    });
  });
}
  
export function createAttendant(req, res) {
  res.render('attendant/attendant');
}

export function store(req, res) {
  const data = req.body;
  
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM acudiente WHERE identificacion = ?', [data.identificacion], (err, userdata) => {
      if(userdata?.length > 0) {
        res.render('attendant/attendant', { error: 'Error: attendant already exists !' });
      } else {
        
        req.getConnection((err, conn) => {
          conn.query('INSERT INTO acudiente SET ?', [data], (err, rows) => {
                
            req.session.loggeding = true;
            req.session.usuario = data.usuario;
  
            res.redirect('/list');
          });
        });
      };
    });
  });
} 
  
export function destroy(req, res) {
  const id = req.body.id;
  
  req.getConnection((err, conn) => {
    conn.query('DELETE FROM acudiente WHERE id = ?', [id], (err, rows) => {
      res.redirect('/list');
    });
  });
}
  
export function edit(req, res) {
  const id = req.params.id;
  
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM acudiente WHERE id = ?', [id], (err, acudiente) => {
      if(err) {
        res.json(err);
      }
      res.render('attendant/edit', { acudiente });
    });
  });
}
  
export function update(req, res) {
  const id = req.params.id;
  const data = req.body;
  
  req.getConnection((err, conn) => {
    conn.query('UPDATE acudiente SET ? WHERE id = ?', [data, id], (err, rows) => {
      res.redirect('/list');
    });
  });
}
