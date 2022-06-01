
addRow();
addRow();

let page = 1;

function onClick(elem)
{
    let elements = elem.getElementsByTagName("*");
    for (var i = 0; i < elements.length; i++)
    {
        let img = elements[i];//gets ith child element
        img.src = "./res/Berserk-v1/Berserk-v1-" + page + ".png";
        page++;
    }
}

function addRow()
{
    const newRow = document.createElement("div");
    newRow.classList.add("row");
    document.body.appendChild(newRow);
    addColumns(newRow);
}

function newColumn(row)
{
    const newCol = document.createElement("div");
    newCol.classList.add("column");

    newCol.onclick = function () { onClick(this); };

    let img = document.createElement("img");
    img.src = "./res/Berserk-v1/Berserk-v1-0.jpg";

    newCol.appendChild(img);

    row.appendChild(newCol);
}

function addColumns(row)
{
    //left column
    const leftCol = document.createElement("div");
    leftCol.classList.add("column");

    //leftCol.style.color = 'white';
    //--------------------------------------------------------------
    leftCol.setAttribute("id","image");
    //leftCol.onclick = onClick;
    leftCol.onclick = function () { onClick(this); };
    //--------------------------------------------------------------

    var img1 = document.createElement("img");
    //img1.classList.add("img");
    img1.src = "./res/Berserk-v1/Berserk-v1-0.jpg";

    leftCol.appendChild(img1);

    row.appendChild(leftCol);

    //center column
    const centerCol = document.createElement("div");
    centerCol.classList.add("column");

    var img2 = document.createElement("img");
    img2.src = "./res/Berserk-v1/Berserk-v1-1.png";

    centerCol.appendChild(img2);

    row.appendChild(centerCol);
    
    //right column
    const rightCol = document.createElement("div");
    rightCol.classList.add("column");

    var img3 = document.createElement("img");
    img3.src = "./res/Berserk-v1/Berserk-v1-2.png";

    rightCol.appendChild(img3);

    row.appendChild(rightCol);
}

function addElement()
{
    // create a new div element
    const newDiv = document.createElement("div");
  
    // and give it some content
    //const newContent = document.createTextNode("Hi there and greetings!");

    var img1 = document.createElement("img");
    img1.src = "./res/Berserk-v1/Berserk-v1-0.jpg";

    var img2 = document.createElement("img");
    img2.src = "./res/Berserk-v1/Berserk-v1-1.png";

    var img3 = document.createElement("img");
    img3.src = "./res/Berserk-v1/Berserk-v1-2.png";


    // add the content to the newly created div
    newDiv.appendChild(img1);
    newDiv.appendChild(img2);
    newDiv.appendChild(img3);

    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("div1");
    document.body.insertBefore(newDiv, currentDiv);
}