const getMoonPhase = (percentage) => {
    switch(true){
        case (percentage < 12.5):
            return 'New Moon'
        case (percentage < 25):
            return 'Waxing Crescent'
        case (percentage < 37.5):
            return 'First Quarter'
        case (percentage < 50):
            return 'Waxing Gibbous'
        case (percentage < 62.5):
            return 'Full Moon'
        case (percentage < 75):
            return 'Waning Gibbous'
        case (percentage < 87.5):
            return 'Third Quarter'
        case (percentage < 100):
            return 'Waning Crescent'
    }
}

const setDays = (days) => {
    localStorage.setItem('days', `${days}`)
}

const getDays = () => {
    const days = localStorage.getItem('days')
    
    if (days === null || isNaN(parseInt(days, 10))) {
        localStorage.setItem('days', '0')
        return 0;
    }

    return parseInt(days, 10);
}

let days = 0;
let daysIncrement = 1;

const getPhasePercentage = (numberOfDays) => {
    return ((numberOfDays % 30) / 30) * 100
}

const setMoonStyle = (days) => {
    const percentage = getPhasePercentage(days);

    let moonSize = 500;

    if (window.innerHeight < 820) {
        moonSize = 250;
    }

    if (window.innerHeight < 563) {
        moonSize = 150
    }

    let stylePosition;

    if (percentage < 60) {
       stylePosition = `${(1 - (percentage / 62.5)) * -moonSize}`
    }

    if (percentage === 60) {
        stylePosition = `0`
    }
    
    if (percentage > 60) {
       stylePosition = `${moonSize - (1 - ((percentage - 62.5) /  37.5)) * moonSize}`
    }
    document.getElementsByClassName('moon')[0].style.boxShadow = `inset ${stylePosition}px 0px rgba(0, 0, 0, 0.25), inset ${stylePosition}px 0px 1px 1px rgba(0, 0, 0, 0.7)`
}

const onInputChange = () => {
    daysIncrement = dayIncrementInput.value
}

const setPhaseName = (numberOfDays) => {
    document.getElementsByClassName('phase-name')[0].innerHTML = `${getMoonPhase(getPhasePercentage(numberOfDays))}`
}

const setDaysElement = (numberOfDays) => {
    document.getElementsByClassName('campaign-days')[0].innerHTML = `Day: ${numberOfDays}`
}

const updateMoon = (days) => {
    setDays(`${days}`)
    setPhaseName(days)
    setDaysElement(days);
    setMoonStyle(days)
}

const onPositiveButtonPress = () => {
    if(!isNaN(daysIncrement) || daysIncrement) {
        days = days + daysIncrement
    }

    updateMoon(days)
}

const onNegativeButtonPress = () => {
    if(!isNaN(daysIncrement) || daysIncrement) {
        if (days - daysIncrement < 0) {
            days = 0
        } else {
            days = days - daysIncrement
        }
    }

    updateMoon(days)
}


window.addEventListener('DOMContentLoaded', () => {
    days = getDays();
    daysIncrement = 1;

    document.getElementsByClassName('days-input')[0].value = daysIncrement

    document.getElementsByClassName('days-input')[0].addEventListener('change', () => {
        daysIncrement = parseInt(document.getElementsByClassName('days-input')[0].value, 10);
    })
    
    setPhaseName(days);
    setDaysElement(days);
    setMoonStyle(days)
});

