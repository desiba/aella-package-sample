const yaml = require('js-yaml');
const inputfile = './error_template.yml';
const fs = require('fs');
const jsonObj = yaml.load(fs.readFileSync(inputfile));
const AppException = require('./error');

const result = {};

const fetch = (code, en = 'ng') => {

  code = ( typeof(code) == "number" ) ? JSON.stringify(code) : code;
  for(let obj in jsonObj){
    if(obj == code){
      result.code = obj
      result.title = jsonObj[obj]['title']
      result.message = jsonObj[obj]['message'][en]
      break;
    }
  }
}

module.exports = {
  fetch,
  AppException
}


