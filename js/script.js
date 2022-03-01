// take input value
const searchDevice = () => {
    const searchField = document.getElementById('search-field');
    const UnknownSearchText = searchField.value;
    const searchText = UnknownSearchText.toLowerCase();
    // clear field
    searchField.value = '';
    // data load
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.data))
}

const displaySearchResult = devices => {
    const searchResult = document.getElementById('search-result');
    // clear previous search result
    searchResult.textContent ="";
    // get search results
    const display20devices = devices.splice(0, 20);
    display20devices.forEach(device => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card text-center h-100">
                <img src="${device.image}" class="card-img-top w-75 mx-auto p-3" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${device.phone_name}</h5>
                  <h6>${device.brand}</h6>
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
                <button onclick="loaddeviceDetails('${device.slug}')" class="btn btn-outline-light bg-danger w-25 mx-auto mb-4">Details</button>
            </div>
            `;
            searchResult.appendChild(div);
    });
}
// load details data
const loaddeviceDetails = deviceId => {
    const url = `https://openapi.programming-hero.com/api/phone/${deviceId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data));
}
// display details data
const displayPhoneDetails = deviceId => {
    let releaseDate = "";
    if(`${deviceId.releaseDate}` === ""){
        releaseDate = "Relese date not decleared yet.";
    }
    else{
        releaseDate = `${deviceId.releaseDate}`
    }
    const deviceDetails = document.getElementById('phone-details');
    deviceDetails.textContent = "";
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <div class="card">
        <img src="${deviceId.image}" class="card-img-top w-50 mx-auto p-4" alt="...">
        <div class="card-body">
            <h5 class="card-title fw-bold text-center">${deviceId.name}</h5>
            <h6 class="card-title text-center">${deviceId.brand}</h6>
            <h6 class="card-title text-center"><span class="fw-bold">ReleaseDate: </span> ${releaseDate}</h6>
            <h6 class="text-center my-4 fw-bold">MainFeatures</h6>
            <p><span class="fw-bold">ChipSet:</span> ${deviceId.mainFeatures.chipSet}</p>
            <p><span class="fw-bold">Storage:</span> ${deviceId.mainFeatures.storage}</p>
            <p><span class="fw-bold">DisplaySize:</span> ${deviceId.mainFeatures.displaySize}</p>
            <p><span class="fw-bold">Memory:</span> ${deviceId.mainFeatures.memory}</p>
            <p><span class="fw-bold">Memory:</span> ${deviceId.mainFeatures.memory}</p>
            <p><span class="fw-bold">Sensors:</span> ${deviceId.mainFeatures.sensors}</p>
            <h6 class="text-center my-4 fw-bold">Others</h6>
            <p><span class="fw-bold">Bluetooth:</span> ${deviceId.others.Bluetooth}</p>
            <p><span class="fw-bold">WLAN:</span> ${deviceId.others.WLAN}</p>
            <p><span class="fw-bold">GPS:</span> ${deviceId.others.GPS}</p>
            <p><span class="fw-bold">NFC:</span> ${deviceId.others.NFC}</p>
            <p><span class="fw-bold">Radio:</span> ${deviceId.others.Radio}</p>
            <p><span class="fw-bold">USB:</span> ${deviceId.others.USB}</p>
        </div>
    </div>
    `;
    deviceDetails.appendChild(div);
}