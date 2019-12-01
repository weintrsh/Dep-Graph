var cache = new Map();
const Module = require('./module');
const HttpClient = require('./httpClient');
class DepsManager
  {    
     static async getDeps(pkgName,version)
     {          
        var node = cache.get(pkgName+'-v.-'+version);
        
        if(!node)
          {            
            var firstLevelDeps = await HttpClient.get(pkgName,version); 
            node = new Module(pkgName,version,[]) 
            var deps = [];
        
            for(var i=0;i<firstLevelDeps.length;i++)
            {
                var pkg = firstLevelDeps[i];
                deps.push(await DepsManager.getDeps(pkg.moduleName,pkg.version));                            
            }
            node.dependencies = deps;
            cache.set(node.moduleName+'-v.-'+node.version,node);
          }
        return node;
     }
  }

  module.exports = DepsManager;