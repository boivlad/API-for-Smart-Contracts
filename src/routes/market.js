import express from "express";
import { market } from '../models/market';
import { config } from "../config";

const router = express.Router();
router.post('/create', async (req, res) => {
	const {
		name,
		description,
		price,
		shares,
	} = req.body;
	await market.methods.createProject(name, description, price, shares).send({ 
		from: config.ropsten.walletAddress
	}, 
	(error, transactionHash) => {
		res.end(JSON.stringify({"Token": name, "Hash": transactionHash}));
	});
});

router.get('/:name/address', async (req, res) => {
	const result = await market.methods.getProjectAddress(req.params.name);
	res.json(result);
});
router.get('/:name/price', async (req, res) => {
	const result = await market.methods.getPrice("First");
	res.json(result);
});
router.get('/test', async (req, res) => {
	const result = await market.methods.checkContract().call();
	res.json(result);
});
// console.dir(market.address);
export default router;