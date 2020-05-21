// Route to get a random quote from any article
import { getPosts } from './../article/_posts.js';

export function get(_, res) {
	let posts = getPosts();

	// Get random post first
	let post = posts[Math.floor((Math.random() * posts.length))];
	let quotes = post.html.match(/<p>(.*?)<\/p>/g).map(
		// Remove <p> tags but keep other tags inside
		// E.g '<p><a>hello</a></p>' -> '<a>hello</a>'
		r => r.replace(/^<[^>]+>|<\/[^>]+>$/gm, '')
	);

	let quote = quotes[Math.floor((Math.random() * quotes.length))];

	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(JSON.stringify({
		title: post.title,
		post: post.slug,
		quote
	}));
}
