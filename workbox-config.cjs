module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{js,html,webmanifest,mp3,png,css}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};