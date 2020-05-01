/**
 * Modelo do usuário
 */

const bcrypt = require('bcrypt');
const mongoose = require('../../database');
require('mongoose-double')(mongoose);

const userSchema = new mongoose.Schema({

  avatar: {
    type: Buffer,
    default: [82,73,70,70,136,15,0,0,87,69,66,80,86,80,56,32,124,15,0,0,112,186,0,157,1,42,32,3,88,2,62,237,118,186,85,169,168,38,35,33,215,40,25,48,29,137,103,110,252,124,124,0,238,187,128,112,129,191,229,236,113,82,82,152,171,43,235,121,93,251,16,143,188,238,252,194,63,127,250,81,127,238,232,180,244,205,189,31,187,113,146,133,244,31,62,152,12,107,135,143,59,49,255,11,143,34,8,255,59,194,45,49,243,213,127,245,225,10,13,214,137,229,211,23,24,31,164,96,46,58,192,5,116,197,198,2,227,172,0,87,76,92,196,28,47,31,108,205,196,47,29,86,240,212,0,170,185,248,59,150,209,199,65,196,138,77,47,143,106,103,42,75,177,206,157,98,170,104,139,129,65,215,83,18,102,30,170,9,20,123,154,49,248,180,114,223,161,238,188,255,216,0,157,160,56,70,255,243,127,66,144,78,48,129,84,136,114,37,142,126,238,98,20,179,138,254,105,27,21,36,215,229,114,150,124,142,6,248,7,208,158,238,50,26,176,40,10,121,249,30,134,107,108,181,242,223,203,247,253,31,234,74,26,89,212,211,27,108,214,174,129,147,57,8,225,166,152,30,64,151,84,161,204,17,103,7,183,33,53,191,220,165,165,118,99,203,168,208,76,9,202,12,92,242,156,39,234,221,183,29,175,119,221,86,124,139,69,219,49,248,252,126,62,206,92,93,9,220,86,174,224,187,0,166,78,98,227,157,164,161,56,143,21,68,170,221,183,24,185,221,62,114,140,109,110,40,222,87,87,128,32,32,101,22,87,65,76,26,103,117,53,0,84,226,166,149,62,139,252,104,240,32,150,40,65,198,182,87,34,139,162,220,126,7,18,102,230,42,68,137,202,97,186,117,166,110,120,11,142,176,2,235,54,62,243,226,6,84,49,241,213,108,123,90,210,55,93,199,222,157,156,190,226,95,161,17,54,255,212,167,12,48,23,29,96,2,167,48,186,221,139,199,29,241,248,252,126,56,228,151,76,232,148,218,87,174,13,33,96,71,136,196,201,168,2,186,98,220,208,63,80,139,234,177,251,38,237,163,65,201,153,91,182,227,2,255,146,93,122,244,15,214,62,125,148,206,234,106,0,174,46,111,241,72,70,189,126,191,44,147,53,163,6,228,165,179,103,143,32,233,182,222,192,9,218,110,87,46,152,184,192,91,246,190,143,27,143,243,1,111,215,235,245,215,34,94,165,243,46,95,175,215,89,244,77,79,10,13,180,5,116,197,198,2,227,85,92,118,44,228,196,96,124,84,119,37,191,208,189,158,24,56,148,164,43,101,154,102,250,84,114,241,228,129,133,59,169,168,2,184,200,236,125,138,58,156,88,197,220,125,181,133,204,106,105,92,142,176,230,43,218,86,95,71,157,12,184,211,251,207,49,26,227,1,113,213,248,163,63,80,125,46,172,37,86,224,33,85,78,11,222,31,121,176,110,15,155,113,218,245,248,141,210,231,8,3,46,227,62,7,184,235,0,21,197,27,137,78,167,131,59,223,82,60,6,132,83,38,57,227,182,237,245,35,85,205,20,186,250,237,237,99,203,73,244,32,208,1,194,176,1,92,81,187,112,140,141,57,50,198,74,15,119,29,71,96,150,255,44,218,234,103,11,200,48,185,141,78,142,106,123,180,127,211,67,188,38,44,133,194,243,19,186,112,29,229,217,29,174,164,142,96,71,194,19,42,44,223,234,129,7,218,191,209,79,107,252,176,8,58,142,254,145,159,134,59,36,162,15,100,93,110,158,183,135,50,150,88,250,252,31,115,132,230,141,201,81,3,51,158,120,178,252,202,240,7,28,21,48,25,29,97,248,58,166,167,44,145,171,13,34,71,202,72,241,1,151,69,6,186,247,141,159,234,187,59,179,110,126,58,165,20,143,236,147,94,187,199,98,44,86,142,167,176,240,4,25,113,29,111,136,84,188,124,229,145,133,47,159,230,139,143,13,247,244,84,144,73,104,241,62,218,225,253,72,149,43,218,167,156,95,115,17,19,73,248,124,118,76,39,31,218,200,70,222,64,149,129,152,83,8,100,74,70,127,153,192,4,34,82,102,180,107,78,132,153,209,248,98,145,26,42,177,23,189,100,174,100,201,168,136,189,218,157,171,39,211,171,210,77,130,39,70,160,4,70,241,7,10,60,48,197,199,136,45,249,156,118,1,146,29,121,30,165,121,138,98,156,96,221,168,199,247,144,233,179,188,112,38,32,117,204,230,142,155,142,69,110,189,112,128,232,108,125,182,63,107,155,183,160,203,83,89,215,151,100,208,183,35,142,6,187,72,58,223,227,160,244,141,52,139,113,242,43,249,237,171,152,217,42,88,156,15,2,5,49,37,116,54,122,8,85,172,62,246,169,107,43,229,146,203,161,166,71,245,251,154,17,196,194,71,145,128,94,115,209,33,26,207,94,220,204,125,47,54,92,117,126,36,139,144,34,105,222,76,35,108,23,164,69,98,238,165,23,200,181,35,85,192,41,147,28,12,244,101,144,72,165,143,204,46,34,219,76,174,100,214,228,26,93,223,197,26,245,249,158,107,245,214,124,244,151,230,115,200,57,0,65,41,21,160,89,47,163,176,117,60,25,3,93,49,113,149,138,67,101,33,68,98,65,122,168,197,220,247,255,62,92,124,109,117,40,182,73,175,87,136,65,167,135,2,72,235,147,66,216,121,46,140,5,199,88,0,117,27,193,143,136,132,141,121,79,9,26,245,208,51,103,64,16,74,70,127,236,118,194,23,169,228,114,200,207,38,160,10,233,139,137,227,6,15,41,48,72,74,153,238,47,84,214,125,125,76,225,121,212,103,14,239,65,48,42,146,187,6,242,192,172,0,87,76,92,96,45,248,138,86,235,119,99,137,26,174,143,74,116,74,108,191,95,174,130,120,87,50,154,26,98,171,197,34,127,89,36,96,46,58,192,5,116,123,161,40,253,133,196,219,199,220,81,118,140,99,148,1,94,124,26,15,1,92,32,16,101,140,21,160,128,252,87,83,80,5,116,197,198,86,44,43,105,202,123,58,17,65,67,166,184,127,31,134,209,208,7,32,182,46,206,118,68,220,81,25,3,42,186,192,5,116,197,198,2,227,89,201,86,141,105,31,223,140,225,120,252,131,11,131,242,30,145,213,88,84,207,186,64,202,43,33,162,215,215,151,152,184,192,92,117,128,10,232,247,17,67,78,11,98,76,118,227,236,147,93,75,121,237,152,227,188,26,208,146,58,41,34,75,64,21,211,23,24,11,142,176,1,83,50,27,28,11,133,253,194,67,124,94,62,36,235,71,65,235,26,244,222,162,221,117,93,152,242,233,139,140,5,199,87,254,39,142,64,45,196,163,115,242,104,245,119,128,0,253,190,127,197,6,132,155,125,126,171,105,21,191,164,63,13,31,27,86,171,248,144,58,111,111,31,89,33,136,26,107,49,133,242,245,96,194,208,181,222,217,185,15,238,31,226,61,81,45,89,101,106,100,98,239,234,99,243,75,96,205,189,206,146,234,218,127,190,100,238,235,248,216,67,89,103,244,107,92,95,86,148,45,25,125,198,160,221,196,251,5,227,16,122,56,245,24,23,111,208,135,21,140,171,193,23,77,75,214,187,157,24,250,252,17,12,171,184,14,215,254,36,109,78,91,20,106,77,104,77,82,138,178,28,194,193,243,4,109,225,35,219,248,53,67,182,29,221,117,29,188,103,57,94,135,5,125,166,120,160,86,6,4,120,75,79,15,228,71,35,214,165,18,151,108,46,84,131,60,251,126,215,109,146,60,77,215,96,157,106,73,6,191,112,225,253,163,83,137,215,250,99,212,78,217,190,25,65,54,81,93,255,122,215,214,240,78,114,54,250,234,161,182,179,137,42,9,39,16,217,58,67,137,201,49,144,200,86,18,77,90,59,46,205,41,64,140,251,239,193,111,36,43,66,47,154,32,64,185,46,255,180,221,102,116,31,117,152,108,2,205,223,126,47,183,227,17,40,204,33,9,21,122,129,138,72,112,83,205,168,4,125,29,184,150,77,27,237,198,61,206,177,167,166,104,251,105,180,241,105,79,96,39,31,128,22,183,5,235,248,123,120,207,164,182,164,16,120,87,32,95,96,59,50,105,63,129,37,144,216,127,97,44,158,48,110,72,32,196,191,151,97,104,140,141,95,57,221,127,142,20,41,21,203,228,98,218,47,0,192,127,184,227,52,61,43,216,201,73,158,82,127,36,24,89,203,142,244,63,29,7,14,75,121,5,191,109,0,106,21,208,10,150,24,4,47,155,245,200,214,218,238,148,12,42,212,228,127,122,158,190,94,217,30,225,124,84,243,249,163,215,18,64,194,225,87,242,132,9,19,238,115,180,241,177,217,29,14,250,113,204,239,247,235,216,113,191,169,223,186,96,24,128,48,114,10,40,98,235,138,167,95,97,104,31,234,253,249,235,96,27,133,151,114,19,228,105,201,118,229,142,16,135,63,203,220,220,168,180,94,1,237,245,142,6,201,202,131,234,41,193,168,5,140,235,193,225,95,157,244,199,175,0,4,38,57,78,207,99,177,26,137,188,49,154,21,47,36,239,23,35,32,248,136,16,54,77,68,166,221,223,71,220,73,157,20,28,31,185,143,102,42,125,37,192,213,68,187,180,162,55,53,173,65,147,189,10,0,28,95,49,91,159,51,88,159,117,190,138,97,182,64,160,208,71,151,9,4,220,168,136,44,50,200,138,188,113,206,69,9,151,28,52,204,246,79,46,127,127,169,223,47,124,69,186,111,179,193,203,151,29,136,177,104,0,9,43,184,195,6,100,196,157,115,69,47,137,37,205,245,180,5,220,242,179,54,52,30,196,154,166,134,220,1,62,94,7,119,195,228,4,124,99,16,252,176,214,101,143,178,16,128,0,39,138,126,127,221,121,4,27,56,45,86,30,0,252,93,242,26,25,231,231,221,159,199,143,97,14,64,134,160,12,176,0,0,59,204,53,205,114,37,14,109,170,90,154,151,21,157,241,55,247,21,54,87,63,216,125,29,84,120,77,49,203,69,189,243,6,84,122,143,2,164,252,177,151,89,128,0,141,224,81,154,158,20,179,101,186,69,105,86,77,68,95,35,35,191,238,167,176,207,207,56,224,190,11,148,90,185,33,22,153,30,29,66,194,240,13,63,237,47,66,189,139,232,15,139,0,0,115,192,150,56,135,250,35,178,192,15,60,71,223,11,89,161,216,254,127,160,198,76,252,199,117,147,94,149,122,173,209,98,219,223,213,192,6,236,197,56,189,120,15,243,32,92,171,125,156,48,49,152,252,86,224,0,7,109,207,245,32,34,246,61,239,215,155,241,143,166,138,93,22,232,68,113,207,55,193,168,79,232,115,94,84,3,185,212,82,118,239,36,160,5,162,155,165,25,202,134,51,14,59,255,33,167,164,163,190,38,140,108,93,201,184,0,7,193,63,152,44,132,191,101,38,114,87,76,127,58,3,154,128,0,49,253,235,157,21,100,144,209,195,225,71,169,39,35,181,250,115,124,231,68,194,179,9,137,250,193,78,138,111,186,227,176,0,25,29,100,57,101,146,110,78,21,28,140,165,106,112,18,172,7,61,147,144,182,251,251,59,71,81,217,235,146,167,255,181,110,125,28,217,245,34,223,19,247,113,225,180,184,114,117,24,61,229,73,226,29,52,218,142,240,7,22,207,68,189,53,207,239,1,3,184,32,129,145,173,88,63,201,4,254,119,229,128,3,133,242,148,13,59,166,215,17,36,79,55,41,35,96,51,40,47,215,132,62,111,253,26,230,158,255,105,224,140,56,122,160,39,137,0,124,37,200,129,17,178,213,248,148,64,175,176,185,154,80,203,236,157,140,197,255,6,62,8,111,85,249,108,221,115,199,28,208,133,159,122,13,109,205,159,70,75,120,250,10,104,225,210,221,92,174,232,112,35,225,45,70,187,42,246,76,85,116,191,74,191,56,0,192,104,120,222,109,189,45,152,54,247,229,6,64,189,36,173,94,184,44,107,14,199,206,12,46,197,103,249,115,246,155,213,174,181,130,54,98,111,189,243,109,43,168,23,37,59,102,26,130,171,98,102,31,110,239,151,152,161,188,67,171,141,249,148,137,170,155,178,102,146,14,18,119,192,209,97,48,190,89,41,227,218,29,130,22,2,190,150,22,10,231,116,130,88,225,130,115,31,227,189,137,213,233,239,226,141,253,59,153,93,0,84,168,245,61,104,14,96,173,73,216,58,39,96,87,69,143,231,70,230,44,188,186,252,112,115,13,39,35,252,49,7,84,43,124,233,98,215,86,156,248,147,113,145,107,221,112,239,102,22,155,53,107,186,121,146,235,116,166,216,44,87,203,209,120,114,143,238,136,173,166,86,253,29,109,77,216,75,137,251,136,175,216,174,251,254,16,102,253,7,4,66,30,60,101,55,103,145,12,56,146,77,154,227,242,85,34,1,205,121,140,194,179,38,131,132,39,42,92,61,185,168,248,174,68,232,213,5,138,130,99,192,141,1,234,194,115,91,204,119,31,237,77,10,19,20,232,41,168,215,253,186,49,9,93,208,145,75,11,221,147,84,178,88,76,115,163,239,82,244,79,77,5,89,57,177,95,24,126,227,141,15,110,15,81,8,63,192,36,19,234,232,13,194,175,132,97,183,51,73,214,102,242,225,154,32,21,97,103,31,196,78,6,26,179,45,47,80,222,209,104,35,19,102,148,219,16,21,63,2,105,149,147,59,248,174,9,214,75,15,8,163,124,156,133,238,124,57,92,3,159,53,209,170,24,83,29,55,201,239,86,89,99,120,26,18,241,119,134,126,157,104,237,104,98,32,154,12,46,53,60,74,171,48,118,198,104,71,109,223,254,27,169,220,226,51,42,235,29,74,178,175,78,78,227,33,16,182,220,8,174,116,152,149,198,248,182,224,53,174,26,94,227,111,84,160,163,177,77,98,41,255,106,80,165,234,186,159,222,202,200,143,84,151,246,93,239,35,14,246,156,245,95,127,237,60,214,108,129,103,43,44,75,32,215,14,152,246,99,69,227,193,15,213,206,91,215,118,223,205,167,3,20,231,7,76,129,65,164,131,113,225,41,151,27,27,65,40,155,236,41,159,85,55,61,163,111,221,189,99,229,181,181,36,111,31,186,68,72,186,163,213,96,153,5,20,163,55,218,20,10,68,38,248,81,226,174,103,116,233,43,126,190,40,144,54,3,80,55,41,134,192,243,29,169,103,87,147,160,109,197,107,172,136,11,196,160,227,36,149,246,215,239,191,159,177,63,87,172,8,189,98,36,202,16,0,9,157,15,87,48,86,14,176,86,200,36,26,186,250,147,236,201,29,79,1,167,220,159,23,179,42,218,103,197,0,13,96,194,2,18,26,203,109,53,161,208,16,65,217,80,12,234,228,46,11,246,210,8,23,108,191,22,118,74,236,153,181,42,137,62,53,142,82,58,162,199,117,42,176,126,48,161,9,114,194,147,140,213,22,188,127,215,118,216,243,89,181,117,0,9,81,1,100,66,141,215,62,132,151,131,231,175,30,207,159,14,123,102,119,15,137,62,137,164,6,101,72,147,48,239,5,119,47,7,179,177,105,91,40,68,168,138,76,173,137,62,125,108,207,12,61,115,116,105,147,161,8,4,59,28,128,132,72,93,22,115,130,54,39,247,249,121,139,254,120,17,118,37,6,65,111,199,71,45,250,241,54,16,228,233,165,98,80,92,109,103,10,81,47,24,49,231,63,157,91,130,54,46,48,35,16,35,142,60,0,3,148,75,96,104,58,26,153,177,92,247,73,184,233,191,1,132,98,238,226,42,131,144,45,34,177,161,7,221,31,253,175,92,246,124,252,147,206,154,34,113,76,41,252,19,56,70,82,154,128,234,39,120,33,113,62,41,71,207,218,150,94,5,208,213,238,144,0,13,159,230,41,131,86,7,122,154,71,68,30,220,3,224,253,155,223,156,31,155,84,249,238,102,201,74,230,133,128,166,197,93,86,236,134,26,192,102,2,99,69,181,109,125,13,7,11,173,6,142,187,16,110,42,152,0,0,126,163,139,82,190,19,135,129,208,43,218,111,172,45,105,19,174,88,112,147,78,32,67,103,179,83,94,170,21,157,179,101,193,46,101,130,126,115,145,153,194,91,81,251,224,210,245,248,161,119,69,168,69,158,114,14,189,210,0,1,172,113,65,247,75,190,103,4,202,94,18,179,59,148,183,129,200,56,38,95,25,187,47,185,49,119,240,32,104,90,228,253,129,242,107,50,156,156,41,114,51,29,239,99,110,77,113,144,158,99,62,230,42,240,32,50,40,0,2,80,50,125,234,11,206,61,230,127,230,26,253,189,76,182,220,53,174,255,31,85,60,33,158,185,53,52,159,164,0,24,4,250,240,179,98,226,214,82,13,62,123,51,49,113,178,15,115,216,29,25,189,96,0,1,204,96,210,33,141,140,1,133,221,43,13,119,253,100,239,224,138,236,49,193,10,246,150,102,160,127,245,207,153,31,43,8,136,1,100,52,74,254,169,147,26,144,23,121,163,142,0,144,222,28,252,44,109,217,94,249,250,9,20,128,0,2,38,235,18,150,208,17,243,255,191,255,46,187,228,139,216,29,147,159,90,95,51,213,2,157,200,163,8,115,216,160,201,78,120,190,198,118,111,119,21,47,197,20,31,183,180,137,165,7,68,239,199,32,74,45,138,168,80,178,56,150,225,0,0,20,215,234,213,96,160,115,55,23,4,15,128,198,76,191,53,200,81,116,147,143,69,105,140,104,212,162,94,172,14,71,150,172,10,37,121,7,96,54,104,19,85,163,164,72,216,50,0,0,6,40,142,230,58,137,224,185,18,252,234,57,147,115,7,214,31,81,44,176,0,0],
  },

  name: {
    type: String,
    require: [true, 'Um Nome é necessário'],
  },

  tag: {
    type: String,
    default: 'Principiante'
  },
  email: {
    type: String,
    unique: true,
    require: [true, 'Um Email é necessário'],
    lowercase: true,
  },

  password: {
    type: String,
    required: [true, 'Uma Senha é necessária'],
    select: false,
  },

 // Gaming
  level: {
    type: Number,
    default: 1,
  },

  xp: {
    type: Number,
    default: 0,
  },

  skillTree: {
    cauteloso: {
      type: Number,
      default: 0,
    },
    protetor: {
      type: Number,
      default: 0,
    },
    sentinela: {
      type: Number,
      default: 0,
    }
  },

  denuncias: [{
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    location: {
      latitude:  mongoose.Decimal128,
      longitude:  mongoose.Decimal128
    },
    rank: {
      type: Number,
      default: 0,
    }
  }],

  questAcquired: [{
    _id: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quest',
    required: true,
  }],

  questsCompleted: [{
    _id: false,
    title: {
      type: String,
      require: true,
    },

    description: {
      type: String,
      require: true,
    },

    picture: {
      type: Buffer,
    }
  }],

  // Social

  friendsInvite: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],

  friends: [{
    _id: false,
    friend:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    accept: {
      type: Boolean,
    }
  }],

  passwordResetToken: {
    type: String,
    select: false,
  },

  passwordResetExpires: {
    type: Date,
    select: false,
  },

});

// ========================= Encryptação de Senha =================== //

// eslint-disable-next-line func-names
userSchema.pre('save', function (next) {
  if (this.password == null || this.password === undefined) {
    next();
  } else {
    bcrypt.hash(this.password, 10, (err, hash) => {
      if (err) {
        throw err;
      }
      this.password = hash;
      next();
    });
  }
});
// ================================================================== //

const User = mongoose.model('User', userSchema);
module.exports = User;
