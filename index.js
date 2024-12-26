const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const db = require('./api')
const port = 3000

app.use(bodyParser.json())
app.use(cors())

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

//Get Request to root url (/)
app.get('/', (request, response)=>{
    response.json({Willkommen: 'test message'})
})

app.get('/media_av', db.getAllMedia);
app.post('/media_av', db.addMedia);
app.delete('/media_av/:media_id', db.deleteMedia);
app.put('/media_av/:media_id', db.updateMedia);

app.listen(port, () => {
    console.log(`App is listening on port http://localhost:${port}`);
});