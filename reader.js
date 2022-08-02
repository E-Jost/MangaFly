const path = "./res/Series/";
const img = document.getElementById("image");
const pgBox = document.getElementById("pageBox");
const volTitle = sessionStorage.getItem("VolumeTitle");
const serTitle = sessionStorage.getItem("SeriesTitle");
const jsonPath = path + serTitle + "/" + volTitle + "/" + volTitle + ".json";

let volName = undefined;
let pageMax = 0;
let pageNum = 0;
let pages = [];
let currRotation = 0;
let zoomed = false;

populate();

async function populate()
{
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

    init(); 
    updateDisplay();
}

function init()
{
    document.title = volName;
    document.addEventListener('keydown', keyPressed);
    document.getElementById("pages").innerHTML = " / " + pageMax;
    pgBox.value = "1";
}

function keyPressed(e)
{
    if (e.code === "ArrowRight")// forward 1 page
    {
        if(pageNum < pageMax - 1)
        {
            pageNum++;
        }
        pgBox.value = pageNum + 1;
    }
    else if (e.code === "ArrowLeft")// back 1 page
    {
        if(pageNum > 0)
        {
            pageNum--;
        }
        pgBox.value = pageNum + 1;
    }
    else if (e.key === "f")// toggle fullscreen mode
    {
        toggleFullScreen();
    }
    else if (e.key === "r")// rotate img
    {
        rotateImg();
    }
    else if (e.key === "Enter")// goto page in page box
    {
        updatePageNum();
        pgBox.value = pageNum + 1;
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

function rotateImg()
{
    img.classList.remove("rotate"+currRotation+"deg");
    currRotation = (currRotation + 90) % 360;
    img.classList.add("rotate"+currRotation+"deg");
}

function zoom()
{
    if(zoomed)
    {
        img.classList.remove("zoomed");
        img.classList.add("unzoomed");
        zoomed = false;
    }
    else
    {
        img.classList.remove("unzoomed");
        img.classList.add("zoomed");
        zoomed = true;
    }
}

function updatePageNum()
{
    if(isNaN(pgBox.value))
    {
        pageNum = 0;
    }
    else if(pgBox.value < 1)
    {
        pageNum = 0;
    }
    else if(pgBox.value > pageMax)
    {
        pageNum = pageMax - 1;
    }
    else
    {
        pageNum = pgBox.value - 1;
    }
}

function updateDisplay()
{
    img.src = path + serTitle + "/" + volName + "/" + pages[pageNum];
}