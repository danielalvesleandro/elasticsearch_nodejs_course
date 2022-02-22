// 1. With DSL Queries
// 1.1 With leaf query clause Search book by author X

const axios = require('axios')
const inquirer = require('inquirer')

const questions = [
    {
        type: "input",
        name: "searchParameter",
        message: "Search by author"        
    }
]

const ENDPOINT = "http://localhost:9200/books/_search"

inquirer.prompt(questions).then(async answers =>{
    try{
        const query = {
            "query":{
                "match":{
                    "author": answers.searchParameter
                }
            }
        }

        const {data:results} = await axios.post(ENDPOINT, query)

        const books = []
        const {hits} = results.hits
        for(const hit of hits){
            const book = {
                ...hit._source,
                id:hit._id,
                score:hit._score
            }

            books.push(book)
        }

        console.table(books)
    }catch(e){
        console.error("There is an error", e)
    }
})