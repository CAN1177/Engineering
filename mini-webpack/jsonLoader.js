export function jsonLoader(source) {
	console.log("%c Line:2 🍣 source", "color:#93c0a4", source);
	this.addDeps('jsonLoader')
	return `export default ${JSON.stringify(source)}`
}