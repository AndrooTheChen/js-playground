// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.18; // same as hardhat.config.js

import 'hardhat/console.sol'; // allows us to do console.log

contract TipJar {
    uint256 public totalTips; // int public var

    address payable owner; // identify owner (address) of the contract

    /* store the "Tip" data in a structure. */
    struct Tip {
        address sender;     // address of the sender
        string message;     // message from the sender
        string name;        // name of the sender
        uint256 timestamp;  // when the tip was sent.
        uint256 amount;     // amount of ether tipped to you
    }

    Tip[] tips;

    constructor() {
        owner = payable(msg.sender); // set the owner to the person who deployed the contract
    }

    /* 
     * send a tip to the owner of the contract. note that we declare this as a
     * view since reads from the block chain do not consume gas
     */
    function getTotalTips() public view returns(uint256) {
        return totalTips;
    }

    function sendTip(string memory _message, string memory _name) public payable {
        require(msg.sender.balance >= msg.value, "You do not have enough funds"); // check if the sender has enough funds
        (bool success, ) = owner.call{value: msg.value}(""); // send the amount of eth specified in msg.value and set gas limits 2000 units (somehow?)
        require(success, "Transfer failed"); // check if the transfer was successful, if not, throw an error
        totalTips += 1; // increment the counter for the number of tips
        tips.push(Tip(msg.sender, _message, _name, block.timestamp, msg.value)); // store the tip
    }

    /*
     * give access to all stored Tips -- read from blockchain with `view`.
     */
    function getAllTips() public view returns(Tip[] memory) {
        return tips;
    }
}

