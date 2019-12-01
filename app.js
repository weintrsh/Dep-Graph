const Module = require('./module');

const http = require('http');
const url = require('url');
const express = require('express');
const app = express();

//var redis = require('redis');
//var client = redis.createClient();

const DepsManager = require('./depsManager');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  next();
});
  
  var port = 8080;
  const pid = process.pid;
  console.log("pid:" + pid);
  app.listen(port,()=>console.log('Listening on port ' + port + '...'));
  
  app.get('/api/deps/:pkg/:ver', async function (req, res) 
  {
    var pkgName = req.params.pkg;
    var version = req.params.ver;      
    var module = await DepsManager.getDeps(pkgName,version);
    res.send(module);
  });
    //module = new Module(pkgName,version);
    // var packages;
    // packages = await HttpClient.get(pkgName,version);
    // client.set(pkgName+'-v.-'+version, JSON.stringify(packages),function(err,reply) {
    //   console.log(err);
    //   console.log(reply);
    // });
    //client.set(pkgName+'-v.-'+version, JSON.stringify(packages));

    // await client.get('madge-v.-3.4.4', function (error, result) {
    //   if (error) {
    //       console.log(error);
    //       throw error;
    //   }
    //   console.log('GET result ->' + result);
    //   module.dependencies = result;
    
    
    //   //packages = result;
    // });
  //});
    
  


  
  
  