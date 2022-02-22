
const axios = require('axios')
const inquirer = require('inquirer')

const questions = [
    {
        type: "input",
        name: "indexName",
        message: "What is the index name to be created?"
    },
    {
        type: "input",
        name: "shardsCount",
        message: "What will be the number of shards?",
        default: 1
    },
    {
        type: "input",
        name: "replicasCount",
        message: "What will be the number of replicas?",
        default: 1
    }
]

const ENDPOINT = "http://localhost:9200"

inquirer.prompt(questions).then(async function (answers){
    try{
        console.log("Accessing url: PUT", ENDPOINT+"/"+answers.indexName)
        const index = await axios.put(ENDPOINT+"/"+answers.indexName, {
            "settings": {
                "index": {
                    "number_of_shards":  `${answers.shardsCount}`,
                    "number_of_replicas": `${answers.replicasCount}`
                }
            }
        })
        console.log(index.data)
    }catch (e){
        console.error("There is an error", e.toJSON())
    }
})