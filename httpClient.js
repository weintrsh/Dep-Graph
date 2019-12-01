const Module = require('./module');
const axiosRetry = require('axios-retry');
const axios = require('axios');

class HttpClient
  {
    static async get(pkgName,version) 
    {       
      var deps = [];      
      version = version.replace('^','');
      var pkgURL =  'https://registry.npmjs.cf/'+pkgName + '/' + version;
      axiosRetry(axios, { retries: 3 });
      await axios.get(pkgURL)
            .then(response => {
                var packages = response.data.dependencies;
                for(const pkg in packages)
                {
                    var dep = new Module(pkg,packages[pkg],[]);  
                    deps.push(dep);                  
                }                
            })
            .catch(error => {                
                console.log(error.code);
                console.log(error.message);
                console.log(error.stack);
            });
      return deps;
    }
  }

  module.exports = HttpClient;