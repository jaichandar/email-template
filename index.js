const express = require('express')
const morgan = require('morgan');
const mysql = require('mysql2');
const sendEmail = require('./mailer');
const app = express();
const PORT = 4000;

app.use(morgan('dev'));
app.use(express.json());

let db
(async () => {
    db = mysql.createConnection({
        database: 'email',
        password: 'jaichandar',
        user: 'root',
        port: 3306
    })
    console.log('db connected Successfully')
})()

app.get('/', (req, res) => {
    db.query('select * from template', (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, err })
        }
        res.status(200).json({ success: true, data })
    })
})

app.post('/verify-user', (req, res) => {
    const { user } = req.body;

    db.query('select * from template t where t.email = ?', [user], (err, data) => {
        if (err) return res.status(404).json({ success: false, err })
        sendEmail().then(() => {
            res.status(200).json({ success: true, data });
        }).catch((err) => {
            res.status(400).json({ success: false, err });
        })
    })
})

app.get('/verify', (req, res) => {
    const { email } = req.query;
    console.log('from gmail service ------->', email)

    db.query('update template t set t.isVerified = 1 where t.email = ? ', [email], (err, data) => {
        console.log(data, '<--- data')
        if (err) {
            return res.status(400).json({ success: false, err })
        }
        return res.status(200).json({ success: true, data })
    })
})

app.listen(PORT, () => {
    console.log(`Application running on port: ${PORT}`);
})