var express = require('express');
var router = express.Router();
const CharacterDAO = require('../models/CharacterDAO');

/* GET characters listing. */
router.get('/', function(req, res, next) {
  	CharacterDAO.getAllCharacters()
  		.then((characters) => {
        res.status(200)
          .json({
            status:'success',
            characters: characters
          });
  		});
});

/* GET one character by id. */
router.get('/:id', function (req, res, next) {
	var id = parseInt (req.params.id);
	CharacterDAO.getCharacterById(id)
		.then((character) => {
      res.status(200)
        .json({
          status:'success',
          character: character
        });
		});
});

/* GET all character of a class. */
router.get('/classes/:class', function (req, res, next) {
	var _class = req.params.class;
	CharacterDAO.getAllCharactersFromClass(_class)
		.then((characters) => {
			res.send(characters);
		});
});

/* POST a character. */
router.post('/', function (req, res, next) {
	const name = req.body.character.name;
	const mclass = req.body.character.class;
	const user_id = req.body.character.user_id;
	const position_x = req.body.character.position.x;
	const position_y = req.body.character.position.y;

	console.log(req.body);

	CharacterDAO.createCharacter(name, mclass, user_id, position_x, position_y)
		.then((character) => {
      res.status(200)
        .json({
          status:'success',
          message: 'Inserted one character',
          character: character
        });
      })
		.catch((error) => {
			return next(error);
		});
});

/* DELETE one character by id. */
router.delete('/:id', function (req, res, next) {
	var id = parseInt (req.params.id);
	CharacterDAO.deleteCharacterById(id)
		.then((characters) => {
      res.status(200)
        .json({
          status:'success',
          message: characters
        });
		})
		.catch((error) => {
			return next(error);
		});
});

/* UPDATE a character by id. */
router.put('/:id', function (req, res, next) {
	var id = parseInt (req.params.id);
	var name = req.body.character.name;
  var user_id = req.body.character.user_id;
  var mclass = req.body.character.class;
  var position_x = req.body.character.position.x;
  var position_y = req.body.character.position.y;
	CharacterDAO.updateCharacterById(id, name)
		.then((character) => {
      res.status(200)
        .json({
          status:'success',
          message: 'modified a character',
          character: character
        });
    })
		.catch((error) => {
			return next(error);
		});
});

module.exports = router;
