/** Command-line tool to generate Markov text. */
//add requirements for file reader, markov object, axios, and process

const fs = require('fs');
const markov = require('./markov')
const axios = require('axios')
const process = require('process')

//Create markov machine from text, then generate text from it
function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

//read file and generate text
function makeText(path) {
    fs.readFile(path, 'utf8', function cb(err, data) {
        //if there is an error, log the specific message and 
        //kill the process
        if (err) {
            console.error(`Cannot read file: ${path}: ${err}`);
            process.exit(1)
        } 
        //else generateText through above function
        else {
            generateText(data);
        }
    })
}

//read url and generate text

async function makeURLText(url) {
    let resp;
    //get data from url
    //if error, log the specific message and kill the process
    //when data returns use generateText function to generateText
    try {
        resp = await axios.get(url);
    } catch(err) {
        console.error(`Cannot read URL: ${url}: ${err}`);
        process.exit(1);
    }
    generateText(resp.data)
}

//cmdline commands

//two commands are given, the method and the path
let [method, path] = process.argv.slice(2);

//if method is file we use the makeText function which reads a file and generates text
if (method === 'file') {
    makeText(path);
}
//else if method is url we use the makeURLText function which gets data from url and generates text
else if (method === 'url') {
    makeURLText(path);
}
//else the method is unknown and we exit the process
else {
    console.error(`Unknown method: ${method}`)
    process.exit(1)
}