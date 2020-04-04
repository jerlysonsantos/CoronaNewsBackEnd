const express = require('express');
const router = express.Router();

const https = require('https');
const sjson = require('secure-json-parse')

router.get('/getPerState/:state', (req, res) =>  {
  try {

    const { state } = req.params;

    let output = '';
    https.get({
      host: 'brasil.io',
      path: `/api/dataset/covid19/caso/data?format=json&state=${state}&is_last=true`,
      json: true,
      headers: { 'Content-Type': 'application/json' }
    },(response) => {
      response.setEncoding('utf8');

      response.on('data', (data) => {
        output += data;
      });
      response.on('end', () => {
        const { results } = sjson.parse(output, { protoAction: 'remove', constructorAction: 'remove' })

        const cleanData = [];
        results.forEach((element, index, array) => {
          Object.keys(element).forEach(function(key){
            if (key == 'city_ibge_code' ||
                key == 'confirmed_per_100k_inhabitants' ||
                key == 'death_rate' ||
                key == 'estimated_population_2019' ||
                key == 'is_last' ||
                key == 'order_for_place' ||
                key == 'place_type') {
              delete element[key];
            }
          });
          if (!element.city == '')
            cleanData.push(element);
        });
        return res.send({ cleanData })
      });
    });

  } catch (error) {
    return res.status(400).send({ error: 'Erro no acesso da API Brasil IO' });
  }
});

router.get('/getAllStates', (req, res) =>  {
  try {

    let output = '';
    https.get({
      host: 'brasil.io',
      path: '/api/dataset/covid19/caso/data?format=json&place_type=state&is_last=true',
      json: true,
      headers: { 'Content-Type': 'application/json' }
    },(response) => {
      response.setEncoding('utf8');

      response.on('data', (data) => {
        output += data;
      });
      response.on('end', () => {
        const { results } = sjson.parse(output, { protoAction: 'remove', constructorAction: 'remove' })

        const cleanData = [];
        results.forEach((element, index, array) => {
          Object.keys(element).forEach(function(key){
            if (key == 'city_ibge_code' ||
                key == 'confirmed_per_100k_inhabitants' ||
                key == 'death_rate' ||
                key == 'estimated_population_2019' ||
                key == 'is_last' ||
                key == 'order_for_place' ||
                key == 'place_type' ||
                key == 'city' ) {
              delete element[key];
            }
          });
          cleanData.push(element);
        });
        return res.send({ cleanData })
      });
    });

  } catch (error) {
    return res.status(400).send({ error: 'Erro no acesso da API Brasil IO' });
  }
});

router.get('/getTimeline/:state/:city/:date', (req, res) =>  {
  try {

    const { state, city, date } = req.params;

    const da = date == '*' ? '' : date;
    const ci = city == '*' ? '' : city;

    let output = '';
    https.get({
      host: 'brasil.io',
      path: `/api/dataset/covid19/caso/data?format=json&state=${state}&city=${ci}&date=${da}`,
      json: true,
      headers: { 'Content-Type': 'application/json' }
    },(response) => {
      response.setEncoding('utf8');

      response.on('data', (data) => {
        output += data;
      });
      response.on('end', () => {
        const { results } = sjson.parse(output, { protoAction: 'remove', constructorAction: 'remove' })

        const cleanData = [];
        results.forEach((element, index, array) => {
          Object.keys(element).forEach(function(key){
            if (key == 'city_ibge_code' ||
                key == 'confirmed_per_100k_inhabitants' ||
                key == 'death_rate' ||
                key == 'estimated_population_2019' ||
                key == 'is_last' ||
                key == 'order_for_place' ||
                key == 'place_type') {
              delete element[key];
            }
          });
          if (!element.city == '')
            cleanData.push(element);
        });
        return res.send({ cleanData })
      });
    });

  } catch (error) {
    return res.status(400).send({ error: 'Erro no acesso da API Brasil IO' });
  }
});

module.exports = app => app.use('/coronaApi', router);

/**
 * Usamos os dados vindos da API https://brasil.io/, que segundo o proprio manisfesto podemos usar dessas informações livremente
 * Viva a Liberdade
 */
