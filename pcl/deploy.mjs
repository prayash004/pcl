import pkg from './compile.js'; // Import as a default object
const { abi, evm } = pkg; // Destructure to get abi and evm
const fs = require('fs');
const Web3 = require('web3');


import Web3 from 'web3';

const web3 = new Web3('http://localhost:8545');

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Deploying from account:', accounts[0]);

    try {
        const result = await new web3.eth.Contract(abi)
            .deploy({ data: evm.object })
            .send({
                from: accounts[0],
                gas: 1500000,
                gasPrice: web3.utils.toWei('20', 'gwei')
            });

        console.log('Contract deployed at address:', result.options.address);
    } catch (error) {
        console.error('Error during deployment:', error);
    }
};

deploy();
