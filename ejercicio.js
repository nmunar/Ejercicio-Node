const axios = require('axios');
const fs = require('fs');
const http = require('http');
const url = require('url');


async function getJsonfronAnotherServer(){
    const resp = await axios.get('https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json');
    console.log(resp.data);
};

async function getJson2fronAnotherServer(){
    const resp = await axios.get('https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json');
    console.log(resp.data);
};
getJsonfronAnotherServer();
getJson2fronAnotherServer();