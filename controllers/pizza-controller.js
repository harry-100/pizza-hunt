const { Pizza } = require('../models');

const pizzaController = {
    // get all pizzas
    getAllPizza(req, res) {
        Pizza.find({})
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // get pizza by id
    getPizzaById({ params }, res) {
        Pizza.findOne({_id: params.id})
        .then(dbPizzaData => {
            // if no pizza is found, send 404 error
            if(!dbPizzaData){
                res.status(404).json({ message: 'No pizza found with this id'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // create Pizza
    createPizza({ body }, res) {
        Pizza.create(body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(400).json(err));
    },
    // update a Pizza by id
    updatePizza({ params, body }, res) {
        // if we don't set new:true, it will Mongoose will return old document. By setting it to new, we are asking it return new updated document
        Pizza.findOneAndUpdate({ _id: params.id }, body, {new: true })
        .then(dbPizzaData => {
            if(!dbPizzaData) {
                res.status(404).json({ message: 'No pizza with this id!'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    },
    //  delete a Pizza
    deletePizza({ params }, res){
        Pizza.findOneAndDelete({ _id: params.id})
        .then(dbPizzaData => {
            if(!dbPizzaData){
                res.status(404).json({ message: 'No pizza found with this id'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    }
};


module.exports = pizzaController;


