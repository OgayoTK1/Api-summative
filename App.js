const dropList = document.querySelectorAll("form select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

// Populate currency dropdowns
for (let i = 0; i < dropList.length; i++) {
    for(let currency_code in country_list){
        // Safely check if country_list exists and has the currency code
        if (!country_list.hasOwnProperty(currency_code)) continue;

        // selecting USD by default as FROM currency and AFN as TO currency
        let selected = i == 0 
            ? (currency_code == "USD" ? "selected" : "") 
            : (currency_code == "AFN" ? "selected" : "");
        
        // Creating option tag with passing currency code as a text and value
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        
        // Inserting options tag inside select tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target); // Calling loadFlag with passing target element as an argument
    });
}

// Load flag for selected currency
function loadFlag(element){
    // Safely check if element and parent exist
    if (!element || !element.parentElement) return;

    for(let code in country_list){
        if(!country_list.hasOwnProperty(code)) continue;

        if(code == element.value){ // If currency code of country list is equal to option value
            let imgTag = element.parentElement.querySelector("img"); 
            
            // Safely check if img tag exists
            if (imgTag) {
                // Passing country code of a selected currency code in a img url
                imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
                // Add error handling for image loading
                imgTag.onerror = () => {
                    imgTag.src = 'path/to/default/flag/image.png'; // Fallback image
                };
            }
        }
    }
}

// Load exchange rate on window load
window.addEventListener("load", () => {
    getExchangeRate();
});

// Get exchange rate on button click
getButton.addEventListener("click", e => {
    e.preventDefault(); // Preventing form from submitting
    getExchangeRate();
});

// Exchange icon click handler
const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", () => {
    // Swap currency codes
    let tempCode = fromCurrency.value; 
    fromCurrency.value = toCurrency.value; 
    toCurrency.value = tempCode; 
    
    // Update flags
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    
    // Get new exchange rate
    getExchangeRate(); 
});

// Fetch and display exchange rate
function getExchangeRate(){
    const amount = document.querySelector("form input");
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
    
    // Validate and set default amount
    let amountVal = parseFloat(amount.value);
    if(isNaN(amountVal) || amountVal <= 0){
        amount.value = "1";
        amountVal = 1;
    }
    
    // Show loading state
    exchangeRateTxt.innerText = "Getting exchange rate...";
    
    // API endpoint
    const API_KEY = 'fcf0919d58d0cd6f03f2cd0b';
    let url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;
    
    // Fetch exchange rate
    fetch(url)
        .then(response => {
            // Check if response is ok
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(result => {
            // Safely get exchange rate
            let exchangeRate = result.conversion_rates?.[toCurrency.value];
            
            if (!exchangeRate) {
                throw new Error('Exchange rate not found');
            }
            
            // Calculate total exchange rate
            let totalExRate = (amountVal * exchangeRate).toFixed(2);
            
            // Display exchange rate
            exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
        })
        .catch(error => {
            // Improved error handling
            console.error('Fetch error:', error);
            exchangeRateTxt.innerText = "Failed to get exchange rate. Please try again.";
        });
}