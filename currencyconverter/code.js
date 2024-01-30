BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".fromsight select");
const toCurr = document.querySelector(".tosight select");
const msg = document.querySelector(".msg");


for (let select of dropdowns) {
    for (currCode in countryList) {
        // console.log(code, countryList[code])
        let newOpt = document.createElement("option");
        newOpt.innerText = currCode;
        newOpt.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOpt.selected = "selected";
        }
        else if (select.name === "to" && currCode === "INR") {
            newOpt.selected = "selected";
        }
        select.append(newOpt);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

//to click button
const updateExchangeRate =async()=>{
    
    let amount = document.querySelector("form input");
    let amtval = amount.value;
    
    if (amtval === "" || amtval < 1) {
        amtval = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response = await fetch(URL);
    let data = await response.json()
    let rate = data[toCurr.value.toLowerCase()];

    let finalAmount = (amtval * rate);
    msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
};
//to update flag
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});
window.addEventListener("load",()=>{
    updateExchangeRate();
});
