const request = require('request');
const fs = require('fs');

// Options

let user = 'USERNAME'; // User to send the gold too, should be already registered
let pass = 'PASSWORD'; // Password you want the users to have
let host = 'IP-'; // Your machine ip
let sCode; // Leave that empty

let cookies; // Leave that blank

fs.readFileSync('WORDLIST PATH', 'utf-8')
.split(/\r?\n/)
.forEach((line, i) => {
    let rdata = `username=test${i}&password=${pass}&password2=${pass}`; // Register data
    let ldata = `username=test${i}&password=${pass}`; // Login data
    let sdata = `user=${user}&amount=1`; // Send-Gold data
    setTimeout(() => {
        if(i <= 5000) {
            setTimeout(() => {
        request.post({
            headers: {'content-type' : 'application/x-www-form-urlencoded'},
            url: `http://${host}/api/create`,
            body: rdata
        }, (err, response, body) => {
            setTimeout(() => {
                request.post({
                    headers: {'content-type' : 'application/x-www-form-urlencoded'},
                    url: `http://${host}/api/login`,
                    body: ldata
                }, (err, res, body) => {                   
                    setTimeout(() => {
                        cookies = res.headers['set-cookie'];
                        if(cookies === undefined) return;
                        request.post({
                            headers: {
                                'content-type': 'application/x-www-form-urlencoded',
                                'Cookie': `${cookies}`,
                            },
                            url: `http://${host}/api/givegold`,
                            body: sdata,
                            }, (err, resp, body) => {
                                if(body) console.log(i);
                            });
                        }, i * 150);
                    });
                }, i * 150);
            }, i * 150);
            });
            } else {
                request.post({
                    headers: {'content-type' : 'application/x-www-form-urlencoded'},
                    url: `http://${host}/api/create`,
                    body: rdata
                }, (err, response, body) => {
                    setTimeout(() => {
                        request.post({
                            headers: {'content-type' : 'application/x-www-form-urlencoded'},
                            url: `http://${host}/api/login`,
                            body: ldata
                        }, (err, res, body) => {                   
                            setTimeout(() => {
                                cookies = res.headers['set-cookie'];
                                if(cookies === undefined) return;
                                request.post({
                                    headers: {
                                        'content-type': 'application/x-www-form-urlencoded',
                                        'Cookie': `${cookies}`,
                                    },
                                    url: `http://${host}/api/givegold`,
                                    body: sdata,
                                    }, (err, resp, body) => {
                                        if(body) console.log(i);
                                    });
                                }, i * 150);
                            });
                        }, i * 150);
                    });
            };
        }, i * 150);
    });
