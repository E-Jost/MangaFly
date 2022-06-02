const pathName = "./res/Series/Berserk/";
const jsonPath = "./res/Series/Berserk/Berserk.json";
const colPerRow = 4;

let title;
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
        title = data.title;
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
    const newCol = document.createElement("div");
    newCol.classList.add("column");

    newCol.onclick = function () { onClick(this); };

    if(index < numVolumes)
    {
        let img = document.createElement("img");
        img.src = pathName + volumes[index] + "/" + covers[index];
        index++;
        newCol.appendChild(img);
    }

    row.appendChild(newCol);
}

function onClick(elem)
{
    let elements = elem.getElementsByTagName("*");
    for (let i = 0; i < elements.length; i++)
    {
        let img = elements[i];//gets ith child element
        img.src = "./res/Series/Berserk/Berserk-v1/Berserk-v1-1.jpg";
    }
}