function elem(elemId)
{
    return document.getElementById(elemId);
}

let clickScore = 1;
let clicks = 0;
let mult = 1;
let boost = 1;
let upgrades = 0;
let level = 1;

let nextUp = 10;

let canLvlUp = 0;
let win = 0;

const defMult = 1000;
const HIDE_ASS = {
    1: "amogus_front1.jpeg",
    2: "amogus_front2.gif",
    3: "amogus_front3.gif"
};
const SHOW_ASS = {
    1: "amogus_back1.gif",
    2: "amogus_back2.gif",
    3: "amogus_back3.gif"
};

function display()
{
    if (win)
    {
        elem("win").style.display = "initial";
        elem("resetAll").style.display = "initial";
        elem("main").style.display = "none";
        elem("pic").style.display = "none";

        elem("boost").innerHTML = "";
        elem("div2").style.height = "100%";
        elem("div2").style.width = "100%";
        elem("div2").style.textAlign = "center";
        elem("div2").style.margin = "0";
        elem("div2").style.padding = "0";
        elem("win").style.textAlign = "center";

        return;
    }
    
    if (canLvlUp)
    {
        elem("lvlUp").style.display = "initial";
    }
    else
    {
        elem("lvlUp").style.display = "none";
    }

    elem("boost").innerHTML = boost == 1 ? "" : "Boost!!!";
    elem("pic").src = boost == 1 ? HIDE_ASS[level] : SHOW_ASS[level];
    
    elem("scorePerClick").innerHTML = clickScore;
    elem("mult").innerHTML = mult;
    elem("counter").innerHTML = clicks;
    elem("nextUp").innerHTML = nextUp;
    elem("upgrades").innerHTML = upgrades;
    elem("boost").innerHTML = boost == 1 ? "" : "Boost!!!";
    elem("pic").src = boost == 1 ? HIDE_ASS[level] : SHOW_ASS[level];
    elem("lvl").innerHTML = level;
}

document.getElementById("body").addEventListener("click", function(event)
{
    console.log("kokot");
    display();
});

function addOne()
{
    clicks += mult * boost;
    clicks = Number((clicks).toFixed());

    if (clicks >= 100000000)
        canLvlUp = 1;
    else
        canLvlUp = 0;
    
    display();
}

function upgrade()
{
    if (clicks < nextUp)
    {
        display();
        return 0;
    }
    
    clicks -= nextUp;
    clicks = Number(clicks.toFixed());

    mult *= defMult;
    mult = mult.toFixed();
    
    nextUp = (mult * 10).toFixed();
    
    clickScore = Number((mult / 10).toFixed()) + 1;
    clickScore = clickScore ? clickScore : 1;
    upgrades++;

    canLvlUp = clicks >= 100000000;

    display();
    return 1;
}

function maxUpgrade()
{
    while (upgrade()) {}
}

function showImage()
{
    document.getElementById(counterId).style.display = "initial";
}

function hideImage()
{
    document.getElementById(counterId).style.display = "none";
}

function showAss()
{
    boost = 2;
    display();
}

function hideAss()
{
    boost = 1;
    display();
}

function reset()
{
    clicks = 0;
    mult = 1;
    nextUp = Number(mult * 10).toFixed();
    clickScore = 1;
    upgrades = 0;

    display();
}

function resetLvl()
{
    level = 1;
    display();
}

function setCookie(cname, cvalue)
{
    document.cookie = cname + "=" + cvalue + ";";
}

function getCookie(cname)
{
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++)
    {
        let c = ca[i];
        while (c.charAt(0) == ' ')
        {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0)
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function save()
{
    setCookie("clickScore", clickScore);
    setCookie("clicks", clicks);
    setCookie("mult", mult);
    setCookie("boost", boost);
    setCookie("upgrades", upgrades);
    setCookie("level", level);
    setCookie("win", win);
    setCookie("nextUp", nextUp);
    setCookie("canLvlUp", canLvlUp);
}

function load()
{
    clickScore = getCookie("clickScore");
    clickScore = clickScore == "" ? 1 : Number(clickScore);

    clicks = getCookie("clicks");
    clicks = clickScore == "" ? 0 : Number(clicks);

    mult = getCookie("mult");
    mult = mult == "" ? 1 : Number(mult);

    boost = getCookie("boost");
    boost = boost == "" ? 1 : Number(boost);

    upgrades = getCookie("upgrades");
    upgrades = upgrades == "" ? 0 : Number(upgrades);

    level = getCookie("level");
    level = level == "" ? 1 : Number(level);

    win = getCookie("win");
    win = win == "" ? 0 : Number(win);

    nextUp = getCookie("nextUp");
    nextUp = nextUp == "" ? 10 : Number(nextUp);

    canLvlUp = getCookie("canLvlUp");
    canLvlUp = canLvlUp == "" ? 0 : Number(canLvlUp);
}

function lvlUp()
{
    if (clicks < 100000000)
        return;

    if (HIDE_ASS[level+1] == undefined)
    {
        win = 1;
        return;
    }


    level++;
    reset();

    display();
}