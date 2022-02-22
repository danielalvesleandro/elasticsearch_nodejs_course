const axios = require('axios')
const inquirer = require('inquirer')

const questions = [
    {
        type: "input",
        name: "indexName",
        message: "What is the index name where the document will be created?"
    },
    {
        type: "input",
        name: "documentId",
        message: "What is the document id to be created?"
    },
    {
        type: "input",
        name: "title",
        message: "What is the book's title?",
    },
    {
        type: "input",
        name: "authorName",
        message: "What is the author's name?",
    },
    {
        type: "input",
        name: "rating",
        message: "What is the book's rating?",
    },
    {
        type: "input",
        name: "price",
        message: "What is the book's price?",
    },
    {
        type: "input",
        name: "publishDate",
        message: "What was the book's publish date?",
    }
]

const ENDPOINT = "http://localhost:9200"

inquirer.prompt(questions).then(async function (answers){
    try{
        console.log("Accessing url: POST", ENDPOINT+"/"+answers.indexName+"/_doc/"+answers.documentId)
        const index = await axios.post(ENDPOINT+"/"+answers.indexName+"/_doc/"+answers.documentId, {
            "title": `${answers.title}`,
            "author": `${answers.authorName}`,
            "rating": `${answers.rating}`,
            "price": `${answers.price}`,
            "publish_date": `${answers.publishDate}`
        })
        console.log(index.data)
    }catch (e){
        console.error("There is an error", e.toJSON())
    }
})