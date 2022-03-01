const searchMobile = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear field
    searchField.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.data))
}

const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent ="";
    phones.forEach(phone => {
        // console.log(phone);
        // clear previous search result
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card text-center h-100">
                <img src="${phone.image}" class="card-img-top w-75 mx-auto p-3" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <h6>${phone.brand}</h6>
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-outline-light bg-primary w-25 mx-auto mb-4">Details</button>
            </div>
            `;
            searchResult.appendChild(div);
    });
}

const loadPhoneDetails = phoneId => {
    // console.log(phoneId);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data));
}

const displayPhoneDetails = phoneId => {
    console.log(phoneId);
    let releaseDate = "";
    if(`${phoneId.releaseDate}` === ""){
        releaseDate = "Relese date not decleared yet.";
    }
    else{
        releaseDate = `${phoneId.releaseDate}`
    }
    const phoneDetails = document.getElementById('phone-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <div class="card">
        <img src="${phoneId.image}" class="card-img-top w-50 mx-auto p-4" alt="...">
        <div class="card-body">
            <h5 class="card-title fw-bold text-center">${phoneId.name}</h5>
            <h6 class="card-title text-center">${phoneId.brand}</h6>
            <h6 class="card-title text-center"><span class="fw-bold">ReleaseDate: </span> ${releaseDate}</h6>
            <h6 class="text-center my-4 fw-bold">MainFeatures</h6>
            <p><span class="fw-bold">ChipSet:</span> ${phoneId.mainFeatures.chipSet}</p>
            <p><span class="fw-bold">Storage:</span> ${phoneId.mainFeatures.storage}</p>
            <p><span class="fw-bold">DisplaySize:</span> ${phoneId.mainFeatures.displaySize}</p>
            <p><span class="fw-bold">Memory:</span> ${phoneId.mainFeatures.memory}</p>
            <p><span class="fw-bold">Memory:</span> ${phoneId.mainFeatures.memory}</p>
            <p><span class="fw-bold">Sensors:</span> ${phoneId.mainFeatures.sensors}</p>
            <h6 class="text-center my-4 fw-bold">Others</h6>
            <p><span class="fw-bold">Bluetooth:</span> ${phoneId.others.Bluetooth}</p>
            <p><span class="fw-bold">WLAN:</span> ${phoneId.others.WLAN}</p>
            <p><span class="fw-bold">GPS:</span> ${phoneId.others.GPS}</p>
            <p><span class="fw-bold">NFC:</span> ${phoneId.others.NFC}</p>
            <p><span class="fw-bold">Radio:</span> ${phoneId.others.Radio}</p>
            <p><span class="fw-bold">USB:</span> ${phoneId.others.USB}</p>
        </div>
    </div>
    `;
    phoneDetails.appendChild(div);
}