let express = require('express');
var app = require('express')();
var http = require('http').Server(app);
const fs = require('fs')
const path = require('path')
var bodyParser = require('body-parser');  
var urlencodedParser = bodyParser.urlencoded({ extended: false })  

const { hook } = require('./utils/settings.js')
const { Webhook, EmbedBuilder } = require("discohook");
const webhook = new Webhook(hook.url);

// merch


app.use((req, res, next) => {
    if(req.originalUrl.startsWith('/cdn')) {
        let file = req.originalUrl.replace("/cdn", "");
        fs.exists('./files/'+file, (e) => {
            if(e) {
                res.sendFile(path.join(__dirname, `./files/${file}`))
            } else {
                next()
            }
        })
    } else {
        next()
    }
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, './files/index/index.html'))
});

app.get('/merch', (req, res) => {
	res.sendFile(path.join(__dirname, './files/merch/shop.html'))
})

app.get('/merch/order', (req, res) => {
	res.sendFile(path.join(__dirname, './files/merch/order.html'))
});

app.get('/open-recruitment', (req, res) => res.redirect('https://forms.gle/tmYi7wKR2yTzozSz7'))

app.post('/merch/upload', urlencodedParser, (req, res) => {
	function generateRandomString() {
	  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  	let randomString = "";
  	for (let i = 0; i < 9; i++) {
    	const randomIndex = Math.floor(Math.random() * alphabet.length);
    	const randomLetter = alphabet.charAt(randomIndex);
    	randomString += randomLetter;
  	}
  	return randomString;
	};
	let orderID = generateRandomString()
	console.log({order: req.body, orderID: orderID})

	let items = [];
	let data = req.body
	
	if(data.bp == "B1S") {
		items.push("Baju Pertama Small")
	} else if(data.bp == "B1M") {
		items.push("Baju Pertama Medium")
	} else if(data.bp == "B1L") {
		items.push("Baju Pertama Large")
	} else if(data.bp == "B1XL") {
		items.push("Baju Pertama Extra Large")
	}

	let embed = new EmbedBuilder()
	.setTitle(`Merch order received (Order ID: \`${orderID}\`)`)
	.setDescription(`Name: \`${data.name}\`\nNo. Telpon: \`${data.tel}\`\nEmail: \`${data.email}\` \n\nRequested:\n - ${items.join(',\n- ')}`)
	.setTimestamp()
	
	if(hook.send) {
		webhook.send({ embeds: [embed] });
	};
	
	res.redirect(`/merch/completed?orderid=${orderID}`)
});

app.get('/merch/completed', (req, res) => {
	res.sendFile(path.join(__dirname, './files/merch/completed.html'))
})

http.listen(3000, () => {
	console.log('Running: PORT 3000');
});