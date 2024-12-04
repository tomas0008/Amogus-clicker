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

const defMult = 1.5;
const HIDE_ASS = {
    1: "amogus_front1.jpeg"
};
const SHOW_ASS = {
    1: "amogus_back1.gif"
};

function addOne(elemId)
{
    elem(elemId).innerHTML = Number((clicks += 1 * mult * boost).toFixed(2));
}

function upgrade(elemId, multElemId, nextUpId, clickScoreId, upgradesId)
{
    if (clicks < mult*10)
        return 0;
    
    let el = elem(elemId);
    let multEl = elem(multElemId);
    
    clicks -= mult*10;
    clicks = Number(clicks.toFixed(2));
    mult *= defMult;
    mult = mult.toFixed(2);
    
    multEl.innerHTML = mult;
    el.innerHTML = clicks;
    elem(nextUpId).innerHTML = mult * 10;
    
    clickScore = Number((mult / 10).toFixed()) + 1;
    clickScore = clickScore ? clickScore : 1;
    elem(clickScoreId).innerHTML = clickScore;

    elem(upgradesId).innerHTML = ++upgrades;
    
    return 1;
}

function maxUpgrade(elemId, multElemId, nextUpId, clickScoreId, upgradesId)
{
    while (upgrade(elemId, multElemId, nextUpId, clickScoreId, upgradesId)) {}
}

function showImage(elemId)
{
    document.getElementById(elemId).style.display = "initial";
}

function hideImage(elemId)
{
    document.getElementById(elemId).style.display = "none";
}

function showAss(elemId, boostId)
{
    elem(elemId).src = SHOW_ASS[level];
    boost = 2;
    elem(boostId).innerHTML = "Boost!!!";
}

function hideAss(elemId, boostId)
{
    elem(elemId).src = HIDE_ASS[level];
    boost = 1;
    elem(boostId).innerHTML = "";
}

function reset(elemId, multElemId, nextUpId, clickScoreId, upgradesId)
{
    clicks = 0;
    elem(elemId).innerHTML = clicks;
    mult = 1;
    elem(multElemId).innerHTML = mult;
    elem(nextUpId).innerHTML = Number(mult * 10).toFixed(2);
    elem(clickScoreId).innerHTML = 1;
    elem(upgradesId).innerHTML = 0;
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
}

function display(clickScoreId, multId, counterId, nextUpId, upId, boostId, picId)
{
    elem(clickScoreId).innerHTML = clickScore;
    elem(multId).innerHTML = mult;
    elem(counterId).innerHTML = clicks;
    elem(nextUpId).innerHTML = mult*10;
    elem(upId).innerHTML = upgrades;
    elem(boostId).innerHTML = boost == 1 ? "" : "Boost!!!";
    elem(picId).src = boost == 1 ? HIDE_ASS[level] : SHOW_ASS[level];
}