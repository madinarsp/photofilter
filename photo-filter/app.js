
/* Self evaluation */
console.log('part 1 - implement basic html, css, js - 10/10');
console.log('part 2 - add additional functionality (compulsory one) - 10/10');
console.log('   - add new filters');
console.log('   - add presets with filters');
console.log('part 3 - add additional functionality (at least one) - 10/10');
console.log('   - add reset button');
console.log('   - implement upload image functionality');


/* Changing inputs' values */

const inputs = document.querySelectorAll('.input-controlled');

function handleUpdate() {
    //console.log(this.value);
    const suffix = this.dataset.metrics || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach(input => input.addEventListener('input', handleUpdate));


/* Apply preset's filters */

const img = document.querySelector('.selected-img-wrapper img');
const originalStyle = getComputedStyle(img);

const presets = document.querySelectorAll('.preset');

function getFiltersMap(style) {
    let filtersMap = new Map();
    style.filter.split(' ').forEach(filter => {
        let tempArr = filter.substring(0, filter.length - 1).split('(');
        filtersMap.set(tempArr[0], tempArr[1]);
    });
    return filtersMap;
}

function applyFilters(inputFiltersMap) {
    inputFiltersMap.forEach((value, key) => {
        //console.log(`${key}:${value}`);
        document.documentElement.style.setProperty(`--${key}`, value);
        let currInput = document.getElementsByName(key);
        if(currInput[0].dataset.metrics == '%') {
            currInput[0].value = value * 100;
        }
        else currInput[0].value = value;
    });
}

const origFiltersMap = getFiltersMap(originalStyle);

function applyOriginalFilters() {
    applyFilters(origFiltersMap);
}

function applyPresetFilters() {

    applyOriginalFilters();

    let map = getFiltersMap(getComputedStyle(this));
    applyFilters(map);

}

presets.forEach(preset => preset.addEventListener('click', applyPresetFilters));


/* Reset button */

const resetBtn = document.querySelector('.reset-btn');

resetBtn.addEventListener('click', applyOriginalFilters);


const fileInput = document.querySelector('.input-file');
fileInput.style.opacity = 0;


function getValidFileTypesArr() {
    let acceptExtensionsArr = fileInput.getAttribute('accept').split(',');
    acceptExtensionsArr = acceptExtensionsArr.map(element => "image/" + element.trim().substring(1));
    return acceptExtensionsArr;
}

const validFileTypesArr = getValidFileTypesArr();

function updateImage() {
    let selectedFiles = fileInput.files;
    if(selectedFiles.length != 0) {
        //console.log(selectedFiles[0]);
        if(validFileTypesArr.includes(selectedFiles[0].type)) {
            let images = document.querySelectorAll('img');
            images.forEach(image => 
                image.setAttribute('src', window.URL.createObjectURL(selectedFiles[0])));
        }
    }
}

fileInput.addEventListener('change', updateImage);
