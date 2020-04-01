const express = require('express');
const router = express.Router();

const https = require('https');

router.get('/get', (req, res) =>  {
  try {

    https.get({
      host: 'coronavirus-monitor.p.rapidapi.com',
      path: '/coronavirus/cases_by_country.php',
      headers: {
        'X-RapidAPI-Host': 'coronavirus-monitor.p.rapidapi.com',
        'X-RapidAPI-Key': 'f1ea5a2733msh7aafb1a74e65846p1ca2d8jsnecc9bda79acb',
        'Content-Type': 'application/json'
      }
    },(response) => {

      response.on('data', (d) => {
        const data = JSON.stringify(Buffer.from(d).toString());
        return res.send(JSON.parse(data));
      });
    });

  } catch (error) {
    return res.status(400).send({ error: 'Erro no acesso da API Corona Monitor' });
  }
});

module.exports = app => app.use('/coronaApi', router);
