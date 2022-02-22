

const axios = require('axios')
const inquirer = require('inquirer')

const questions = [
    {
        type: "input",
        name: "indexName",
        message: "What is the index name to be deleted?"
    }
]

const ENDPOINT = "http://localhost:9200"

inquirer.prompt(questions).then(async function (answers){
    try{
        console.log("Accessing url: DELETE", ENDPOINT+"/"+answers.indexName)
        const index = await axios.delete(ENDPOINT+"/"+answers.indexName)
        console.log(index.data)
    }catch (e){
        console.error("There is an error", e.toJSON())
    }
})