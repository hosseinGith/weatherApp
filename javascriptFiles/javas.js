function main() {
    const cityName = document.querySelector('.nameCity')
    const btnCheckCity = document.querySelector('.btnCity')
    const backgroundContainer = document.querySelector('.ContainerBtnCity')
    const errType = document.querySelector('.Error')

    const cityTitle = document.querySelector('.cityTitle')
    const descriptionInner = document.querySelector('.description')
    const animation = document.querySelector('.animation')
    const temp = document.querySelector('.temp')
    const wind_speed = document.querySelector('.wind_speed')
    const spans = document.querySelectorAll('.cityInfo span')
    const cityInfo = document.querySelector('.cityInfo')
    const cityNotFound = document.querySelector('.cityNotFound')

    const imgclearSky = ['imgs/BKGIMGClearSky.jpg', 'imgs/BKGIMGClearSky2.jpg',]
    const imgFogSky = ['imgs/BKGIMGFogSky.jpg', 'imgs/BKGIMGFogSky2.jpg']
    const imgRainSky = ['imgs/BKGIMGRainSky.jpg', 'imgs/BKGIMGRainSky2.jpg',]
    const imgLightRainSky = ['imgs/BKGIMGLightRainSky.jpg', 'imgs/BKGIMGLightRainSky2.jpg',]
    const imgFewClouds = ['imgs/BKGIMGFewCloudsSky.jpg', 'imgs/BKGIMGFewCloudsSky2.jpg',]
    const ImgScatteredClouds = ['imgs/BKGIMGScatteredCloudsSky.jpg', 'imgs/BKGIMGScatteredCloudsSky2.jpg',]

    const fa = 'ضصثقفغعهخحجچشسیبلاتن*-مککگپظطزرذدئو.)%-(*^@!~`"|?/\\<>1234567890#_$' + "'"

    const XHR = new XMLHttpRequest()

    let checkInputs = true

    function setBackground(imgGround) {
        let mathimgs = Math.floor(Math.random() * 2)
        mathimgs === 2 ? mathimgs = 1 : mathimgs
        backgroundContainer.style.background = `url(${imgGround[mathimgs]}) center no-repeat`
        backgroundContainer.style.backgroundSize = `cover`
    }

    // for check city name Input
    function checkInputValues(input) {
        if (!input) {
            checkInputs = false
            return errType.classList.remove('active')
        }
        for (let index = 0; index < fa.length; index++) {
            if (input.indexOf(fa[index], 0) !== -1) {
                checkInputs = false
                errType.classList.add('active')
                return
            } else {
                checkInputs = true
                errType.classList.remove('active')
            }
        }


    }
    let description = ''
    function translateLetters(getCity) {
        if (getCity.weather[0].description === 'clear sky') {
            description = 'آسمان صاف'
            setBackground(imgFewClouds)
            return description
        } else if (getCity.weather[0].description === 'few clouds') {
            description = 'کم ابر'
            setBackground(imgclearSky)
            return description
        } else if (getCity.weather[0].description === 'haze') {
            description = 'مه'
            setBackground(imgFogSky)
            return description
        } else if (getCity.weather[0].description === 'broken clouds') {
            description = 'ابرهای شکسته'
            setBackground(imgFogSky)
            return description
        } else if (getCity.weather[0].description === 'scattered clouds') {
            description = 'ابرهای پراکنده'
            setBackground(ImgScatteredClouds)
            return description
        } else if (getCity.weather[0].description === 'moderate rain') {
            description = 'باران متوسط'
            setBackground(imgLightRainSky)
            return description
        } else if (getCity.weather[0].description.indexOf['thunder', 0] !== -1) {
            description = 'رعد و برق'
            setBackground(imgLightRainSky)
            return description
        } else if (getCity.weather[0].description.indexOf['rain', 0] !== -1) {
            description = 'بارش باران'
            setBackground(imgRainSky)
            return description
        } else {
            setBackground(imgclearSky)
            return getCity.weather[0].description
        }
    }


    async function btnClick() {
        if (!checkInputs)
            return;
        let trimVlues = cityName.value.trim()

        XHR.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${trimVlues}&appid=373ed2aa51cdf62a1aaeed49dfc350b4`, true)

        if (XHR.status !== 200) {
            cityTitle.innerText = ''
            animation.classList.add('active')
            cityInfo.classList.add('active')
            cityTitle.classList.remove('active')
            cityNotFound.innerHTML = ''
            descriptionInner.innerText = ''
            temp.innerText = ''
            wind_speed.innerText = ''
            for (let index = 0; index < spans.length; index++) {
                spans[index].classList.remove('active')
            }
        }
        XHR.onload = () => {
            if (XHR.status === 404) {
                animation.classList.remove('active')
                cityNotFound.classList.add('active')
                cityNotFound.innerHTML = 'شهر پیدا نشد'
                cityTitle.innerText = ''
                setTimeout(() => {
                    console.clear();
                }, 300)
                return
            } else {
                cityNotFound.innerHTML = ''
                animation.classList.add('active')
                cityNotFound.classList.remove('active')
            }
            const getCity = JSON.parse(XHR.response)
            cityTitle.innerText = getCity.name
            cityInfo.classList.remove('active')
            cityTitle.classList.add('active')
            animation.classList.remove('active')
            descriptionInner.innerText = translateLetters(getCity)
            temp.innerText = `دما:` + Math.round(getCity.main.temp - 273)
            wind_speed.innerText = `سرعت باد :` + getCity.wind.speed
            for (let index = 0; index < spans.length; index++) {
                spans[index].classList.add('active')
            }
            localStorage.setItem['cityName', `${cityTitle.innerHTML}`]
            localStorage.setItem['description', `${descriptionInner.innerHTML}`]
            localStorage.setItem['temp', `${temp.innerHTML}`]
            localStorage.setItem['wind_speed', `${wind_speed.innerHTML}`]

        }
        XHR.send()
    }


    cityName.addEventListener('keyup', () => {
        cityName.value ? cityName.dir = 'ltr' : cityName.dir = 'rtl'
        checkInputValues(cityName.value)
    })


    btnCheckCity.addEventListener('click', btnClick)
}
document.addEventListener('DOMContentLoaded', main)
