const pathName = "./res/Series/Berserk/";
const jsonPath = "./res/Series/Berserk/Berserk.json";
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
        covers = data.covers
    })
    .catch(error => {
        console.error('fetch error:', error);
    });

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
        img.src = pathName + volumes[index] + "/" + covers[index];
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
    //let elements = elem.getElementsByTagName("img");
    //let img = elements[0];
    //img.src = "./res/Series/Berserk/Berserk-v1/Berserk-v1-1.jpg";

    let p = elem.getElementsByTagName("p");

    sessionStorage.setItem("VolumeTitle", p[0].innerHTML);
    sessionStorage.setItem("SeriesTitle", seriesTitle);

    window.location.href = "./reader.html";
}