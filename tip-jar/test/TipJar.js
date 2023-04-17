import { expect } from 'chai';  // assertion library
import pkg from 'hardhat';
const { ethers } = pkg; 
import { providers } from 'ethers';

describe('TipJar', function() {
    // describe the main test
    let contract;

    // Deploy the contract once for every test case.
    this.beforeAll(async function() {
        // Create an abstraction of the contract used to deploy the TipJar
        const contractFactory = await ethers.getContractFactory('TipJar');

        // Start the deploy process, resolves to a Contract object.
        contract = await contractFactory.deploy();
        await contract.deployed();
    });
    it('Should deploy the contract and return 0 as total tips', async function() {
        // Retrieve the total number of tips and validate it is equal to zero.
        expect(await contract.getTotalTips()).to.equal(0);
    });

    it('Should allow a user to send a tip and increase the total number of tips', async () => {
        // Create the owner and sender accounts.
        const [owner, sender] = await ethers.getSigners();

        const ownerBalance = await owner.getBalance();
        const senderBalance = await sender.getBalance();

        // Perform the `sendTip` transaction.
        // The message and the name are passed as arguments while the value is passed
        // as an object. This object is then used to specify the value of the transaction.
        // and is interactable as the global `msg` variable.
        const tx = await contract
                    .connect(sender)
                    .sendTip(
                        'Message content', 
                        'Sender name', 
                        { value: ethers.utils.parseEther('0.001') });
        await tx.wait();

        const newOwnerBalance = await owner.getBalance();
        const newSenderBalance = await sender.getBalance();

        expect(newOwnerBalance).to.be.above(ownerBalance); // ensure owner now has a greater balance
        expect(newSenderBalance).to.be.below(senderBalance); // ensure sender now has a lower balance
        expect(await contract.getTotalTips()).to.equal(1); // ensure total tips is now 1
    });

    it('Should return all the tips', async function() {
        // Create the owner and sender accounts, ignoring the first one.
        const [, sender] = await ethers.getSigners();
        const msg = 'second message';
        const name = 'second sender';
        const amount = ethers.utils.parseEther('0.002');

        // Perform the transaction
        const  tx = await contract
                    .connect(sender)
                    .sendTip(
                        msg,
                        name,
                        { value: amount });
        await tx.wait();

        const tips = await contract.getAllTips();

        // Since this test ran in the same contract instance as before, the total number of tips
        // should be 2.
        expect(await contract.getTotalTips()).to.equal(2);
        
        // The `tips` array that stores all tips should also have length of two.
        expect(tips.length).to.equal(2);

        // Validate the second tip has the following properties:
        // - message: 'second message'
        // - sender: 'second sender'
        // - amount: 0.002 ether
        expect(tips[1].message).to.equal(msg);
        expect(tips[1].name).to.equal(name);
        expect(tips[1].amount).to.equal(amount)
    });

    it('Should fail to send ETH if the account has insufficient funds', async function() {
        // Create the owner and sender accounts, ignore the first one.
        const [, sender] = await ethers.getSigners();
        const amount = ethers.utils.parseEther('9999');

        // Perform the transaction. Note: we don't await this transaction, otherwise it will
        // fail and the `expect` statement below will just be the error statement.
        const tx = contract.connect(sender).sendTip('message', 'name', { value: amount });

        // Validate the transaction was reverted.
        await expect(tx).to.be.reverted;
    });

    // Deprecated, from earlier lesson, really brittle test.
    // it('Should deploy the contract and return 0 as total tips', async () => {
    //     const contractFactory = await ethers.getContractFactory('TipJar');
    //     contract = await contractFactory.deploy();
    //     await contract.deployed();
    //     expect(await contract.totalTips()).to.equal(0);
    // });
});
