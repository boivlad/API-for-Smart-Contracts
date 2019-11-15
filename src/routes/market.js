import express from 'express';
import { market, getProject } from '../models';
import { config } from '../config';

const router = express.Router();

router.post('/create', async (req, res) => {
	const {
		name,
		description,
		price,
		shares,
	} = req.body;
	try{
		let result = await market.methods.createProject(name, description, price, shares).send( { 
			from: config.ropsten.walletAddress,
		});
		res.json({ 'Token': name, 'Hash': result.transactionHash });
	}catch(err){
		res.json({ message: 'Transaction Error' });
	}
	
	
});

router.get('/:name/address', async (req, res) => {
	let result = await market.methods.getProjectAddress(req.params.name).call();
	res.json({ Address: result });
});

router.get('/:name/description', async (req, res) => {
	let result = await market.methods.getProjectDescription(req.params.name).call();
	res.json({ Description: result });
});

router.get('/:name/price', async (req, res) => {
	const result = await market.methods.getPrice(req.params.name).call();
	res.json({ Price: result });
});

router.get('/:name/owner', async (req, res) => {
	const result = await market.methods.getProjectOwner(req.params.name).call();
	res.json({ Owner: result });
});

router.get('/:name/shares', async (req, res) => {
	const result = await market.methods.getSharesCount(req.params.name).call();
	res.json({ 'Available shares': result });
});

router.get('/:name/myshares', async (req, res) => {
	const result = await market.methods.getSharesClientCount(req.params.name, config.ropsten.walletAddress).call();
	res.json({ 'My shares': result });
});

router.post('/buy', async (req, res) => {
	const { name, amount } = req.body;
	const price = await market.methods.getPrice(name).call();

	const result = await market.methods.buyShares(name, amount).send({
		from: config.ropsten.walletAddress,
		value: price * amount,
		gasLimit: 100000
	});

	res.json(result);
});

router.post('/sell', async (req, res) => {
	const { name,	amount } = req.body;
	const address = await market.methods.getProjectAddress(name).call();

	const project = getProject(address);
	await project.methods.approve(market.options.address, amount).send({
		from: config.ropsten.walletAddress
	});

	const result = await market.methods.sellShares(name, amount).send({
		from: config.ropsten.walletAddress,
			gasLimit: 100000
	});

	res.json(result);
});

export default router;