module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{js,html,json,webmanifest,md,mp3,png,css,ts,code-workspace}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};