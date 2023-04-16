import { expect } from 'chai';
import pkg from 'hardhat';
const { ethers } = pkg;

describe('TipJar', () => {
    let contract;

    it('Should deploy the contract and return 0 as total tips', async () => {
        const contractFactory = await ethers.getContractFactory('TipJar');
        contract = await contractFactory.deploy();
        await contract.deployed();
        expect(await contract.totalTips()).to.equal(0);
    });
});
