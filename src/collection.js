const pathName = "../res/Series/";
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
    //
    //newCol.onclick = function () { onClick(this); };
    //

    const newRow = document.createElement("div");
    newRow.classList.add("row");
    document.body.appendChild(newRow);

    const imgBox = document.createElement("div");
    imgBox.classList.add("imgBox");
    newRow.appendChild(imgBox);
    
    const img = document.createElement("img");
    img.src = pathName + series[index].coverPath;
    imgBox.appendChild(img);
    
    const textBox = document.createElement("div");
    textBox.classList.add("textBox");
    newRow.appendChild(textBox);

    //populate text box
    const title = document.createElement("p");
    title.classList.add("title");
    title.appendChild(document.createTextNode(series[index].title));
    textBox.appendChild(title);

    const seriesInfo = document.createElement("p");
    seriesInfo.classList.add("info");
    seriesInfo.appendChild(document.createTextNode(series[index].numVolumes));
    textBox.appendChild(seriesInfo);

    index++;
}