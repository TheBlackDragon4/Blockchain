let node0 = new MiningNode(0, 'BlackDragon');
let node1 = new MiningNode(1, 'Jessica');
let blockchain = new Blockchain(); // Instanz der Klasse Blockchain erstellt -> Von überall darauf zugreifbar
let CHART_DATA = {
    amounts: [0, 0, 0, 0, 0, 0],
    labels: ['', '', '', '', '', '']
}; // Ausgelagert in externes Objekt

/**
 * Wenn auf einen der Button geklickt wurde, dann wird
 * bei der jeweiligen Funktion diese Toggle Funktion aufgerufen
 * n0.classList.toggle('pause-btn'); // Toggle ändert immer das Symbol
 */
function startNode0() {
    log('Toggle Node 0');
    n0.classList.toggle('pause-btn');
    node0.toggle();
}

function startNode1() {
    log('Toggle Node 1');
    n1.classList.toggle('pause-btn');
    node1.toggle();
}

/**
 * Mit + kann man in eine Zahl umwandeln
 */
function sendMoney() {
    console.log(from.value, to.value, amount.value);
    newTransaction.notify({
        from: from.value,
        to: to.value,
        amount: +amount.value
    });
}

/**
 *  *.slice nimmt in diesem Fall die beiden hinteren beiden Zahlen
 * Beispiel 0+5 wird zu 05 *.slice(-2) sorgt dafür, dass 05 genutzt wird
 * 
 * @param {*} text Übergabetext für diverse Textausgabe
 */
function log(text) {
    let hours = ('0' + new Date().getHours()).slice(-2);
    let minutes = ('0' + new Date().getMinutes()).slice(-2);
    logs.innerHTML += `<div class="mb-16">
    <code>
    <i>${hours}:${minutes}</i> ${text}
</code></div>`;
}

/**
 * Funktion dient zur Aktualisierung der Daten im Graph
 * 
 * @param {*} moneyTable Tabelle aller Beträge
 */
function updateGraphData(moneyTable) {
    moneyTable.forEach((entry, index) => {
        CHART_DATA.amounts[index] = entry.amount;
        CHART_DATA.labels[index] = entry.name;
    });
    myChart.update();
}

/**
 * Anzeige aktueller Transaktionen auf Webseite 
 * 
 * @param {*} transactions Alle bisher durchgeführten Transaktionen
 */
function renderCurrentTransactions(transactions) {
    transactionContainer.innerHTML = '<h2>Transaktionen</h2>';
    transactions.forEach(ta => {
        transactionContainer.innerHTML +=
            `<div class="card mb-16">${ta.from} ➔ ${ta.to} $${ta.amount}</div>`;
    });

}