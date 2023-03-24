import { Router } from 'express';
import path from'path';

const router = Router();

router.get('/', (req, res) => {
    if(req.session.loggedin == true) {
  
      let nombre = req.session.nombre;
      res.render('home', { nombre });
  
    } else {
      res.redirect('/login');
      }
  });

router.post('/upload', (req, res) => {
    console.log(req.file);
    res.send('uploaded');
});

export default router;
  