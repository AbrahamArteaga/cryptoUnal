const bcrypt = require('bcrypt');
// Mientras mas alto sea el valor, mas tiempo se tarda en hacerle el hash a la contrasenha.
const saltRounds = 10;

const hashPassword = (password) =>{    
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
};

const comparePassword = (password, hash) => {
    return new Promise((resolve,reject) => {
        bcrypt.compare(password, hash, (err, result) => {
            if (result)
                resolve(result);
            else
                reject.err;
        });
    }).then(result => result).catch(err=> console.log(err));
};


/*(async function(){
    let a = await hashPassword("1");
    //let b = await comparePassword("123", a);
    console.log(a);
})();
*/

module.exports = {hashPassword, comparePassword}

