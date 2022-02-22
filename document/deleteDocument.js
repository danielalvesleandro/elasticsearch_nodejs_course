const axios = require('axios')
const inquirer = require('inquirer')

const questions = [
    {
        type: "input",
        name: "indexName",
        message: "What is the index name where the document to be deleted is located?"
    },
    {
        type: "input",
        name: "documentId",
        message: "What is the document id of the document to be deleted?"
    }
]

const ENDPOINT = "http://localhost:9200"

inquirer.prompt(questions).then(async function (answers){
    try{
        console.log("Accessing url: DELETE", ENDPOINT+"/"+answers.indexName+"/_doc/"+answers.documentId)
        const index = await axios.delete(ENDPOINT+"/"+answers.indexName+"/_doc/"+answers.documentId)
        console.log(index.data)
    }catch (e){
        console.error("There is an error", e.toJSON())
    }
})