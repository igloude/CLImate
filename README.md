# weatherNode
Simple Node.js CLI weather app. Uses the [forecast](forecast.io) API and [cities](npmjs.com/package/cities) package.

This is just an excuse to learn and play with Node.js - I don't *actually* think a CLI weather app is a breakthrough idea.

## dependencies
First, make sure you've got Node.js set up correctly:
```
npm -v
```
If you don't have node, head over [here](nodejs.org).

Next, install the cities package via npm: 
```
npm install cities
```
This step isn't necessary, but makes it much more convenient. Head to your .bash_profile (or .bashrc, or .profile - whichever you prefer), and add:
```
alias weather='node ~/absolute/path/to/local/repo/app.js '
```
Yes, the space at the end is intentional. weatherNode currently takes a single input - the desired zip code.

And finally, you can figure out what the weather is!
```
weather <zipcode>
```
*(if you don't want to use the alias, just run app.js via node)*
