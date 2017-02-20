var express = require('express');
var router = express.Router();
const AllianceDAO = require('../models/AllianceDAO');

/* GET alliances listing. */
router.get('/', function(req, res, next) {
  	AllianceDAO.getAllAlliances()
  		.then((alliances) => {
        res.status(200)
          .json({
            status:'success',
            alliances: alliances
          });
      });
});

/* GET one alliance by id. */
router.get('/:id', function (req, res, next) {
	var id = parseInt (req.params.id);
	AllianceDAO.getAllianceById(id)
		.then((alliance) => {
      res.status(200)
        .json({
          status:'success',
          alliance: alliance
        });
		});
});

/* GET all users of an alliance. */
router.get('/:id/users/', function (req, res, next) {
	var id = parseInt (req.params.id);
	AllianceDAO.getAllUsers(id)
		.then((alliances) => {
			res.send(alliances);
		});
});

/* GET all characters of an alliance. */
router.get('/:id/characters/', function (req, res, next) {
	var id = parseInt (req.params.id);
	AllianceDAO.getAllCharacters(id)
		.then((alliances) => {
			res.send(alliances);
		});
});

/* POST an alliance. */
router.post('/', function (req, res, next) {
	const name = req.body.alliance.name;

	console.log(req.body);

	AllianceDAO.createAlliance(name)
		.then((alliance) => {
      res.status(200)
        .json({
          status:'success',
          message: 'Inserted one alliance',
          alliance:alliance
        })
		})
		.catch((error) => {
      res.status(500)
        .json({
          status:'Error',
          message:error
        })

		});
});

/* DELETE one alliance by id. */
router.delete('/:id', function (req, res, next) {
	var id = parseInt (req.params.id);
	AllianceDAO.deleteAllianceById(id)
		.then((alliance) => {
      res.status(200)
        .json({
          status:'success',
          message: alliance
        });
		})
		.catch((error) => {
			return next(error);
		});
});

/* UPDATE an alliance by id. */
router.put('/:id', function (req, res, next) {
	var id = parseInt (req.params.id);
	var name = req.body.alliance.name;
	AllianceDAO.updateAllianceById(id, name)
		.then((alliance) => {
      res.status(200)
        .json({
          status:'success',
          message: 'modified a alliance',
          alliance: alliance
        });
    })
		.catch((error) => {
			return next(error);
		});
});

module.exports = router;
