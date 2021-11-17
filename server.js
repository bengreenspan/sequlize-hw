const { HostNotReachableError } = require('sequelize');
const Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4 } = Sequelize;
const conn = new Sequelize (process.env.DATABASEURL || 'postgres://localhost/sandwicheshw');
const express = require('express');
const app = express();


app.get('/api/sandwiches', async(req, res, next)=> {
    try{
        res.send( await Sandwich.findAll({
            include: [ 
                {
             model: Ingredient,
             as: 'component'
            },
            Ingredient
        ]
        }));
    }
    catch(ex){
        next(ex)
    }
})

const Sandwich = conn.define('sandwich', {
    name: {
        type: STRING (60),
    }

});
const Ingredient = conn.define('ingredient', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    name: {
        type: STRING (40)
    }    
});

Sandwich.belongsTo(Ingredient, { as: 'component'});
Ingredient.hasMany(Sandwich, { foreignKey: 'componentID'});


const syncAndSeed = async() => {
    await conn.sync({  force:true });
   const [ BuffaloChickenSandwich, LiverwurstSandwich, TurkeyClub, Bacon,  BlueCheese, Bread, BuffaloSauce, 
    Chicken,  Lettuce, Liverwurst, Mayo, Mustard, Onion, Tomato, Turkey]
   = await Promise.all([
       Sandwich.create({ name: 'BuffaloChickenSandwich'}),
       Sandwich.create({ name: 'LiverwurstSandwich'}),
       Sandwich.create({ name: 'TurkeyClub'}),
       Ingredient.create({ name: 'Bacon'}),
       Ingredient.create({ name: 'BlueCheese'}),
       Ingredient.create({ name: 'Bread'}),
       Ingredient.create({ name: 'BuffaloSauce'}),
       Ingredient.create({ name: 'Chicken'}),
       Ingredient.create({ name: 'Lettuce'}),
       Ingredient.create({ name: 'Liverwurst'}),
       Ingredient.create({ name: 'Mayo'}),
       Ingredient.create({ name: 'Mustard'}),
       Ingredient.create({ name: 'Onion'}),
       Ingredient.create({ name: 'Tomato'}),
       Ingredient.create({ name: 'Turkey'})

   ])



BuffaloChickenSandwich.componentID = BlueCheese.id
BuffaloChickenSandwich.componentID = BuffaloSauce.id
LiverwurstSandwich.componentID = Liverwurst.id
LiverwurstSandwich.componentID = Mustard.id
TurkeyClub.componentID = Turkey.id
TurkeyClub.componentID = Bacon.id
TurkeyClub.componentID = Mayo.id

BuffaloChickenSandwich.componentID = Bread.id
LiverwurstSandwich.componentID = Bread.id
TurkeyClub.componentID = Bread.id

BuffaloChickenSandwich.componentID = Onion.id
LiverwurstSandwich.componentID = Onion.id

BuffaloChickenSandwich.componentID = Chicken.id
BuffaloChickenSandwich.componentID = Lettuce.id
BuffaloChickenSandwich.componentID = Tomato.id
TurkeyClub.componentID = Chicken.id
TurkeyClub.componentID = Mustard.id
TurkeyClub.componentID = Tomato.id



await Promise.all([
    BuffaloChickenSandwich.save(),
    LiverwurstSandwich.save(),
    TurkeyClub.save()
]);
    
};

    
   







const init = async() => {
    try{
        await conn.authenticate();
        await syncAndSeed();
    const port = process.env.port || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
    }
    catch(ex){
        console.log(ex);
    };
    };
    
    init();