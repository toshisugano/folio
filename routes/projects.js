const express = require('express');
const app = express();
const router = express.Router();

router.get('/leechesfilm', (req, res, next) => { 
	let routes = __dirname;
	let sliced = routes.slice(0, routes.length-6 );
	res.sendFile(sliced + 'projects/leechesfilm/index.html');
});

router.get('/leechesposter', (req, res, next) => { 
	let routes = __dirname;
	let sliced = routes.slice(0, routes.length-6 );
	res.sendFile(sliced + 'projects/leechesposter/about.html');
});

module.exports = router;