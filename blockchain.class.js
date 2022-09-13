class Blockchain {
    /**
     *  Leeres Array für Blöcke
     */
    constructor() {
        this.chain = [];
    }

    /**
     * Hier wird ein neuer Block an die Blockchain angehängt
     * Object.freeze = Objekt, also Block kann nicht mehr bearbeitet werden
     * getLastBlock().createHash() = Generiert den Hash des letzten Blocks
     *  
     * @param {*} block Akteller Block für Bearbeitung
     */  
    async addBlock(block, nodeID) {
        let lb = this.getLastBlock();
        block.data.moneyTable = lb ? lb.data.moneyTable : [];
        block.lastHash = lb ? lb.createHash() : '';
        try {
            await block.mine();
            broadcaster.notify(nodeID);
            this.chain.push(Object.freeze(block));
            log(`Node ${nodeID} hat den Block gefunden! (${this.chain.length} Blocks insgesamt)`);
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * currBlock = Aktueller Block
     * i = Index der Blöcke im Array "chain" (Durchlaufzahl)
     * prevBlock = Vorhergehender Block
     * invalidBlock = Ungültiger Block
     * invalidBlock == true     -> Block hat Gültigkeit
     * invalidBlock == false    -> Block hat keine Gültigkeit
     * 
     * @return Prüft ob der Block manipuliert wurde 
     */
    isValid() {
        let invalidBlock = this.chain.find((currBlock, i) => {
            let prevBlock = this.chain[i - 1];
            return prevBlock && prevBlock.createHash() != currBlock.lastHash;
        });
        if (invalidBlock) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Von allen Blöcken in unserer Blockchain gibt uns bitte den letzten Block aus
     * 
     * @returns Gibt Letzten Block zurück
     */
    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }
}