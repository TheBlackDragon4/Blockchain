class Blockchain {

    constructor() {
        this.chain = []; //Leeres Array für Blöcke
    }

    /**
     * Hier wird ein neuer Block an die Blockchain angehängt
     * Object.freeze = Objekt, also Block kann nicht mehr bearbeitet werden
     * getLastBlock().createHash() = Generiert den Hash des letzten Blocks
     *  
     * @param {*} block Akteller Block für Bearbeitung
     */    
    addBlock(block){
        block.lastHash = this.getLastBlock().createHash();
        this.chain.push(Object.freeze(block));
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
        // Wird jedes mal erneut aufgerufen
        let invalidBlock = this.chain.find( (currBlock, i) => {
            let prevBlock = this.chain[i - 1];
            return prevBlock && prevBlock.createHash() != currBlock.lastHash;
        });

        if(invalidBlock) {
            return false;
        } else {
            return true;
        }

    }

    getLastBlock() {
        // Von allen Blöcken in unserer Blockchain gibt uns bitte den letzten Block aus
        return this.chain[this.chain.length - 1];
    }



}

// exports.Blockchain = Blockchain;