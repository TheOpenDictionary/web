const nesting = require('tailwindcss/nesting');
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

module.exports = {
	plugins: [nesting, tailwindcss(), autoprefixer]
};
