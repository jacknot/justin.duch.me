// Route to get a random quote from any article
import scanPosts from './../article/_posts.js';

export function get(req, res) {
	let quotes = [];

	scanPosts().then(posts => {
		posts.forEach(post => {
			// Regex to match all p tags
			let texts = post.html.match(/<p>(.*?)<\/p>/g).map(
				// Remove <p> tags but keep other tags inside
				// E.g '<p><a>hello</a></p>' -> '<a>hello</a>'
				r => r.replace(/^<[^>]+>|<\/[^>]+>$/gm, '')
			);

			texts.forEach(text => {
				quotes = quotes.concat({
					title: post.title,
					post: post.slug,
					quote: text,
				});
			});
		});

		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		let quote = quotes[Math.floor((Math.random() * quotes.length))];

		res.end(JSON.stringify(quote));
	});
}
