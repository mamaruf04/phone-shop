const searchMobile = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear field
    searchField.value = '';
    console.log(searchText);
}