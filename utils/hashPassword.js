const bcrypt = require('bcrypt');
// Mientras mas alto sea el valor, mas tiempo se tarda en hacerle el hash a la contrasenha.
const saltRounds = 10;

const hashPassword = (password) =>{    
    if(typeof password === "string" && password.length>0){
        return new Promise((resolve,reject) => {
            bcrypt.hash(password, saltRounds, (err,hash) => {
                if (hash){
                    resolve(hash);
                }
                else {
                    reject (err);
                }
            })
        }).then(hash => hash).catch(err=> console.log(err));
    }
    return false;    
};

const comparePassword = (password, hash) => {
    if(typeof password === "string" && typeof  hash === "string" &&  password.length>0 && hash.length === 60){
        return new Promise((resolve,reject) => {
            bcrypt.compare(password, hash, (err, result) => {
                if (result)
                    resolve(result);
                else
                    reject.err;
            });
        }).then(result => result).catch(err=> console.log(err));
    }
    return false;
};


// (async function(){
//     let a = await hashPassword("12345678");
//     //let b = await comparePassword("123", a);
//     console.log(a);
// })();


module.exports = {hashPassword, comparePassword}