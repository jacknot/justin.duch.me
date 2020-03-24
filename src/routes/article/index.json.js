import scanPosts from './_posts.js';

export function get(req, res) {
	scanPosts().then(posts => {
		posts = posts.sort(function(a, b){
			return new Date(b.date) - new Date(a.date);
		});

		const data = JSON.stringify(
			posts.map(post => {
				return {
					title: post.title,
					slug: post.slug,
					date: post.date,
					thumbnail: post.thumbnail,
					category: post.category,
					readtime: post.readtime,
				};
			})
		);

		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(data);
	});
}
