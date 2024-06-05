const lenghtDisplay = document.querySelector("[data-lengthNumber]")
const inputSlider = document.querySelector("[data-lengthSlider]")
const passwordDisplay = document.querySelector("[data-passwordDisplay]")
const copyBtn = document.querySelector("[data-copy]")
const copyMsg = document.querySelector("[data-copyMsg]")
const uppercaseCheck = document.querySelector("#upperCase")
const lowercaseCheck = document.querySelector("#lowerCase")
const numbersCheck = document.querySelector("[data-numbers]")
const symbolsCheck = document.querySelector("[data-symbols]")
const indicator = document.querySelector("[data-indicator]")
const generateBtn =document.querySelector(".generate-button")
const allCheckBox = document.querySelectorAll("input[type=checkbox] ")
const symbols = '~`!@#$%^&*()_-+={[}]|\?/>.<,~'


let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();

//set indicatior's initial color
setIndicator("#ccc");


function handleSlider(){    
    inputSlider.value = passwordLength;
        lenghtDisplay.innerText = passwordLength;

        const min = inputSlider.min;
        const max = inputSlider.max;

    inputSlider.style.backgroundSize = ((passwordLength - min)*100/(max-min)) + "% 100%"
           
}


function setIndicator(color){
indicator.style.backgroundColor = color;
//shadow in homeword
indicator.style.boxShadow = `0px 0px 12px 1px ${color}`
}

function getRndInteger(min, max){
   return Math.floor(Math.random()*(max-min)+min)
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol(){
   const randNum = getRndInteger(0, symbols.length)
   return symbols.charAt(randNum);
}




function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum  = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength){
        setIndicator("green");
    }else if(
       (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passwordLength >= 6
    ){
        setIndicator("orange");
    }else{
        setIndicator("red");
    }
}

async function copyContent(){
    try{
     await navigator.clipboard.writeText  (passwordDisplay.value);
     copyMsg.innerText = "copied";
    }
    catch(e){
        copyMsg.innerText = "failed";
    }
    // make copy text visible
copyMsg.classList("active");

setTimeout(() => {
    copyMsg.classList.remove("active");
}, 2000);
    }

    function shufflePassword(array){
        for (let i = array.lenght - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        } 
    
        let str = "";
        array.forEach((el) => {str +=el});
        return str;
    }
    
    function handleCheckBoxChange() {
        checkCount = 0;
        allCheckBox.forEach((checkbox) => {
         if(checkbox.checked)
             checkCount++;
         }
        )
     }
    
     
    if(passwordLength < checkCount){
        passwordLength = checkCount;
       handleSlider();
    }
  
    
    allCheckBox.forEach((checkbox) => {
        checkbox.addEventListener('change', handleCheckBoxChange);
    })
    
    inputSlider.addEventListener("input", (e) => {
        passwordLength = +e.target.value;
        handleSlider();
    });

copyBtn.addEventListener("click", () => {
    if(passwordDisplay.value)
        copyContent();
});

generateBtn.addEventListener("click", () => {
     
    // none of the checkbox are selected

    if(checkCount == 0) return;

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    console.log("starting journey...");
    // let's start finding new password

    password = "";

    // if(uppercaseCheck.checked){
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.checked){
    //     password += generateLowerCase();
    // }

    // if(numbersCheck.checked){
    //     password += generateRandomNumber();
    // }

    // if(symbolsCheck.checked){
    //     password += generateSymbol();
    // }

      let funcArr = [];

      if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);
      

      if(lowercaseCheck.checked) 
        funcArr.push(generateLowerCase);
      

      if(numbersCheck.checked)
      funcArr.push(generateRandomNumber);     

      if(symbolsCheck.checked) 
        funcArr.push(generateSymbol);
      

      // required address

      for( let i = 0; i < funcArr.length; i++ ) {
        password += funcArr[i]();
      }
  console.log("compulsary addition done");
      // remaining parameters

      for ( let i = 0; i<passwordLength-funcArr.length; i++ ){
        let randIndex = getRndInteger(0, funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
      }
   console.log("Remaining addition done")
      // shuffle password
      password = shufflePassword(Array.from(password));
      console.log("Shuffling done")
      passwordDisplay.value = password;

      console.log("UI addition done");
      calcStrength();


})

