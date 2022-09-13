class Block {

   /**
    * Konstruktur für die Erstellung eines neuen Blocks
    *
    * @param {*} time Gibt aktuelle Zeit in Millisekunden die seit 01.01.1970 vergangen ist
    * @param {*} data Mitgelieferte Daten
    * @param {*} lastHash Fingerabdruck vom vorhergehenden Block
    * @param {*} nonce Zusätzliche Variable die innerhalb vom Block beinhaltet ist
    * @param {*} difficulty schnell bei einer '0' -> Je mehr '0er' desto länger das Mining
    * @param {*} kill Soll aktuellen zu Minenden Block abbrechen
    */
    constructor(time = Date.now(), data = {}) {
        this.time = time;
        this.data = data;
        this.lastHash = '';
        this.nonce = 0;
        this.difficulty = '00';
        this.kill = false;
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
    * Soll nicht mehr in Schleife sondern als Intervall durchgeführt werden
    * Bei *, 1000) wird der Block einmal pro Sekunde ausgeführt
    * Bei *, 1000 / 2) wird der Block alle halbe Sekunde ausgeführt
    *
    * @returns Promise = Funktion die Abgebrochen werden kann
    */
    mine() {
        let hash = this.createHash();
        return new Promise((resolve, reject) => {
            let i = setInterval(() => {
                if (this.kill) {
                    clearInterval(i);
                    reject();
                } else if (hash.startsWith(this.difficulty)) {
                    clearInterval(i);
                    this.resolveTransactions();
                    resolve();
                } else {
                    this.nonce++;
                    hash = this.createHash();
                }
            }, 1000 / 30);
        });
    }

    /**
     * Ausführung wenn mining von Block erfüllt wurde -> Somit Reward / Belohnungen
     */
    resolveTransactions() {
        let transactions = this.data.transactions;
        transactions.forEach(transaction => {
            this.addMoney(transaction.from, transaction.to, transaction.amount);
        });
    }

    /**
     * Hinzufügen der Menge an Belohnungen / Rewards
     * 
     * @param {*} receiver Empfängername / Adresse
     * @param {*} amount Höhe der Belohnungen -> In diesem Fall 5 Münzen
     */
    addMoney(sender, receiver, amount) {
        let moneyTable = this.data.moneyTable || [];
        let entry = moneyTable.find(e => e.name == receiver);
        if (!entry) {
            entry = { name: receiver, amount: 0 };
            moneyTable.push(entry);
        }

        if (sender != 'BlockReward') {
            let entrySender = moneyTable.find(e => e.name == sender);
            if (!entrySender) {
                entrySender = { name: receiver, amount: 0 };
                moneyTable.push(entrySender);
            }
            entrySender.amount -= amount;
        }

        entry.amount += amount;
        console.log('UPDATED TABLE', moneyTable);
        this.data.moneyTable = moneyTable;
        updateGraphData(moneyTable);
    }

    /**
     * hash = Speicherung des errechneten Hash aus "createHash()"
     * Hier würde das Mining dauerhaft durchgeführt werden -> Wegen der While-Schleife
     * Nonce wird solange durchgeführt bis Hash mit '00' startet
     */
    mineOld() {
        let hash = this.createHash();
        while (!hash.statsWith(this.difficulty)) {
            this.nonce++;
            hash = this.createHash();
        }
    }
}