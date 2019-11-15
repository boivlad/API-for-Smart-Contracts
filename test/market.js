const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const apiurl = 'http://localhost:3000/api/v1';
chai.use(chaiHttp);
describe('#Post requests', async () => {
	describe('Create Projects', async () => {
		it('Try create project was created "TestProject"', async () => {
			const project = {
				"name": "TestProject",
				"description": "Some description about TestProject",
				"price": "9000000000000000",
				"shares": 200
			};
			const res = await chai.request(apiurl)
				.post('/create')
				.send(project);
			expect(res).to.have.status(200);
			expect(res.body).to.be.an('object');
			expect(res.body).to.have.property('message');
		});
	});
});
describe('#Get requests', async () => {
	describe('Get Project description ', async () => {
		it('Get a description of the "First" project', async () => {
			let res = await chai.request(apiurl)
				.get('/First/description');

			expect(res).to.have.status(200);
			expect(res.body).to.be.an('object');
			expect(res.body).to.have.property('Description');
		})
		it('Get a description of the "Second" project', async () => {
			let res = await chai.request(apiurl)
				.get('/Second/description');

			expect(res).to.have.status(200);
			expect(res.body).to.be.an('object');
			expect(res.body).to.have.property('Description');
		})
	});
	describe('Get Project price ', async () => {
		it('Get a price of the "First" project', async () => {
			let res = await chai.request(apiurl)
				.get('/First/price');

			expect(res).to.have.status(200);
			expect(res.body).to.be.an('object');
			expect(res.body).to.have.property('Price', '9000000000000000');
		})
		it('Get a price of the "Second" project', async () => {
			let res = await chai.request(apiurl)
				.get('/Second/price');

			expect(res).to.have.status(200);
			expect(res.body).to.be.an('object');
			expect(res.body).to.have.property('Price', '9000000000000000');
		})
	});
	describe('Get Project address ', async () => {
		it('Get a address of the "First" project', async () => {
			let res = await chai.request(apiurl)
				.get('/First/address');

			expect(res).to.have.status(200);
			expect(res.body).to.be.an('object');
			expect(res.body).to.have.property('Address', '0xC953Ab7713225ebd62912053964DE234C5C46E7C');
		})
		it('Get a address of the "Second" project', async () => {
			let res = await chai.request(apiurl)
				.get('/Second/address');

			expect(res).to.have.status(200);
			expect(res.body).to.be.an('object');
			expect(res.body).to.have.property('Address', '0x3784Ea0B74fD814B3840Ec2b1bEf5ABB82a67996');
		})
	});
	describe('Get Project owner ', async () => {
		it('Get a owner of the "First" project', async () => {
			let res = await chai.request(apiurl)
				.get('/First/owner');

			expect(res).to.have.status(200);
			expect(res.body).to.be.an('object');
			expect(res.body).to.have.property('Owner', '0x7e4590e6A98407f394C53B7c3D96c8f63A506f61');
		})
		it('Get a owner of the "Second" project', async () => {
			let res = await chai.request(apiurl)
				.get('/Second/owner');

			expect(res).to.have.status(200);
			expect(res.body).to.be.an('object');
			expect(res.body).to.have.property('Owner', '0x7e4590e6A98407f394C53B7c3D96c8f63A506f61');
		})
	});
	describe('Get Project shares ', async () => {
		it('Get available shares of the "First" project', async () => {
			let res = await chai.request(apiurl)
				.get('/First/shares');

			expect(res).to.have.status(200);
			expect(res.body).to.be.an('object');
			expect(res.body).to.have.property('Available shares', '100');
		})
		it('Get available shares of the "Second" project', async () => {
			let res = await chai.request(apiurl)
				.get('/Second/shares');

			expect(res).to.have.status(200);
			expect(res.body).to.be.an('object');
			expect(res.body).to.have.property('Available shares', '500');
		})
	});
});