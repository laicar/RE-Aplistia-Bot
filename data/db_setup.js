exports.run = (client) => {
    client.sql.pragma("synchronous = 1");
    client.sql.pragma("journal_mode = wal");
    const tableInfo = {
        name: "move_type",
        columns: ["move_type_name", "move_points", "difficult_terrain_cost"],
        columnTypes: ["TEXT PRIMARY KEY", "NUMERIC", "NUMERIC"],
        values: [['Armored', 3, 2], ['Infantry', 4, 2], ['Flier', 4, 1], ['Cavalry', 5, 3]]
    };
    //client.sql.prepare(`DROP TABLE ${tableInfo.name}`).run();
    setupTable(client, tableInfo);
    readTable(client, tableInfo.name);
}

function readTable(client, tableName) {
    const data = client.sql.prepare(`SELECT * FROM ${tableName};`).all();
    console.log(data);
}

function setupTable(client, tableInfo) {
    const verifyTable = client.sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = ?;");
    let table = verifyTable.get(tableInfo.name);
    if (!table['count(*)']) {
        console.log(`Table doesn't exist`);
        client.sql.prepare(buildCreateStatement(tableInfo)).run();//create table
        client.sql.prepare(buildInsertStatement(tableInfo)).run();//populate table
    } else {
        console.log(`Table exists`);
    }
}

function buildCreateStatement(tableInfo) {
    let statement = `CREATE TABLE ${tableInfo.name} (${tableInfo.columns[0]} ${tableInfo.columnTypes[0]}`;
    for (let i = 1; i < tableInfo.columns.length; i++) {
        statement += `, ${tableInfo.columns[i]} ${tableInfo.columnTypes[i]}`;
    }
    statement += ');';
    return statement;
}

function buildInsertStatement(tableInfo) {
    let values = `('${tableInfo.values[0].join('\',\'')}')`;
    for (let i = 1; i < tableInfo.values.length; i++) {
        values += `,('${tableInfo.values[i].join('\',\'')}')`;
    }
    const statement = `INSERT OR REPLACE INTO ${tableInfo.name} (${tableInfo.columns.join()}) VALUES ${values};`;
    console.log(statement);
    return statement;
}