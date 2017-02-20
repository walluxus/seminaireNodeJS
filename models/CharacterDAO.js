const DB = require('./Database');

module.exports = {
	getCharacterById(id){
		return DB.accessor.query('SELECT * FROM characters WHERE id = $1', id)
			.then((result) => {
				return result[0];
			})
			.catch((error) => {
				throw error;
			});

	},

	getAllCharacters(){
		return DB.accessor.query('SELECT * FROM characters')
			.then((result) => {
				return result;
			})
			.catch((error) => {
				throw error;
			});
	},

	getAllCharactersFromClass(mclass){
		const query = "SELECT * FROM characters WHERE class = $(_class)";
		return DB.accessor.query(query,{
				_class : mclass
			})
			.then((result) => {
				return result;
			})
			.catch((error) => {
				throw error;
			});
	},

	createCharacter(name, mclass, user_id, position_x, position_y){
		const query = "INSERT INTO characters(name, class, user_id, position) VALUES (${_character_name}, ${_character_class}, ${_user_id}, point(${_character_position_x},${_character_position_y})) RETURNING *";
		return DB.accessor.query(query, {
				_character_name : name,
				_character_class : mclass,
				_user_id : user_id,
				_character_position_x : position_x,
				_character_position_y : position_y
			})
			.then((result) => {
				return result[0];
			})
			.catch((error) => {
				throw error;
			});
	},

	deleteCharacterById(id){
		const query = "DELETE FROM characters WHERE id = $(_character_id)";
		return DB.accessor.query(query, {
				_character_id : id
			})
			.then((result) => {
				return result;
			})
			.catch((error) => {
				throw error;
			});
	},

	updateCharacterById(id, name){
		const query = "UPDATE characters SET name = ${_name}, class = ${_mclass}, user_id = ${_user_id},  WHERE id = ${_character_id} RETURNING *";
		return DB.accessor.query(query, {
			_name : name,
			_character_id : id
		})
		.then((result) => {
				return result[0];
			})
			.catch((error) => {
				throw error;
			});
	}
};
