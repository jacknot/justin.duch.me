import scanPosts from './_posts.js';

export function get(req, res) {
	scanPosts().then(posts => {
		const contents = JSON.stringify(posts.map(post => {
			return {
				title: post.title,
				slug: post.slug,
				date: post.date,
				thumbnail: post.thumbnail,
			};
		}));

		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(contents);
	});
}
