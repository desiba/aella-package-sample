const yaml = require('js-yaml');
const inputfile = './error_template.yml';
const fs = require('fs');
const jsonObj = yaml.load(fs.readFileSync(inputfile));
const AppException = require('./error');

//let errorException = new AppException("4838", "eierur");

const result = {};
    
const fetch = (code, en = {}) => {
  code = ( typeof(code) == "number" ) ? JSON.stringify(code) : code;
  for(let obj in jsonObj){
    if(obj == code){
      result.code = obj
      result.title = jsonObj[obj]['title']
      result.message = jsonObj[obj]['message']
      break;
    }
  }

  if(en != null){
    console.log(en);
  }
  
}

//fetch('3001');

//console.log(new AppException("4838", "eierur"));

module.exports = {
  fetch,
  AppException
}


