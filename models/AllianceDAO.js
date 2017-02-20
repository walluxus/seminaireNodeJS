const DB = require('./Database');

module.exports = {
	getAllianceById(id){
		return DB.accessor.query('SELECT * FROM alliances WHERE id = $1', id)
			.then((result) => {
				return result[0];
			})
			.catch((error) => {
				throw error;
			});

	},

	getAllAlliances(){
		return DB.accessor.query('SELECT * FROM alliances')
			.then((result) => {
				return result;
			})
			.catch((error) => {
				throw error;
			});
	},

	getAllUsers(id){
		const query = "SELECT * FROM users WHERE alliance_id = $(_alliance_id)"
		return DB.accessor.query(query, {
				_alliance_id : id
			})
			.then((result) => {
				return result;
			})
			.catch((error) => {
				throw error;
			});
	},

	getAllCharacters(id){
		const query = "SELECT * FROM characters JOIN users ON characters.user_id = users.id WHERE users.alliance_id = $(_alliance_id)"
		return DB.accessor.query(query, {
				_alliance_id : id
			})
			.then((result) => {
				return result;
			})
			.catch((error) => {
				throw error;
			});
	},

	createAlliance(name){
		const query = "INSERT INTO alliances(name) VALUES (${_name}) RETURNING *";
		return DB.accessor.query(query, {
				_name : name
			})
			.then((result) => {
				return result[0];
			})
			.catch((error) => {
				throw error;
			});
	},

	deleteAllianceById(id){
		const query = "DELETE FROM alliances WHERE id = $(_alliance_id)";
		return DB.accessor.query(query, {
				_alliance_id : id
			})
			.then((result) => {
				return result;
			})
			.catch((error) => {
				throw error;
			});
	},

	updateAllianceById(id, name){
		const query = "UPDATE alliances SET name = ${_name} WHERE id = ${_alliance_id} RETURNING *";
		return DB.accessor.query(query, {
			_name : name,
			_alliance_id : id
		})
		.then((result) => {
				return result[0];
			})
			.catch((error) => {
				throw error;
			});
	}
};
