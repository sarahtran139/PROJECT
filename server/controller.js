require("dotenv").config();
const Sequelize = require("sequelize");
const { CONNECTION_STRING } = process.env;
const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});



module.exports = {
  
  
    seed: (req, res) => {
        sequelize.query(
        `
            drop table if exists babies;
            drop table if exists foods;

            create table foods (
                food_id serial primary key, 
                name varchar
            );

            create table babies (
                baby_id serial primary key,
                name varchar,
                day int,
                food_id int references foods(food_id)
            );
        
    
      
        

            insert into foods (name)
            values ('Tomato soup'),
            ('Chicken Rice'),
            ('Spagetti Beef'),
            ('Pasta'),
            ('Vegetable Noodle');
            
            
           
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    },
    getFoods: (req, res) => {
      sequelize.query(`Select name, food_id from foods; `)
      .then(dbRes => res.status(200).send(dbRes[0]))
      .catch(err => res.status(500).send(err))
    },
    createBaby: (req, res) => {
      const { name, foodId, day} = req.body;
      sequelize.query(`
        INSERT INTO babies (name, food_id, day)
        VALUES ('${name}', '${foodId}','${day}') returning *;
      `)
      .then(dbRes => res.status(200).send(dbRes[0]))
      .catch(err => res.status(500).send(err))
    },
    getBabies: (req, res) => {
      sequelize.query(`SELECT babies.name, babies.baby_id, foods.name, babies.day, foods.food_id, foods.name
      FROM foods
      JOIN babies ON babies.food_id = foods.food_id`)
      .then(dbRes =>{
        console.log(dbRes[0])
         res.status(200).send(dbRes[0])})
      .catch(err => res.status(500).send(err))
    },
    deleteBaby: (req, res) => {
      const {id} = req.params
      sequelize.query(`DELETE FROM babies WHERE baby_id = ${id};`)
      .then(dbRes => res.status(200).send(dbRes[0]))
      .catch(err => res.status(500).send(err))
    }


    


    
      
    }
    
    
    