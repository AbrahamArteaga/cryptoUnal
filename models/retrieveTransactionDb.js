const mysql = require('mysql2');

const get_transaction = (id) => {
    return new Promise((resolve,reject)=>{
        let connection = mysql.createConnection({
            host: 'localhost',
            user: 'EDIT_CRYPTO_USER',
            password: '123',
            database: 'CryptoUNAL'
        });       

        query = `CALL get_user_transaction (${id});`

        connection.query( query, ( err, rows ) => {
            if ( err ){
                connection.end();
                reject( err );
            }
            else{
                connection.end();
                resolve( rows );
            }
        });
    }).then(rows => rows).catch((err) => console.log(err));
}

const update_transaction = (id, transaction_content) => {
    // Promesa de la conexión a base de datos y la query de sql
    return new Promise((resolve,reject)=>{
        let connection = mysql.createConnection({
            host: 'localhost',
            user: 'EDIT_CRYPTO_USER',
            password: '123',
            database: 'CryptoUNAL'
        });
        
        transactions = JSON.stringify({content : transaction_content});

        query = `CALL update_user_transactions (${id}, '${transactions}');`

        connection.query( query, ( err, rows ) => {
            if ( err ){
                connection.end();
                reject( err );
            }
            else{
                connection.end();
                resolve( rows );
            }
        });
    }).then(rows => rows).catch((err) => console.log(err));
};

module.exports = {update_transaction, get_transaction};