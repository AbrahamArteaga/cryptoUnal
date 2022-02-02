const axios = require('axios');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);


const {createEthereumWallet} = require('../utils/createWallet');
const {decrypt_wallet} = require('../utils/decrypt_wallet');
const {consultBalance} = require('../utils/getBalance');
const {getHistorial} = require('../utils/getHistorial');

// describe('La creacion de la cartera', (done)=> {
    
//     it("Debe requerir una cadena de longitud superior a 7", (done) => {
//         createEthereumWallet("contrasenhalarga").then(result => {
//             expect(result).to.be.a("Array"); 
//             done();           
//         }).
//         catch(done);
//     });

//     it("No puede tener una contraseña vacia", (done) => {
//         createEthereumWallet().then(result => {
//             expect(result).to.be.false; 
//             done();           
//         }).
//         catch(done);
//     });    

//     it("No acepta numeros", (done) => {
//         createEthereumWallet(2).then(result => {
//             expect(result).to.be.false; 
//             done();           
//         }).
//         catch(done);
//     });    

//     it("No acepta arreglos", (done) => {
//         createEthereumWallet([]).then(result => {
//             expect(result).to.be.false; 
//             done();           
//         }).
//         catch(done);
//     });    

//     it("No acepta objetos", (done) => {
//         createEthereumWallet({}).then(result => {
//             expect(result).to.be.false; 
//             done();           
//         }).
//         catch(done);
//     });    

// });

describe('La desencriptación de la cartera', (done)=> {
    
    it("Debe recibir una cartera encriptada y en formato JSON", (done) => {
        decrypt_wallet({"id": "9541845a-d32b-4b3f-b289-d180e1aaa8eb", "crypto": {"kdf": "scrypt", "mac": "ca7af3e12cb42d824e127bfd15ab95d5e0fad415cd75c7f6715d27804ac85127", "cipher": "aes-128-ctr", "kdfparams": {"n": 8192, "p": 1, "r": 8, "salt": "19616e08e1f3cf2ab52534817f289575acc99aa33df46c4e9542c2e7a194d1c5", "dklen": 32}, "ciphertext": "7579fee797e80dee67f1723fc22266c428c8cdb0c2ea92d59495f77f3199d442", "cipherparams": {"iv": "5fc9ac2c04857dcce1ec1d785472ae51"}}, "address": "6fcb75934649e3bf6c18c3a5e02b0ec632813823", "version": 3}, "1").then(result => {
            expect(result).to.be.a("Object"); 
            done();           
        }).
        catch(done);
    });

    it("Debe recibir una contraseña correcta y no vacía", (done) => {
        decrypt_wallet({"id": "9541845a-d32b-4b3f-b289-d180e1aaa8eb", "crypto": {"kdf": "scrypt", "mac": "ca7af3e12cb42d824e127bfd15ab95d5e0fad415cd75c7f6715d27804ac85127", "cipher": "aes-128-ctr", "kdfparams": {"n": 8192, "p": 1, "r": 8, "salt": "19616e08e1f3cf2ab52534817f289575acc99aa33df46c4e9542c2e7a194d1c5", "dklen": 32}, "ciphertext": "7579fee797e80dee67f1723fc22266c428c8cdb0c2ea92d59495f77f3199d442", "cipherparams": {"iv": "5fc9ac2c04857dcce1ec1d785472ae51"}}, "address": "6fcb75934649e3bf6c18c3a5e02b0ec632813823", "version": 3}).then(result => {
            expect(result).to.be.eq("Clave erronea o vacia"); 
            done();
        }).catch(done);        
    });

    it("No puede recibir una cartera encriptada que no sea un objeto", (done) => {
        decrypt_wallet([]).then(result => {
            expect(result).to.be.false;
            done();
        }).catch(done);
    });
  
    
});