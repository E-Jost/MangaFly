const path = "../res/Series/";
const jsonTitle = sessionStorage.getItem("JSONTitle");
const jsonPath = path + jsonTitle + "/" + jsonTitle + ".json";
const colPerRow = 4;

let seriesTitle;
let numVolumes;
let volumes;
let covers;
let index = 0;

populate();

async function populate()
{
    await fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
        seriesTitle = data.title;
        numVolumes = data.numVolumes;
        volumes = data.volumes;
        covers = data.covers;
    })
    .catch(error => {
        console.error('fetch error:', error);
    });

    //init() ???
    document.title = seriesTitle;
    document.getElementById("title").innerHTML = seriesTitle;
    //

    for(let i = 0; i < numVolumes; i = i + colPerRow)
    {
        addRow();
    }
}

function addRow()
{
    const newRow = document.createElement("div");
    newRow.classList.add("row");
    document.body.appendChild(newRow);
    addColumns(newRow);
}

function addColumns(row)
{
    for(let i = 0; i < colPerRow; i++)
    {
        newColumn(row);
    }
}

function newColumn(row)
{
    //create new column div
    const newCol = document.createElement("div");
    newCol.classList.add("column");
    //set onclick listener for column div
    newCol.onclick = function () { onClick(this); };

    if(index < numVolumes)
    {
        //create cover page element
        const img = document.createElement("img");
        img.src = path + seriesTitle + "/" + volumes[index] + "/" + covers[index];
        console.log(img.src);
        //append cover page element to new column 
        newCol.appendChild(img);
        //create title text element
        const newTitle = document.createElement("p");
        newCol.classList.add("columnTitle");
        //append text to title text element
        newTitle.appendChild(document.createTextNode(volumes[index]));
        //append title to column div
        newCol.appendChild(newTitle);

        index++;
    }

    //append new column div to parent row
    row.appendChild(newCol);
}

function onClick(elem)
{
    let p = elem.getElementsByTagName("p");

    sessionStorage.setItem("VolumeTitle", p[0].innerHTML);
    sessionStorage.setItem("SeriesTitle", seriesTitle);

    window.location.href = "./reader.html";
}