const express = require('express');
const app = express();
const router = express.Router();

router.get('/leechesfilm', (req, res, next) => { 
	let routes = __dirname;
	let sliced = routes.slice(0, routes.length-6 );
	res.sendFile(sliced + 'morgue/leechesfilm/index.html');
});
 
module.exports = router;