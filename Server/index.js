const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = 5000;

const MSG = require('./data/msg.json');
const Story = require('./data/story.json');
const Image = require('./data/image.json');

app.get('/api/messages/:msgIdx', (req, res) => {
    let { msgIdx } = req.params;
    let length = MSG.length;

    return res.json(MSG[msgIdx % length]);
});

app.get('/api/story', (req, res) => {
    console.log(Story);
    return res.json(Story);
});

app.get('/api/image', (req, res) => {
    return res.json(Image);
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))
