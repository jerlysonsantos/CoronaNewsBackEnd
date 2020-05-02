const express = require('express');
const router = express.Router();

const https = require('https');
const sjson = require('secure-json-parse')

const path = require('path');
const srcPath = path.resolve() + '/src';

const authMiddleware = require(`${srcPath}/app/middlewares/authMiddleware.js`);

const dbEstados = require(`${srcPath}/resources/dbEstados/dbEstados.json`)
const dbMunicipios = require(`${srcPath}/resources/dbEstados/dbMunicipios.json`)


router.use(authMiddleware);
router.get('/getPerState/:state', (req, res) =>  {
  try {

    let { state } = req.params;

    dbEstados.estados.forEach(async (item) => {
      if (state.replace('State of ', '') === item.estado )
        state = item.id;
    });
    let output = '';
    https.get({
      host: 'brasil.io',
      path: `/api/dataset/covid19/caso/data/?format=json&state=${state}&is_last=true`,
      json: true,
      headers: { 'Content-Type': 'application/json' }
    },(response) => {
      response.setEncoding('utf8');

      response.on('data', (data) => {
        output += data;
      });
      response.on('end', () => {
        const { results } = sjson.parse(output, { protoAction: 'remove', constructorAction: 'remove' })

        if (!results)
          return res.status(400).send({ error: 'Não há resultados' });

        const cleanData = [];
        results.forEach((element, index, array) => {
          Object.keys({ ...element, position: ''}).forEach(function(key){
            if (key == 'city_ibge_code' ||
                key == 'confirmed_per_100k_inhabitants' ||
                key == 'death_rate' ||
                key == 'estimated_population_2019' ||
                key == 'is_last' ||
                key == 'order_for_place' ||
                key == 'place_type')
              delete element[key];
            if (key == 'city')
              dbMunicipios.cidades.forEach(async (item) => {
                if (element[key] == item.nome)
                  element['position'] = { latitude : item.latitude, longitude : item.longitude };
              });
            if (key == 'state')
              dbEstados.estados.forEach(async (item) => {
                if (element[key] == item.id) {
                  element[key] = item.estado;
                }
              });

          });
          if (!element.city == '')
            cleanData.push(element)
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
      path: '/api/dataset/covid19/caso/data/?format=json&place_type=state&is_last=true',
      json: true,
      headers: { 'Content-Type': 'application/json' }
    },(response) => {
      response.setEncoding('utf8');

      response.on('data', (data) => {
        output += data;
      });
      response.on('end', () => {
        const { results } = sjson.parse(output, { protoAction: 'remove', constructorAction: 'remove' })

        if (!results)
          return res.status(400).send({ error: 'Não há resultados' });

        const cleanData = [];
        results.forEach((element, index, array) => {
          Object.keys({ ...element, position: ''}).forEach(function(key){
            if (key == 'city_ibge_code' ||
                key == 'confirmed_per_100k_inhabitants' ||
                key == 'death_rate' ||
                key == 'estimated_population_2019' ||
                key == 'is_last' ||
                key == 'order_for_place' ||
                key == 'place_type' ||
                key == 'city' )
              delete element[key];

            if (key == 'state')
              dbEstados.estados.forEach(async (item) => {
                if (element[key] == item.id) {
                  element[key] = item.estado;
                  element['position'] = item.position
                }
              });

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
      path: `/api/dataset/covid19/caso/data/?format=json&state=${state}&city=${ci}&date=${da}`,
      json: true,
      headers: { 'Content-Type': 'application/json' }
    },(response) => {
      response.setEncoding('utf8');

      response.on('data', (data) => {
        output += data;
      });
      response.on('end', () => {
        const { results } = sjson.parse(output, { protoAction: 'remove', constructorAction: 'remove' })

        if (!results)
          return res.status(400).send({ error: 'Não há resultados' });

        const cleanData = [];
        results.forEach((element, index, array) => {
          Object.keys(element).forEach(function(key){
            if (key == 'city_ibge_code' ||
                key == 'confirmed_per_100k_inhabitants' ||
                key == 'death_rate' ||
                key == 'estimated_population_2019' ||
                key == 'is_last' ||
                key == 'order_for_place' ||
                key == 'place_type')
              delete element[key];
            if (key == 'state') {
              dbEstados.estados.forEach((item) => {
                if (element[key] == item.id)
                  element[key] = item.estado;
              });
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

router.get('/getBoletins/:state/:date/:page', (req, res) => {
  try {
    const { state, date, page } = req.params;

    const st = state == '*' ? '' : state;
    const dt = date == '*' ? '' : date;

    let output = '';
    https.get({
      host: 'brasil.io',
      path: `/api/dataset/covid19/boletim/data/?format=json&state=${st}&date=${dt}&page=${page}`,
      json: true,
      headers: { 'Content-Type': 'application/json' }
    },(response) => {
      response.setEncoding('utf8');

      response.on('data', (data) => {
        output += data;
      });
      response.on('end', () => {
        const { results } = sjson.parse(output, { protoAction: 'remove', constructorAction: 'remove' })

        if (!results)
          return res.status(400).send({ error: 'Não há resultados' });

        results.forEach((element, index, array) => {
          Object.keys(element).forEach(function(key){
            if (key == 'state')
              dbEstados.estados.forEach(async (item) => {
                if (element[key] == item.id) {
                  element[key] = item.estado;
                }
              });
            if (key == 'date') {
              const array = element['date'].split('-');
              console.log(array)
              element[key] = `${array[2]}/${array[1]}/${array[0]}`;
            }

          });
        });
        return res.send({ results })
      });
    });
  } catch (error) {
    return res.status(400).send({ error: 'Erro em adquirir os boletins' })
  }
});

module.exports = app => app.use('/coronaApi', router);

/**
 * Usamos os dados vindos da API https://brasil.io/, que segundo o proprio manisfesto podemos usar dessas informações livremente
 * Viva a Liberdade
 */
