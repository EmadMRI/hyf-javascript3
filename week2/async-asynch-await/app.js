
'use strict';

const url ='https://api.github.com/orgs/HackYourFuture/repos?per_page=30';

function main() {
    const root = document.getElementById('root');
    const selectContainer = createAndAppend('div', root)
    const repository = document.getElementById('repository')
    const description = document.getElementById('description')
    const fork  = document.getElementById('fork ')
    const updated  = document.getElementById('updated ')
    const contributions  = document.getElementById('contributions')
  

fetchJSON(url, (error, data) => {
    if(error !== null){
        console.error(error.message)
    }
    else{
        createSelect(data)
    }
 });
}

function  createSelect(data){  
    // const select = createAndAppend('select', selectContainer)
    const select = document.getElementById('inlineFormCustomSelect');

    data.forEach((element) => {
        const options  = createAndAppend('option', select )
        options.innerHTML =   element.name 
        options.setAttribute('value', element.id)
    })
        filterData(data, select.value)

    select.addEventListener('change', () => { 
        filterData(data, select.value)
    })
   
}

function filterData(data, value){
// html_url
    let  result =  data.filter(element => element.id == value)
    repository.innerHTML = 'Repository:' + " "
    const a  = createAndAppend('a', repository) 
    a.innerHTML =  result[0].name
    a.setAttribute('href', result[0].html_url)
    a.setAttribute ('target', '_blank')

    description.innerHTML = '<strong>Description</strong>:' + " " + result[0].description

    fork.innerHTML = '<strong>Fork</strong>:' + " " + result[0].forks
    updated.innerHTML = '<strong>Updated</strong>:' + " " + result[0].updated_at 

    let url = result[0].contributors_url

    fetchJSON(url, (error, dataContributions) => {
        if(error !== null){
            console.error(error.message)
        }
        else{
            contributions.innerHTML = ''
            getContributionsData(dataContributions)
        }
     });
}

function getContributionsData(dataContributions){ 
        const lable  = createAndAppend('lable', contributions) 
        lable.innerHTML = 'Contributions'
        const spanCount  = createAndAppend('span', lable )
        spanCount.className += "badge badge-dark badge-pill"  

        const ul  = createAndAppend('ul', contributions) 
        ul.className += 'list-group'
        dataContributions.forEach( (element) => {
        const li  = createAndAppend('li', ul) 
        li.className += "list-group-item d-flex justify-content-between align-items-center"
        spanCount.innerHTML++
        const spanImag  = createAndAppend('span', li )
        const img = createAndAppend('img', spanImag)
        img.setAttribute('src', element.avatar_url)

        const spanLogin  = createAndAppend('strong', spanImag )
        spanLogin.innerHTML = element.login

        const spanCon  = createAndAppend('span', li )
        spanCon.className += "badge badge-dark badge-pill" 
        spanCon.innerHTML = element.contributions
    })
}

//create HTML tag and append it
function createAndAppend(tagName, parent) {
    const element = document.createElement(tagName);
    parent.appendChild(element);
    return element;
}

//cb(error, data)
function fetchJSON(url, callBack) {

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "json";

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status < 400) {
                callBack(null, xhr.response)
                
            } else {
                callBack(new Error(xhr.statusText));
            }
        }
    }
    xhr.send();
}


window.onload = main;


 