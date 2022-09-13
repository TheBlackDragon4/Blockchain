class MiningNode {

    isMining = false;
    currentBlock;

    /**
     * 
     * @param {*} id hier entweder 0, 1 oder 2
     * @param {*} name Name der Miningnode für den Konstrukor 
     */
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.blockData = { transactions: [{ from: 'BlockReward', to: this.name, amount: 5 }] };
        renderCurrentTransactions(this.blockData.transactions);
        broadcaster.subscribe((nodeID) => {
            console.log('Nachricht empfangen:', nodeID);
            if (nodeID !== this.id) {
                this.killCurrentBlock();
            }
        });

        newTransaction.subscribe((transaction) => {
            this.blockData.transactions.push(transaction);
            renderCurrentTransactions(this.blockData.transactions);
        });
    }

    /**
     * Toggle Funktion soll das Mining anschalten oder ausschalten in Abhängigkeit der 
     * Variable isMining
     */
    toggle() {
        this.isMining = !this.isMining;
        if (this.isMining) {
            this.mine();
        } else {
            this.killCurrentBlock();
        }
    }

    /**
     * Dient dafür, den aktuellen zu Minenden Block abzubrechen
     */
    killCurrentBlock() {
        if (this.currentBlock) {
            this.currentBlock.kill = true;
        }
        this.blockData = { transactions: [{ from: 'BlockReward', to: this.name, amount: 5 }] };
    }

    /**
     * Soll anzeigen, ob die Node aktuell arbeitet oder nichts macht
     */
    async mine() {
        renderCurrentTransactions(this.blockData.transactions);
        this.currentBlock = new Block(Date.now(), this.blockData);
        await blockchain.addBlock(this.currentBlock, this.id);
        if (this.isMining) {
            this.blockData = { transactions: [{ from: 'BlockReward', to: this.name, amount: 5 }] };
            this.mine();
        }
    }
}