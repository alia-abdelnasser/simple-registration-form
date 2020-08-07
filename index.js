(function () {
    let submitUrl = 'https://my-json-server.typicode.com/alia-abdelnasser/simple-registration-form-ar/accounts';
    let countriesUrl = 'https://my-json-server.typicode.com/alia-abdelnasser/simple-registration-form-ar/countries';
    let citiesUrl = 'https://my-json-server.typicode.com/alia-abdelnasser/simple-registration-form-ar/cities';

    let nameEl = document.querySelector('#name');
    let countryEl = document.querySelector('#country');
    let cityEl = document.querySelector('#city');
    let dateOfBirthEl = document.querySelector('#dateOfBirth');
    let femaleEl = document.querySelector('#female');
    let maleEl = document.querySelector('#male');
    let questionEl = document.querySelector('#question');
    let answerEl = document.querySelector('#answer');

    let nameVM = document.querySelector('.validation-msg-name');
    let countryVM = document.querySelector('.validation-msg-country');
    let cityVM = document.querySelector('.validation-msg-city');
    let dateOfBirthVM = document.querySelector('.validation-msg-dateOfBirth');

    let submitBtn = document.querySelector('#submitBtn');
    let loader = document.querySelector('.lds-ellipsis');
    let resultMsg = document.querySelector('.result-msg');

    function post(url, data, cb) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            cb(this.responseText);
        }
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    }

    function get(url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            cb(JSON.parse(this.responseText));
        }
        xhr.open('GET', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();
    }

    ///////////////// NAME ////////////////////////

    // check if field is empty
    function validateName() {
        if (nameEl.value.trim().length === 0) {
            nameEl.style.borderBottom = '1px solid red';
            nameVM.textContent = 'الاسم مطلوب';
            nameVM.style.display = 'block';
            return false;
        } else {
            nameEl.style.borderBottom = '1px solid #606060';
            nameVM.style.display = 'none';
            return true;
        }
    }

    // on blur validate, hide resultMsg
    nameEl.addEventListener('blur', function () { validateName(); resultMsg.style.display = 'none'; });
    // on keyup (change) validate
    nameEl.addEventListener('keyup', validateName);

    ///////////////// COUNTRY ////////////////////////

    // get countries from api then draw them
    function getCountries() {
        // show loader
        loader.style.display = 'inline-block';

        // get countries from api then draw them
        get(countriesUrl, res => {
            drawCountries(res);
        });
    }

    // draw on DOM
    function drawCountries(countries) {
        countries.forEach(country => {
            countryEl.options[countryEl.options.length] = new Option(country.name, country.id);
        });

        // hide loader
        loader.style.display = 'none';
    }

    getCountries();

    // check if field not selected
    function validateCountry() {
        if (countryEl.value == 0) {
            countryEl.style.borderBottom = '1px solid red';
            countryVM.textContent = 'البلد مطلوب';
            countryEl.style.color = '#d2d2d2';
            countryVM.style.display = 'block';
            return false;
        } else {
            countryEl.style.borderBottom = '1px solid #606060';
            countryVM.style.display = 'none';
            countryEl.style.color = '#606060';
            return true;
        }
    }

    // on change validate, get cities
    countryEl.addEventListener('change', function () { validateCountry(); getCities(countryEl.value) });
    // on blur validate, hide resultMsg
    countryEl.addEventListener('blur', function () { validateCountry(); resultMsg.style.display = 'none'; });

    ///////////////// CITY ////////////////////////

    // get cities from api then draw them
    function getCities(countryId) {
        // show loader
        loader.style.display = 'inline-block';

        get(citiesUrl + '?countryId=' + countryId, function (res) {
            drawCities(res);
        });
    }

    // draw on DOM
    function drawCities(citie) {
        cityEl.innerHTML = '';
        cityEl.style.borderBottom = '1px solid #606060';
        cityVM.style.display = 'none';
        cityEl.style.color = '#606060';

        citie.forEach(city => {
            cityEl.options[cityEl.options.length] = new Option(city.name, city.id);
        });

        // hide loader
        loader.style.display = 'none';
    }

    // check if field not selected
    function validateCity() {
        if (cityEl.value == 0) {
            cityEl.style.borderBottom = '1px solid red';
            cityVM.textContent = 'المدينة مطلوبة';
            cityVM.style.display = 'block';
            cityEl.style.color = '#d2d2d2';
            return false;
        } else {
            cityEl.style.borderBottom = '1px solid #606060';
            cityVM.style.display = 'none';
            cityEl.style.color = '#606060';
            return true;
        }
    }

    // on change validate
    cityEl.addEventListener('change', function () { validateCity(); });
    // on blur validate, hide resultMsg
    cityEl.addEventListener('blur', function () { validateCity(); resultMsg.style.display = 'none'; });

    ///////////////// DATE OF BIRTH ////////////////////////

    // check if field not selected
    function validateDateOfBirth() {
        if (dateOfBirthEl.value === "") {
            dateOfBirthEl.style.borderBottom = '1px solid red';
            dateOfBirthVM.textContent = 'تاريخ الميلاد مطلوب';
            dateOfBirthVM.style.display = 'block';
            return false;
        } else {
            dateOfBirthEl.style.borderBottom = '1px solid #606060';
            dateOfBirthVM.style.display = 'none';
            return true;
        }
    }

    // on change validate, hide resultMsg
    dateOfBirthEl.addEventListener('change', function () { validateDateOfBirth(); resultMsg.style.display = 'none'; });

    ///////////////// GENDER ////////////////////////

    // on change set question, hide resultMsg
    femaleEl.addEventListener('change', function () { setQuestion(); resultMsg.style.display = 'none'; });
    maleEl.addEventListener('change', function () { setQuestion(); resultMsg.style.display = 'none'; });

    ///////////////// QUESTION ////////////////////////

    function setQuestion() {
        if (femaleEl.checked) {
            questionEl.textContent = 'هل تفضلين الوردي أم الزهري؟';
        }
        if (maleEl.checked) {
            questionEl.textContent = 'هل تفضل ميسي أم رونالدو؟';
        }
        answerEl.value = '';
    }

    setQuestion();

    ///////////////// SUBMIT ////////////////////////
    function validateForm() {
        // validate required field and focus on first error
        if (!validateName()) {
            nameEl.focus();
            return;
        }
        if (!validateCountry()) {
            countryEl.focus();
            return;
        }
        if (!validateCity()) {
            cityEl.focus();
            return;
        }
        if (!validateDateOfBirth()) {
            dateOfBirthEl.focus();
            return;
        }

        submitForm();
    }

    function submitForm() {
        // show loader
        loader.style.display = 'inline-block';

        // disable button
        submitBtn.disabled = true;

        // build payload
        let data = {
            "name": nameEl.value.trim(),
            "country_id": parseInt(countryEl.value),
            "city_id": parseInt(cityEl.value),
            "date_of_birth": dateOfBirthEl.value,
            "gender": femaleEl.checked ? femaleEl.value : maleEl.checked ? maleEl.value : '',
            "male_question": maleEl.checked ? answerEl.value.trim() : null,
            "female_question": femaleEl.checked ? answerEl.value.trim() : null
        };

        post(submitUrl, data, function (res) {
            // display result
            resultMsg.textContent = 'تم التسجيل بنجاح';
            resultMsg.style.display = 'block';
            // hide loader
            loader.style.display = 'none';
            // enable button
            submitBtn.disabled = false;
        });
    }

    submitBtn.addEventListener('click', validateForm);
})();
