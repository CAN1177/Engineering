module.exports = obj => {
	console.log(obj);
	let dom = ''
	dom += '<h1>' + obj + '</h1>'

	return `module.exports = '${dom}'`
};