const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const {
  host,
  port,
} = require('../config/emailSend.json');

const user = process.env.mailUser;
const pass = process.env.mailPass;

const transport = nodemailer.createTransport({
  host,
  port,
  auth: {
    user,
    pass,
  },
});

transport.use('compile', hbs({
  viewEngine: {
    extName: '.ejs',
    partialsDir: './src/resources/mail/',
    layoutsDir: './src/resources/mail/',
    defaultLayout: 'mail.ejs',
  },
  viewPath: path.resolve('./src/resources/mail/'),
  extName: '.ejs',
}));

module.exports = transport;
