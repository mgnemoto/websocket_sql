class Contenedor{
    constructor(config, tableName){
        this.config = config;
        this.tableName = tableName;
    }

    createTable(){
        const knex = require('knex')(this.config);
        knex.schema.createTable(this.tableName, function(table) {
            table.increments('id');
            table.string('name');
            table.integer('price');
        })
        .then(()=>{
            console.log(`Table ${this.tableName} created`);
        })
        .catch((err)=>{
            console.log(err);
        })
        .finally(()=>{
            knex.destroy();
        })}
}

module.exports=Contenedor;