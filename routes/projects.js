const express = require('express');
const app = express();
const router = express.Router();

router.get('/leechesfilm', (req, res, next) => { 
	let routes = __dirname;
	let sliced = routes.slice(0, routes.length-6 );
	res.sendFile(sliced + 'dist/projects/leechesfilm/about.html');
});

router.get('/leechesposter', (req, res, next) => { 
	let routes = __dirname;
	let sliced = routes.slice(0, routes.length-6 );
	res.sendFile(sliced + 'dist/projects/leechesposter/about.html');
});

router.get('/cabbitfilm', (req, res, next) => { 
	let routes = __dirname;
	let sliced = routes.slice(0, routes.length-6 );
	res.sendFile(sliced + 'dist/projects/cabbitfilm/about.html');
});

module.exports = router;