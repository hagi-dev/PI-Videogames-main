const {Genre, conn} = require('../../src/db');

describe("Genre Model",()=>{
    before(()=>conn.authenticate()
    .catch((err)=>{
        console.error('Unable to connect to the database',err);
    })
    );
    describe("Validators",()=>{
        beforeEach(()=> Genre.sync({force: true}));
        describe("name and id",()=>{
            it("should throw an error if name is null",(done)=>{
                Genre.create({})
                .then(()=>done(new Error('It requires a valid name and a id')))
                .catch(()=>done());
            });
            it("should work when its a valid name and id",()=>{
                Genre.create({id:15, name:'action'}); 
            });
        });
    });
});