module.exports = {

	setItem(key, data) {
		localStorage.setItem(key, data);
	},

	getItem(key) {
		let item = localStorage.getItem(key);
		return item;
	},

	clear() {
		localStorage.clear();
	}

};