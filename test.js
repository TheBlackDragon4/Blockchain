const { Block } = require('./block.class');
const { Blockchain } = require('./blockchain.class');

console.log('Createing blockchain');
let aChain = new Blockchain();

mine();

function mine() {
    console.log('------- Stating to mine a new block -------')
    let block = new Block(Date.now(), {'Black' : 100, 'Dragon': 50 }, );
    block.mine();
    aChain.addBlock(block);
    console.log(aChain.chain);
    mine(); // Rekursiver Aufruf der Funktion "mine()"
}

// let block2 = new Block(Date.now(), {'Black' : 80, 'Dragon': 70 }, );

// aChain.addBlock(block2);

// block1.data = {'Black' : 180, 'Dragon': 50 };


// console.log('Is Blockchain valid?' ,  aChain.isValid());
// console.log('Neuer Hash von block 1' , block1.createHash());
