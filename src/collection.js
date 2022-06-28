const path = "../res/Series/";
const jsonPath = "../res/Series/Series.json";

let numSeries;
let series;
let index = 0;

populate();

async function populate()
{
    await fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
        numSeries = data.numSeries;
        series = data.series;
    })
    .catch(error => {
        console.error('fetch error:', error);
    });

    for(let i = 0; i < numSeries; i++)
    {
        addRow();
    }
}

function addRow()
{
    const newRow = document.createElement("div");
    newRow.classList.add("row");
    document.body.appendChild(newRow);

    const imgBox = document.createElement("div");
    imgBox.classList.add("imgBox");
    newRow.appendChild(imgBox);
    
    const img = document.createElement("img");
    img.id = series[index].title;
    img.src = path + series[index].coverPath;
    img.onclick = function () { onImageClick(this); };
    imgBox.appendChild(img);
    
    const textBox = document.createElement("div");
    textBox.classList.add("textBox");
    newRow.appendChild(textBox);

    //populate text box
    const title = document.createElement("p");
    title.classList.add("title");
    title.appendChild(document.createTextNode(series[index].title));
    title.onclick = function () { onTitleClick(this); };
    textBox.appendChild(title);

    const seriesInfo = document.createElement("p");
    seriesInfo.classList.add("info");
    seriesInfo.appendChild(document.createTextNode("Number of Items: " + series[index].numVolumes));
    textBox.appendChild(seriesInfo);

    index++;
}

function onImageClick(elem)
{
    sessionStorage.setItem("JSONTitle", elem.id);
    window.location.href = "./display.html";
}

function onTitleClick(elem)
{
    sessionStorage.setItem("JSONTitle", elem.innerHTML);
    window.location.href = "./display.html";
}