class Module
  {
    constructor(moduleName,version)
    {
        this.moduleName = moduleName;
        this.version = version;
        this.dependencies = [];        
    }
}

module.exports = Module;