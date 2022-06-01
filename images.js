const path = "./";

let volName = "";
let pageMax = 0;
let pageNum = 0;
let pages = [];

populate();

document.addEventListener('keydown', keyPressed);

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

async function populate()
{
    await fetch('./One-Punch Man-v1.json')
    .then(response => response.json())
    .then(data => {
        volName = data.name;
        pageMax = data.numPages;
        pages = data.pages;
    })
    .catch(error => {
        console.error('fetch error:', error);
    });
    updateDisplay();
}

function updateDisplay()
{
    document.getElementById("image").src = path + volName + "/" + pages[pageNum];
    document.getElementById("pages").innerHTML = pageNum + " / " + pageMax;
}
