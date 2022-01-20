const yaml = require('js-yaml');
const fs = require('fs')
const crypto = require('crypto');
const path = require('path')
const inputfile = path.join(__dirname, './error_template.yml');
const {Exception} = require('./error');
const result = {};

const generateChecksum = (str, algorithm, encoding) => {
    return crypto.createHash(algorithm || 'md5').update(str, 'utf8').digest(encoding || 'hex');
};


const config = (option = {}) => {
  if(option.path !== null){
    let parsed = fs.readFileSync(option.path, "utf-8");
    let checksum = generateChecksum(parsed);
    let fileContent = fs.readFileSync(path.join(__dirname, 'loaded_hashed_file.txt')).toString().split("\n");

    let pathFileObj = yaml.load(parsed);

    let duplicateCode = false;

    if(!fileContent.includes(checksum)){

      let innerFileObj = yaml.load(fs.readFileSync(inputfile));
      for(let i in pathFileObj){
        
        if(innerFileObj.hasOwnProperty(i)){
          duplicateCode = true;
          break
        }
      }
  
      if(duplicateCode){
        throw Error('duplicate error-code passed');
      }
  
      fs.appendFileSync(path.join(__dirname, 'loaded_hashed_file.txt'), "\n"+checksum);
      parsed.split(/\r?\n/).forEach(line => {
        fs.appendFileSync(inputfile, "\n"+line, function (err) {
          if (err) throw err;
        })
      })
    }
  }
}

const fetch = (code, en = 'eng') => {


  //config({ path: path.join(__dirname, 'xyz.yml') });


  const jsonObj = yaml.load(fs.readFileSync(inputfile));
  code = ( typeof(code) == "number" ) ? JSON.stringify(code) : code;
  for(let obj in jsonObj){
    if(obj == code){
      result.code = obj
      result.title = jsonObj[obj]['title']
      result.message = jsonObj[obj]['message'][en]
      break;
    }
  }
  return result;
}

module.exports = {
  fetch,
  config,
  Exception
}


