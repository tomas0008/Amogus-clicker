function elem(elemId)
{
    return document.getElementById(elemId);
}


let count = 0;
let mult = 1;
let boost = 1;
const defMult = 1.5;

function addOne(elemId)
{
    elem(elemId).innerHTML = Number((count += 1 * mult * boost).toFixed(2));
}

function upgrade(elemId, multElemId, nextUpId)
{
    if (count < mult*10)
        return 0;
    
    let el = elem(elemId);
    let multEl = elem(multElemId);
    
    count -= mult*10;
    count = Number(count.toFixed(2));
    mult *= defMult;
    mult = mult.toFixed(2);
    
    multEl.innerHTML = mult;
    el.innerHTML = count;
    elem(nextUpId).innerHTML = mult * 10;
    
    return 1;
}

function maxUpgrade(elemId, multElemId, nextUpId)
{
    while (upgrade(elemId, multElemId, nextUpId))
    {
        
    }
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
    elem(elemId).src = "amogus_back.gif";
    boost = 2;
    elem(boostId).innerHTML = "Boost!!!";
}

function hideAss(elemId, boostId)
{
    elem(elemId).src = "amogus_front.jpeg";
    boost = 1;
    elem(boostId).innerHTML = "";
}

function reset(elemId, multElemId, nextUpId)
{
    count = 0;
    elem(elemId).innerHTML = count;
    mult = 1;
    elem(multElemId).innerHTML = mult;
    elem(nextUpId).innerHTML = Number(mult * 10).toFixed(2);
}