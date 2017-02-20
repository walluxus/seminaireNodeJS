const DB = require('./Database');

module.exports = {
	getUserById(id){
		const query = "SELECT * FROM users WHERE id = $(_user_id)";
		return DB.accessor.query(query, { _user_id : id })
			.then((result) => {
				return result[0];
			})
			.catch((error) => {
				throw error;
			});
	},

	getAllUsers(){
		const query = "SELECT * FROM users";
		return DB.accessor.query(query)
			.then((result) => {
				return result;
			})
			.catch((error) => {
				throw error;
			});
	},

	getAllCharacters(id){
		const query = "SELECT * FROM characters WHERE user_id = $(_user_id)"
		return DB.accessor.query(query, {
				_user_id : id
			})
			.then((result) => {
				return result;
			})
			.catch((error) => {
				throw error;
			});
	},

	createUser(name, email, alliance_id){
		const query = "INSERT INTO users(name, email, alliance_id) VALUES (${_name}, ${_email}, ${_alliance_id}) RETURNING *";
		return DB.accessor.query(query, {
				_name : name,
				_email : email,
				_alliance_id : alliance_id
			})
			.then((result) => {
				return result[0];
			})
			.catch((error) => {
				throw error;
			});
	},

	deleteUserById(id){
		const query = "DELETE FROM users WHERE id = $(_user_id)";
		return DB.accessor.query(query, { _user_id : id })
			.then((result) => {
				return result;
			})
			.catch((error) => {
				throw error;
			});
	},

	updateUserById(id, name, email, alliance_id){
		const query = "UPDATE users SET name = ${_name}, email = ${_email}, alliance_id = ${_alliance_id} WHERE id = ${_user_id} RETURNING *";
		return DB.accessor.query(query, {
			_user_id : id,
			_name : name,
			_email : email,
			_alliance_id : alliance_id
		})
		.then((result) => {
				return result[0];
			})
			.catch((error) => {
				throw error;
			});
	}

};
