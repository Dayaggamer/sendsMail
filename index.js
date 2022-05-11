const express = require('express')
const nodemailer = require('nodemailer');
const cors = require('cors')
const app = express();


app.use(cors());

var whitelist = ["http://localhost:4200"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.set("port", process.env.PORT || 3000)
let transport = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 465,
    secure: true,
    auth: {
        user: "dejtechcontact@gmail.com",
        pass: "nohrozbeaqiaowct"
    },
    tls:{
        rejectUnauthorized:false
    }
})


app.post('/contact', cors(corsOptions), (req, res) => {
    try {
        console.log(req.body)
       

        let mailOptions = {
            from: `julionew19@gmail.com`,
            to: "dejtechcontact@gmail.com",
            subject: "Contacto desde sitio web DEJTech!",
            text: `Empresa: ${req.params.companyName}\nCorreo: ${req.params.email}\nTelefono: ${req.params.phone}\nDireccion: ${req.params.address}\nNit: ${req.params.nit}`
        }

        transport.sendMail(mailOptions, function(error, info){
            if(error){
                console.log('error', error)
                res.sendStatus(400)
            }else{
                res.sendStatus(200);
              
            }
        })

        

    } catch (error) {
        console.log('Error: ', error)
    }
})


app.listen(app.get("port"), ()=> {
    console.log(`Server on in port ${app.get("port")}`)
})


//nohrozbeaqiaowct