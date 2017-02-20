var express = require('express');
var router = express.Router();
const UserDAO = require('../models/UserDAO');

/* GET users listing. */
router.get('/', function(req, res, next) {
  	UserDAO.getAllUsers()
  		.then((users) => {
        res.status(200)
          .json({
            status:'success',
            users: users
          });
  		})
  		.catch((error) => {
			return next(error);
		});
});

/* GET one user by id. */
router.get('/:id', function (req, res, next) {
	var id = parseInt (req.params.id);
	UserDAO.getUserById(id)
		.then((user) => {
  			res.status(200)
          .json({
            status:'success',
            user: user
          });
  		})
		.catch((error) => {
			return next(error);
		});
});

/* GET all characters of a user. */
router.get('/:id/characters/', function (req, res, next) {
	var id = parseInt (req.params.id);
	UserDAO.getAllCharacters(id)
		.then((characters) => {
      res.status(200)
        .json({
          status:'success',
          characters: characters
        });
		})
		.catch((error) => {
			return next(error);
		});
});

/* POST a user. */
router.post('/', function (req, res, next) {
	const name = req.body.user.name;
	const email = req.body.user.email;
	const alliance_id = req.body.user.alliance_id;

	console.log(req.body);

	UserDAO.createUser(name, email, alliance_id)
		.then((user) => {
      res.status(200)
        .json({
          status:'success',
          message: 'Inserted one user',
          user: user
        });
    })
		.catch((error) => {
			return next(error);
		});
});

/* DELETE one user by id. */
router.delete('/:id', function (req, res, next) {
	var id = parseInt (req.params.id);
	UserDAO.deleteUserById(id)
		.then((user) => {
      res.status(200)
        .json({
          status:'success',
          message:user
        });
    })
		.catch((error) => {
			return next(error);
		});
});

/* UPDATE a user by id. */
router.put('/:id', function (req, res, next) {
	var id = parseInt (req.params.id);
	var name = req.body.user.name;
	var email = req.body.user.email;
	var alliance_id = req.body.user.alliance_id;
	UserDAO.updateUserById(id, name, email, alliance_id)
		.then((user) => {
      res.status(200)
        .json({
          status:'success',
          message:'modified a user',
          user: user
        });
    })
		.catch((error) => {
			return next(error);
		});
});

module.exports = router;
