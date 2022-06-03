const path = "./res/Series/";

let volName = "";
let volTitle = "";
let serTitle = "";
let pageMax = 0;
let pageNum = 0;
let pages = [];

populate();

document.addEventListener('keydown', keyPressed);

async function populate()
{
    volTitle = sessionStorage.getItem("VolumeTitle");
    serTitle = sessionStorage.getItem("SeriesTitle");

    const jsonPath = path + serTitle + "/" + volTitle + "/" + volTitle + ".json";
    //console.log(jsonPath);

    await fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
        volName = data.name;
        pageMax = data.numPages;
        pages = data.pages;
    })
    .catch(error => {
        console.error('fetch error:', error);
    });

    //console.log(volName);

    updateDisplay();
}

function keyPressed(e)
{
    if (e.code === "ArrowRight")//forward 1 page
    {
        if(pageNum < pageMax - 1)
        {
            pageNum++;
        }
    }
    else if (e.code === "ArrowLeft")//back 1 page
    {
        if(pageNum > 0)
        {
            pageNum--;
        }
    }
    else if (e.key === "Enter")//Toggle fullscreen mode
    {
        toggleFullScreen();
    }
    updateDisplay();
}

function toggleFullScreen()
{
    if(!document.fullscreenElement)
    {
        document.documentElement.requestFullscreen();
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen();
        }
    }
}

function updateDisplay()
{
    document.getElementById("image").src = path + serTitle + "/" + volTitle + "/" + pages[pageNum];
    document.getElementById("pages").innerHTML = pageNum + " / " + pageMax;
}
