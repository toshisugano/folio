const express = require('express');
const app = express();
const router = express.Router();

router.get('/leechesfilm', (req, res, next) => { 
	let routes = __dirname;
	let sliced = routes.slice(0, routes.length-6 );
	res.sendFile(sliced + 'dist/morgue/leechesfilm/index.html');
});

router.get('/cabbitfilm', (req, res, next) => { 
	let routes = __dirname;
	let sliced = routes.slice(0, routes.length-6 );
	res.sendFile(sliced + 'dist/morgue/cabbitfilm/index.html');
});
 
module.exports = router;