document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector(".search");
    const result = document.querySelector(".result");
    const btnElm = document.querySelector(".btn");
    
    btnElm.addEventListener("click", () => {
      fetchApi();
    });
    
    function fetchApi() {
        const searchInputValue = searchInput.value;
        const xmlObj = new XMLHttpRequest();
        xmlObj.open(
            "GET",
            `https://api.dictionaryapi.dev/api/v2/entries/en/${searchInputValue}`,
            true
        );
        xmlObj.onload = () => {
            if (xmlObj.status === 200) {
                const response = JSON.parse(xmlObj.responseText);
                const meanings = response[0]?.meanings || [];
                const definitions = meanings[0]?.definitions || [];
                let resultText = "";
                for (const def of definitions) {
                    resultText += `<li>${def.definition}</li>`;
                }
                if (resultText) {
                  result.style.cssText = "font-size:2.1rem; text-align: left";
                  result.innerHTML = `<ul style="list-style-type: circle">${resultText}</ul>`;
                } else {
                    result.innerHTML = "Sorry,No definitions found.";
                }
            } else {
                console.log("ERROR");
                result.innerHTML = "Please make sure you enter proper word";
            }
        };
        xmlObj.send();
    }
    });