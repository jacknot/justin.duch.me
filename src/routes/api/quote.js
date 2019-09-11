// Route to get a random quote from any article
import scanPosts from './../article/_posts.js';

export function get(req, res) {
	let tags = [];

	scanPosts().then(posts => {
		posts.forEach(post => {
			tags = tags.concat(
				// Regex to match all p tags
				post.html.match(/<p>(.*?)<\/p>/g).map(
					// Remove <p> tags but keep other tags inside
					// E.g '<p><a>hello</a></p>' -> '<a>hello</a>'
					r => r.replace(/^<[^>]+>|<\/[^>]+>$/gm, '')
				)
			);
		});

		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		let quote = tags[Math.floor((Math.random() * tags.length))];

		res.end(JSON.stringify({quote: quote}));
	});
}
