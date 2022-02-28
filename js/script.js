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

const displaySearchResult = (phones) => {
    phones.forEach(phone => {
        console.log(phone);
        const searchResult = document.getElementById('search-result');
        // clear previous search result
        // searchResult.textContent = '';
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card text-center">
                <img src="${phone.image}" class="card-img-top w-75 mx-auto p-3" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <h6>${phone.brand}</h6>
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
                <button class="btn btn-outline-light bg-primary w-25 mx-auto mb-4">Details</button>
            </div>
            `
            searchResult.appendChild(div);
    });
}