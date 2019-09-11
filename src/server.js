import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

const cors = require('cors')({ origin:true });
const { json } = require('body-parser');
const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV !== 'production';

polka() // You can also use Express
	.use(
		json(),
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		cors,
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
