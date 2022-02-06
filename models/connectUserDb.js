const mysql = require('mysql2');

const verify_user = (email) => {
    // Promesa de la conexión a base de datos y la query de sql
    return new Promise((resolve,reject)=>{
        let connection = mysql.createConnection({
            host: 'localhost',
            user: 'EDIT_CRYPTO_USER',
            password: '123',
            database: 'CryptoUNAL'
        });
        
        connection.query( `call retrieve_user_data("${email}")`, ( err, rows ) => {
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

const verify_email = (email) => {
    return new Promise((resolve,reject) => {
        let connection = mysql.createConnection({
            host: 'localhost',
            user: 'EDIT_CRYPTO_USER',
            password: '123',
            database: 'CryptoUNAL'
        });
        
        connection.query( `call retrieve_user_data("${email}")`, ( err, rows ) => {
            if ( err ){
                connection.end();
                reject( err );
            }
            else{
                connection.end();
                resolve( rows );
            }
        });
    }).then((rows) => rows).catch((err) => console.log(err));    
};

const add_user_db = (name, email, password) => {
    return new Promise((resolve,reject) => {
        let connection = mysql.createConnection({
            host: 'localhost',
            user: 'EDIT_CRYPTO_USER',
            password: '123',
            database: 'CryptoUNAL'
        });  
        
        connection.query( `call register_user("${name}", "${email}", "${password}")`, ( err, rows ) => {
            if ( err ){
                connection.end();
                reject( err );
            }
            else{
                connection.end();
                resolve( rows );
            }
        });
    }).then((rows) => rows).catch((err) => console.log(err));    
};

const update_email = (iduser, newemail) => {
    return new Promise((resolve, reject) => {
        let connection = mysql.createConnection({
            host: 'localhost',
            user: 'EDIT_CRYPTO_USER',
            password: '123',
            database: 'CryptoUNAL'
        });

        connection.query(`call update_email("${iduser}", "${newemail}")`, (err, rows) => {
            if (err) {
                connection.end();
                reject(err);
            }
            else {
                connection.end();
                resolve(rows);
            }
        });
    }).then((rows) => rows).catch((err) => console.log(err));
};

const update_username = (iduser, newusername) => {
    return new Promise((resolve, reject) => {
        let connection = mysql.createConnection({
            host: 'localhost',
            user: 'EDIT_CRYPTO_USER',
            password: '123',
            database: 'CryptoUNAL'
        });

        connection.query(`call update_username("${iduser}", "${newusername}")`, (err, rows) => {
            if (err) {
                connection.end();
                reject(err);
            }
            else {
                connection.end();
                resolve(rows);
            }
        });
    }).then((rows) => rows).catch((err) => console.log(err));
};

module.exports = { verify_user, verify_email, add_user_db, update_email, update_username};