module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{js,html,webmanifest,md,mp3,png,css,ts,json}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};