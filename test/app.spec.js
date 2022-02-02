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
const { hashPassword,comparePassword } = require('../utils/hashPassword');


describe('createWallet', (done)=> {
    
    it("Debe requerir una cadena de longitud superior a 7", (done) => {
        createEthereumWallet("contrasenhalarga").then(result => {
            expect(result).to.be.a("Array"); 
            done();           
        }).
        catch(done);
    });

    it("No puede tener una contraseña vacia", (done) => {
        createEthereumWallet().then(result => {
            expect(result).to.be.false; 
            done();           
        }).
        catch(done);
    });    

    it("No acepta numeros", (done) => {
        createEthereumWallet(2).then(result => {
            expect(result).to.be.false; 
            done();           
        }).
        catch(done);
    });    

    it("No acepta arreglos", (done) => {
        createEthereumWallet(["a","b"]).then(result => {
            expect(result).to.be.false; 
            done();           
        }).
        catch(done);
    });    

    it("No acepta objetos", (done) => {
        createEthereumWallet({}).then(result => {
            expect(result).to.be.false; 
            done();           
        }).
        catch(done);
    });    

});

describe('decrypt_wallet', (done)=> {
    
    it("Debe recibir una cartera encriptada y en formato JSON", (done) => {
        decrypt_wallet({"id": "9541845a-d32b-4b3f-b289-d180e1aaa8eb", "crypto": {"kdf": "scrypt", "mac": "ca7af3e12cb42d824e127bfd15ab95d5e0fad415cd75c7f6715d27804ac85127", "cipher": "aes-128-ctr", "kdfparams": {"n": 8192, "p": 1, "r": 8, "salt": "19616e08e1f3cf2ab52534817f289575acc99aa33df46c4e9542c2e7a194d1c5", "dklen": 32}, "ciphertext": "7579fee797e80dee67f1723fc22266c428c8cdb0c2ea92d59495f77f3199d442", "cipherparams": {"iv": "5fc9ac2c04857dcce1ec1d785472ae51"}}, "address": "6fcb75934649e3bf6c18c3a5e02b0ec632813823", "version": 3}, "1").then(result => {
            expect(result).to.be.a("Object"); 
            done();           
        }).
        catch(done);
    });

    it("No puede recibir un campo de cartera vacío o de contraseña vacía", (done) => {
        decrypt_wallet().then(result => {
            expect(result).to.be.eq("Cartera no valida, clave erronea o vacia"); 
            done();
        }).catch(done);        
    });

    it("No puede recibir un número en el campo de cartera", (done) => {
        decrypt_wallet(2,"123").then(result => {
            expect(result).to.be.false;
            done();
        }).catch(done);
    });    

    it("No puede recibir una cadena en el campo de cartera", (done) => {
        decrypt_wallet("hola","123").then(result => {
            expect(result).to.be.false;
            done();
        }).catch(done);
    });    

});


describe('getBalance', (done)=> {
    
    it("Debe recibir una cadena de longitud 42 que representa una dirección valida", (done) => {
        consultBalance("0x6Fcb75934649e3bF6C18C3A5E02b0EC632813823")
        .then(result => {
            expect(result).to.be.a("string"); 
            done();           
        }).
        catch(done);
    });

    it("No puede recibir un argumento vacío", (done) => {
        consultBalance()
        .then(result => {
            expect(result).to.be.false; 
            done();           
        }).
        catch(done);
    });

    it("No puede recibir un número", (done) => {
        consultBalance(12)
        .then(result => {
            expect(result).to.be.false; 
            done();           
        }).
        catch(done);
    });

    it("No puede recibir un objeto", (done) => {
        consultBalance({"clave": "0x6Fcb75934649e3bF6C18C3A5E02b0EC632813823"})
        .then(result => {
            expect(result).to.be.false; 
            done();           
        }).
        catch(done);
    });    
});


