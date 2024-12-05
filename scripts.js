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
    1: "amogus_front1.jpeg",
    2: "amogus_front2.gif",
    3: "amogus_front3.gif"
};
const SHOW_ASS = {
    1: "amogus_back1.gif",
    2: "amogus_back2.gif",
    3: "amogus_back3.gif"
};

function addOne(counterId, lvlUpId)
{
    elem(counterId).innerHTML = Number((clicks += mult * boost).toFixed());
    if (clicks >= 100000000)
        elem(lvlUpId).style.display = "initial";
}

function upgrade(counterId, multElemId, nextUpId, clickScoreId, upgradesId)
{
    if (clicks < mult*10)
        return 0;
    
    let el = elem(counterId);
    let multEl = elem(multElemId);
    
    clicks -= mult*10;
    clicks = Number(clicks.toFixed());
    mult *= defMult;
    mult = mult.toFixed(2);
    
    multEl.innerHTML = mult;
    el.innerHTML = clicks;
    elem(nextUpId).innerHTML = (mult * 10).toFixed();
    
    clickScore = Number((mult / 10).toFixed()) + 1;
    clickScore = clickScore ? clickScore : 1;
    elem(clickScoreId).innerHTML = clickScore;

    elem(upgradesId).innerHTML = ++upgrades;
    
    return 1;
}

function maxUpgrade(counterId, multElemId, nextUpId, clickScoreId, upgradesId)
{
    while (upgrade(counterId, multElemId, nextUpId, clickScoreId, upgradesId)) {}
}

function showImage(counterId)
{
    document.getElementById(counterId).style.display = "initial";
}

function hideImage(counterId)
{
    document.getElementById(counterId).style.display = "none";
}

function showAss(counterId, boostId)
{
    elem(counterId).src = SHOW_ASS[level];
    boost = 2;
    elem(boostId).innerHTML = "Boost!!!";
}

function hideAss(counterId, boostId)
{
    elem(counterId).src = HIDE_ASS[level];
    boost = 1;
    elem(boostId).innerHTML = "";
}

function reset(counterId, multElemId, nextUpId, clickScoreId, upgradesId)
{
    clicks = 0;
    elem(counterId).innerHTML = clicks;
    mult = 1;
    elem(multElemId).innerHTML = mult;
    elem(nextUpId).innerHTML = Number(mult * 10).toFixed();
    clickScore = 1;
    elem(clickScoreId).innerHTML = clickScore;
    upgrades = 0;
    elem(upgradesId).innerHTML = upgrades;
}

function resetLvl(lvlId, picId)
{
    level = 1;
    elem(lvlId).innerHTML = level;
    elem(picId).src = boost == 1 ? HIDE_ASS[level] : SHOW_ASS[level];
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

function display(clickScoreId, multId, counterId, nextUpId, upId, boostId, picId, lvlId)
{
    elem(clickScoreId).innerHTML = clickScore;
    elem(multId).innerHTML = mult;
    elem(counterId).innerHTML = clicks;
    elem(nextUpId).innerHTML = mult*10;
    elem(upId).innerHTML = upgrades;
    elem(boostId).innerHTML = boost == 1 ? "" : "Boost!!!";
    elem(picId).src = boost == 1 ? HIDE_ASS[level] : SHOW_ASS[level];
    elem(lvlId).innerHTML = level;
}

function lvlUp(counterId, multElemId, nextUpId, clickScoreId, upgradesId, lvlUpId, lvlId, picId, boostId, winId, mainId, div2Id)
{
    if (clicks < 100000000)
        return;

    if (HIDE_ASS[level+1] == undefined)
    {
        elem(boostId).innerHTML = "";
        elem(winId).style.display = "initial";
        elem(mainId).style.display = "none";
        elem(picId).style.display = "none";
        elem(div2Id).style.height = "100%";
        elem(div2Id).style.width = "100%";
        elem(div2Id).style.textAlign = "center";
        elem(div2Id).style.margin = "0";
        elem(div2Id).style.padding = "0";
        elem(winId).style.textAlign = "center";
        return;
    }


    level++;
    console.log(HIDE_ASS[level]);
    reset(counterId, multElemId, nextUpId, clickScoreId, upgradesId);
    elem(lvlUpId).style.display = "none";
    elem(lvlId).innerHTML = level;

    boost = 1;
    elem(picId).src = HIDE_ASS[level];
    elem(boostId).innerHTML = "";
}
