const { Router } = require('express');
const express = require('express')

const router = Router();

router.use(express.json());

const dataList = [
    { "name": "Alice", "age": 25, "gender": "Female", "location": "City A" },
    { "name": "Bob", "age": 42, "gender": "Male", "location": "Town X" },
    { "name": "Eva", "age": 18, "gender": "Non-Binary", "location": "City C" },
    { "name": "David", "age": 55, "gender": "Male", "location": "Village Y" },
    { "name": "Charlie", "age": 30, "gender": "Non-Binary", "location": "City B" }
]

router.get('/data', (req, res) => {
    res.send(dataList)
})

router.get('/data/:name', (req, res) => {
    const nameSearch = req.params.name;
    console.log(`user ${nameSearch}`);
    const nameFound = dataList.find((item) => item.name === nameSearch);
    console.log(`user found: ${nameFound}`);
    if (!nameFound) {
        res.send(
            {
                error: "not found"
            }
        )
    }
    res.send(nameFound);
})

router.post('/data', (req, res) => {
    const itemToBeInserted = req.body
    console.log(itemToBeInserted)
    dataList.push(itemToBeInserted)
    res.sendStatus(201)
})

module.exports = router;
