const fs = require('fs')

let typesString = ''

function recursiveSync(dir) {
	const dirnames = fs.readdirSync(dir)
	dirnames.forEach((_dirname) => {
		const dirname = dir + '/' + _dirname
		if (fs.statSync(dirname).isDirectory()) {
			recursiveSync(dirname)
			console.log('Done syncing ' + dirname + ' ....')
		} else if (dirname.endsWith('ctype.ts')) {
			const file = fs.readFileSync(dirname)
			typesString += '\n' + file.toString()
		}
	})
}
recursiveSync(__dirname + '/nest-server/src/modules')

fs.writeFileSync(__dirname + '/web/src/types/api/apiTypes.ts', typesString)
console.log('<<<< --- type Sync completed --- >>>>')
