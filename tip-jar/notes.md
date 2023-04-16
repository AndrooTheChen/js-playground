Following https://github.com/matiasfha/getting-started-fullstack-ethereum-development/blob/lesson01/README.md

- Using SvelteKit + Tailwind for frontend
- [HardHat](https://hardhat.org/) for dev environment
- Chai - assertion library for contract testing
- Ethers.js JS lib to interact with Ethereum blockchain
- hardhat-waffle plugin to work with waffle, another tool to test smart contracts i guess and
also written on top of ether.js?


- using vercel as the deployment target, so using vercel adapter [0]

also before i forget, dumping some EIP protocols that will probably be relevant [1][2][3]

so smart contracts are written with a language called Solidity [4]. i dont know if i care
about this yet, i just need to make something able to have a wallet and interact with the
eth chain, but i also have no idea what im doing so i'll just learn as i go.

in creating a smart contract apparently we need a license at the top, using GPL 3 as the 
tutotial uses.

Some solidity notes:
- `address` is a unique identifier for accounts.
- `payable` is a modifier the specify an address or function can receive Ether.

Other important parts of Solidity are the `msg` global variables:
```
msg.sender: the caller of the function address reference
msg.value: amount of wei (eth / 1e18) in a transaction
msg.data (bytes): complete calldata
msg.gas (uint): remaining gas - deprecated in version 0.4.21 and to be replaced by gasleft()
msg.sig (bytes4): first four bytes of the calldata (i.e. function identifier)
```


[0] https://kit.svelte.dev/docs/adapters
[1] https://eips.ethereum.org/EIPS/eip-1193
[2] https://eips.ethereum.org/EIPS/eip-695
[3] https://eips.ethereum.org/EIPS/eip-155
[4] https://soliditylang.org/

