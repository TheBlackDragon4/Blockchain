class Broadcaster {
    constructor() {
        this.functions = [];
    }

    /**
     * Jede Node kann eine neue Funktion registrieren
     * 
     * @param {*} fun Übermittlung der aktuellen Funktion
     */
    subscribe(fun) {
        this.functions.push(fun);
    }

    /**
     * Ruft alle Funktionen auf, die von außen registriert wurden.
     * 
     * @param {*} message 
     */
    notify(message) {
        this.functions.forEach(fun => fun(message));
    }
}

let broadcaster = new Broadcaster();
let newTransaction = new Broadcaster();