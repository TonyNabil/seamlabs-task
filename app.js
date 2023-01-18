const express = require('express');
const app = express();

app.use(express.json());

/*
http://localhost:3000/count?start=4&end=17
*/
app.get("/count", (req, res) => {
    let { start, end } = req.query;

    if (!start || !end) {
        return res.status(400).send('Both query parameters start & end are required');
    }
    if (isNaN(start) || isNaN(end)) {
        return res.status(400).send('Invalid number in query parameters');
    }

    start = parseInt(start);
    end = parseInt(end);

    let count = 0;
    for (let i = start; i <= end; i++) {
        if (!i.toString().includes("5")) {
            count++;
        }
    }

    res.send({ count });
});


/*
http://localhost:3000/string_index?input_string=BFG
*/
app.get('/string_index', (req, res) => {

    let inputString = req.query.input_string;

    if (!inputString) {
        return res.status(400).send('query parameter input_string is required');
    }

    const isAlphabetic = inputString.match(/^[a-zA-Z]+$/);
    if (!isAlphabetic) {
        return res.status(400).send('Invalid alphabetic input_string');
    }

    inputString = inputString.toUpperCase()

    let index = 0;
    for (let i = 0; i < inputString.length; i++) {
        let charValue = inputString.charCodeAt(i) - 'A'.charCodeAt(0) + 1;
        index = index * 26 + charValue;
    }
    res.send({ index });
})


/*
curl --location --request POST 'http://localhost:3000/reduce_to_zero' \
--header 'Content-Type: application/json' \
--data-raw '{
    "arr": [3,4]
}'
*/
app.post('/reduce_to_zero', (req, res) => {

    let numsArr = req.body.arr;

    let result = [];
    for (let num of numsArr) {
        let steps = 0;
        while (num !== 0) {
            if (num % 2 === 0) {
                num = num / 2;
                steps++;
            } else {
                num--;
                steps++;
            }
        }
        result.push(steps);
    }
    
    res.send({ result });
})


module.exports = app;
