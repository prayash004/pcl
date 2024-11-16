import { resolve } from 'path';
import { readFileSync } from 'fs';
import { compile } from 'solc';

// Read the Solidity contract file
const contractPath = resolve(__dirname, 'Voting.sol');
const source = readFileSync(contractPath, 'utf8');

// Set up input format for Solidity compiler
const input = {
    language: 'Solidity',
    sources: {
        'Voting.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['abi', 'evm.bytecode'],
            },
        },
    },
};

// Compile the contract
const output = JSON.parse(compile(JSON.stringify(input)));

// Handle compilation errors
if (output.errors) {
    output.errors.forEach(err => {
        console.error(err.formattedMessage);
    });
} else {
    const contract = output.contracts['Voting.sol'].Voting;

    // Display ABI and Bytecode
    console.log('ABI:', JSON.stringify(contract.abi, null, 2));
    console.log('Bytecode:', contract.evm.bytecode.object);

    // Export ABI and Bytecode
    module.exports = {
        abi: contract.abi,
        evm: { object: contract.evm.bytecode.object },
    };
}
