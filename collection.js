const pathName = "./res/Series/";
const jsonPath = "./res/Series/Series.json";

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

    //
    //console.log(numSeries);
    //console.log(series[0].title);
    //

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
    img.src = pathName + series[index].coverPath;
    imgBox.appendChild(img);
    //newRow.appendChild(img);

    index++;
}