var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//empieza la petición de post

router.post('/', async (req, res, next) => {

  var nombre = req.body.nombre;
  var direccion = req.body.direccion;
  var email = req.body.email;
  var telefono = req.body.telefono;

  var obj = {
    to: 'molinaspablo46@gmail.com',
    subject: 'Contacto desde la Web',
    html: nombre + ", " + "con dirección en:" + direccion + ", " + "se contactó a traves de la web y quiere mas información al siguiente correo:" + email + ". <br> De no poder hacerlo, dejó su número de teléfono personal:" + telefono
  }; 
  
  //cierra la variable obj

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth:
    {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }

  }); //cierra la variable de transporte de la informacion

  var info = await transporter.sendMail(obj);

//ahora volvemos a la pag y le avisamos al usuario q los datos fuerono enviados correctamente

  res.render('index', {
    message: 'Mensaje enviado corréctamente!',
  });

}); //cierro la peticion de post

module.exports = router;