describe("getHistorial" , () =>{
    // Para poder usar axios 
    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.restore();
    });

    it("Debe devolver un arreglo de objetos al recibir una dirección valida", (done) => {
        // stub sirve para simular el resultado esperado de una función, esto se hace por si la API que se usa está fuera de servicio
        const getStub = sandbox.stub(axios,'get').resolves({data: {result: [
            {
              blockNumber: '11833255',              
              hash: '0x90ea96453b574910efa4deda26773feb3df2a76231de3ae3e2cd17c7f8fa9cf9',
              nonce: '1',
              blockHash: '0x82f1b14a556ad15a90821c6d274dce2c8cd5b9c5808da4d4c4666959718456a2',
              transactionIndex: '21',
              from: '0x03621dd354ecb51b6b24b8570109d4fa21aee6ed',
              to: '0x6fcb75934649e3bf6c18c3a5e02b0ec632813823',
              value: '1000000000000000000',
              gas: '21000',
              gasPrice: '36894019200',
              isError: '0',
              txreceipt_status: '1',
              input: '0x',
              contractAddress: '',
              cumulativeGasUsed: '2821537',
              gasUsed: '21000',
              confirmations: '77374'
            },
            {
              blockNumber: '11833583',              
              hash: '0x9d65f08dd3e460286ffe26048d8f306103ca068edf23d819d2f8515b1eae5ae7',
              nonce: '287928',
              blockHash: '0xcf55548f56767c95ed79a6484df7a080b54cb1873a0ba09ada45c625d0c92d97',
              transactionIndex: '0',
              from: '0x78c115f1c8b7d0804fbdf3cf7995b030c512ee78',
              to: '0x6fcb75934649e3bf6c18c3a5e02b0ec632813823',
              value: '1000000000000000000',
              gas: '400000',
              gasPrice: '50000000000',
              isError: '0',
              txreceipt_status: '1',
              input: '0x',
              contractAddress: '',
              cumulativeGasUsed: '21000',
              gasUsed: '21000',
              confirmations: '77046'
            },
            {
              blockNumber: '11842529',
              hash: '0x77db969a03c21670f9c0084d21e8cf6c656f7832a1c353ee14e789113f961567',
              nonce: '2',
              blockHash: '0x94371e25264fab3123c88e578ca4521a7d31d51a7ce88896fd4921702a060e42',
              transactionIndex: '21',
              from: '0x03621dd354ecb51b6b24b8570109d4fa21aee6ed',
              to: '0x6fcb75934649e3bf6c18c3a5e02b0ec632813823',
              value: '1000000000000000000',
              gas: '21000',
              gasPrice: '10996570879',
              isError: '0',
              txreceipt_status: '1',
              input: '0x',
              contractAddress: '',
              cumulativeGasUsed: '4926334',
              gasUsed: '21000',
              confirmations: '68100'
            },
            {
              blockNumber: '11901590',              
              hash: '0x597bd6ba4daf74dfed8117d3910a2f79b41433ba5018b0dd773c9ec690026d16',
              nonce: '0',
              blockHash: '0xc834cd3a7cc51f140165d6778ba5a6d34ff333475bcf008ff214d4fd407efb93',
              transactionIndex: '16',
              from: '0x6fcb75934649e3bf6c18c3a5e02b0ec632813823',
              to: '0x2f19205efecf8584b8f9545d84971ba4c83017d8',
              value: '1000000000000000000',
              gas: '2100000',
              gasPrice: '2000000000',
              isError: '0',
              txreceipt_status: '1',
              input: '0x',
              contractAddress: '',
              cumulativeGasUsed: '3407653',
              gasUsed: '21000',
              confirmations: '9039'
            }
          ]
        }});
        getHistorial("0x6Fcb75934649e3bF6C18C3A5E02b0EC632813823").then(result => {
            expect(result).to.be.a("Array");
            expect(result[0].hash).to.be.eq("0x90ea96453b574910efa4deda26773feb3df2a76231de3ae3e2cd17c7f8fa9cf9");            
            expect(getStub).to.be.calledOnce;
            expect(getStub).to.be.calledWith('https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=0x6Fcb75934649e3bF6C18C3A5E02b0EC632813823&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=FGVV1TVIVPSR4DGEIC9E55G2ZABUBMA4XA');
            done();
        }).catch(done);
    })  

    it("No puede aceptar direcciones en formato numérico", (done)=>{
        getHistorial(0x6Fcb75934649e3bF6C18C3A5E02b0EC632813823)
        .then(result => {
            expect(result).to.be.false;
            done();
        })
        .catch(done);
    })

    it("No puede aceptar una dirección vacía", (done)=>{
        getHistorial()
        .then(result => {
            expect(result).to.be.false;
            done();
        })
        .catch(done);
    })
});

describe("hashPassword", (done)=>{
    it("Debe recibir contraseñas de longitud mayor a cero", ()=>{
        hashPassword("contrasenha")
        .then(result => {
            expect(result).to.be("string");
            expect(result).to.have.lengthOf(60);
            done();
        }).catch(done);
    })

    it("No debe recibir números", ()=>{
        result = hashPassword(123);
        expect(result).to.be.false;               
    })

    it("No debe recibir una cadena vacía", ()=>{
        result = hashPassword("")
        expect(result).to.be.false;             
    })
});

describe("comparePassword", (done)=>{
    it("Debe recibir contraseñas de longitud mayor a cero y un hash de longitud 60", ()=>{
        comparePassword("12345678", "$2b$10$SCcI7GZX2jA9GV1psh0ULe9wZ36GMgIy4LcmJDHetPAd3bPKgdnq.")
        .then(result => {
            expect(result).to.be.true;            
            done();
        }).catch(done);
    })

    it("No debe recibir números", ()=>{
        result = comparePassword(123,"$2b$10$SCcI7GZX2jA9GV1psh0ULe9wZ36GMgIy4LcmJDHetPAd3bPKgdnq.");
        expect(result).to.be.false;               
    })

    it("No debe recibir una cadena vacía", ()=>{
        result = comparePassword("", "");
        expect(result).to.be.false;             
    })
});

describe("comparePassword", (done)=>{
    it("Debe recibir contraseñas de longitud mayor a cero y un hash de longitud 60", ()=>{
        comparePassword("12345678", "$2b$10$SCcI7GZX2jA9GV1psh0ULe9wZ36GMgIy4LcmJDHetPAd3bPKgdnq.")
        .then(result => {
            expect(result).to.be.true;            
            done();
        }).catch(done);
    })

    it("No debe recibir números", ()=>{
        result = comparePassword(123,"$2b$10$SCcI7GZX2jA9GV1psh0ULe9wZ36GMgIy4LcmJDHetPAd3bPKgdnq.");
        expect(result).to.be.false;               
    })

    it("No debe recibir una cadena vacía", ()=>{
        result = comparePassword("", "");
        expect(result).to.be.false;             
    })
});
