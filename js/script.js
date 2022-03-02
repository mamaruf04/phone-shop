// spinner
const toogleSpinner = display => {
    document.getElementById("spinner").style.display = display;
}
// take input value
const searchDevice = () => {
    const searchField = document.getElementById('search-field');
    const UnknownSearchText = searchField.value;
    const searchText = UnknownSearchText.toLowerCase();
    toogleSpinner('block');
    if(searchText === ''){
        const p = document.createElement('p');
        p.innerHTML = `<p class="text-white text-center bg-danger p-1 w-50 mx-auto rounded">please search your product name to display</p>`;
        const div = document.getElementById('error-message');
        div.textContent = "";
        div.appendChild(p);
        toogleSpinner('none');
    }
    else{
        const div = document.getElementById('error-message');
        div.textContent = "";
        // clear field
        searchField.value = '';
        // data load
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data))
    }
}

const displaySearchResult = devices => {
    const searchResult = document.getElementById('search-result');
    const deviceDetails = document.getElementById('phone-details');
    // clear previous search result removed
    searchResult.textContent ="";
    deviceDetails.textContent = "";
    // error message for no result
    if(Object.keys(devices).length == 0){
        const p = document.createElement('p');
        p.innerHTML = `<p class="text-white text-center bg-danger p-1 w-50 mx-auto rounded">No product found! please try again.</p>`;
        const div = document.getElementById('error-message');
        div.appendChild(p); 
    }
    // get search results
    const display20devices = devices.splice(0, 20);
    display20devices.forEach(device => {
        const div = document.createElement('div');
        div.classList.add('col');
        // spinner
        div.innerHTML = `
            <div class="card text-center h-100 rounded-3">
                <img src="${device.image}" class="card-img-top w-75 mx-auto p-3" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${device.phone_name}</h5>
                  <h6>${device.brand}</h6>
                </div>
                <button onclick="loadDeviceDetails('${device.slug}')" class="btn btn-outline-light bg-danger bg-gradient w-50 p-2 fs-5 rounded-pill mx-auto mb-4">Details</button>
            </div>
            `;
            searchResult.appendChild(div);
    });
    toogleSpinner('none');
}
// load details data
const loadDeviceDetails = deviceId => {
    //remove all error message
    const div = document.getElementById('error-message');
    div.textContent = "";
    // load details
    const url = `https://openapi.programming-hero.com/api/phone/${deviceId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data));
}
// display details data
const displayPhoneDetails = deviceId => {
    const deviceDetails = document.getElementById('phone-details');
    // previous data removed
    deviceDetails.textContent = "";
    const div = document.createElement('div');
    // display details html
    div.innerHTML = `
    <div class="container my-4 border rounded p-2 lh-base rounded-3" style="background-color: white;">
        <img src="${deviceId.image}" class="col-md-6 float-md-start mb-3 me-md-4 align-middle" style="width: 43%;" alt="...">
        <h5 class="fw-bold fs-2 text-center text-md-start text-lg-star">${deviceId.name}</h5>
        <h6 class="fw-bold fs-5 text-center text-md-start text-lg-star">${deviceId.brand}</h6>
        <h6 class="text-center text-md-start text-lg-star"><span class="fw-bold">ReleaseDate: </span> <span class="fw-normal fst-italic">${deviceId.releaseDate ? deviceId.releaseDate : 'Relese date not decleared yet.'}</span></h6>
        <h6 class="fs-5 text-center text-md-start text-lg-star fw-bold my-4 fst-italic text-success">MainFeatures</h6>
        <p><span class="fw-bold">ChipSet:</span> ${deviceId.mainFeatures.chipSet ? deviceId.mainFeatures.chipSet : 'Details Not Found'}</p>
        <p><span class="fw-bold pe-2">Storage:</span> ${deviceId.mainFeatures.storage}</p>
        <p><span class="fw-bold">DisplaySize:</span> ${deviceId.mainFeatures.displaySize}</p>
        <p><span class="fw-bold">Memory:</span> ${deviceId.mainFeatures.memory}</p>
        <p><span class="fw-bold">Sensors:<br></span> ${deviceId.mainFeatures.sensors}</p>
        <h6 class="fs-5 my-2 text-center text-md-start text-lg-star fw-bold fst-italic text-success">Others</h6>
        <p><span class="fw-bold">Bluetooth:</span> ${deviceId.others?.Bluetooth? deviceId.others.Bluetooth : 'no data found'}</p>
        <p><span class="fw-bold">WLAN:</span> ${deviceId.others?.WLAN? deviceId.others.WLAN : 'nothing found' }</p>
        <p><span class="fw-bold">GPS:</span> ${deviceId.others?.GPS ? deviceId.others.GPS : 'no data found'}</p>
        <p><span class="fw-bold">NFC:</span> ${deviceId.others?.NFC ? deviceId.others.NFC : 'no data found'}</p>
        <p><span class="fw-bold">Radio:</span> ${deviceId.others?.Radio ? deviceId.others.Radio : 'no data found'}</p>
        <p><span class="fw-bold">USB:</span> ${deviceId.others?.USB ? deviceId.others.USB : 'no data found'}</p>
    </div>
    `;
    deviceDetails.appendChild(div);
}