const {body} = require('express-validator');

module.exports = [
    body('email','Not valid email!')
    .custom((value)=>{
        const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!emailReg.test(value)){
            throw new Error('Not valid email!')
        }
        console.log(false + 'email')
        return true;
    })
];