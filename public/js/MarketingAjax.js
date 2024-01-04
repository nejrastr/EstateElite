const MarketingAjax = (() => {
    async function osvjeziPretrage(divNekretnine) {
        const nekretnine = divNekretnine.querySelectorAll('divNekretnine');
        const nizNekretnina = Array.from(nekretnine).map(nekretnina => parseInt(nekretnina.dataset.propertyId));

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/marketing/nekretnine', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const result = JSON.parse(xhr.responseText);
                    console.log(result); 
                } else {
                    console.error('HTTP error! Status:', xhr.status);
                }
            }
        };

        const requestBody = JSON.stringify({ nizNekretnina });
        xhr.send(requestBody);
    }

    return {
        osvjeziPretrage: osvjeziPretrage
    };
})();


