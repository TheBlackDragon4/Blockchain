// const { sha256 } = require('./sha256');

class Block {

    /**
     * Konstruktur für die Erstellung eines neuen Blocks
     * 
     * @param {*} time Gibt aktuelle Zeit in Millisekunden die seit 01.01.1970 vergangen ist
     * @param {*} data Mitgelieferte Daten
     * @param {*} nonce Zusätzliche Variable die innerhalb vom Block beinhaltet ist
     * @param {*} difficulty schnell bei einer '0' -> Je mehr '0er' desto länger das Mining
     */
    constructor (time = Date.now(), data = {}){
        this.time = time;
        this.data = data;
        this.lastHash = ''; // Fingerabdruck vom vorhergehenden Block
        this.nonce = 0;
        this.difficulty = '0000' // Index Difficulty
    }

    /**
     * Sobald sich eine Variable ändert, ändert sich der gesamte Block
     * JSON.stringify = Umwandung des Outputs in einen Text
     * @return Hash des aktuellen Blocks
     */
    createHash() {
        return sha256(this.nonce + this.lastHash + this.time + JSON.stringify(this.data));
    }

    /**
     * hash = Speicherung des errechneten Hash aus "createHash()"
     */
    mine() {
        let hash = this.createHash();
        while(!hash.startsWith(this.difficulty)){ 
            this.nonce++; // Solange durchgeführt bis Hash mit '00' startet
            hash = this.createHash();
        }

    }

}

// exports.Block = Block;