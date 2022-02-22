const axios = require('axios')
const inquirer = require('inquirer')

// What is the index name?
// books
// The index books:
// {
//     "books": {
//         "aliases": {},
//         "mappings": {...},
//         "settings": {...}
// }

const questions = [
    {
        type: "input",
        name: "indexName",
        message: "What is the index name?"
    }
]

const ENDPOINT = "http://localhost:9200"

inquirer.prompt(questions).then(async function (answers){
    try{
        console.log("Accessing url: GET", ENDPOINT+"/"+answers.indexName)
        const index = await axios.get(ENDPOINT+"/"+answers.indexName)
        console.log(index.data)
    }catch (e){
        console.error("There is an error", e.toJSON())
    }
})