var birthDayDate = document.querySelector("#birthday-input");
var showButton = document.querySelector("#show-button");
var result = document.querySelector("#result")

showButton.addEventListener('click', clickHandler);

function clickHandler(e) {
    var bdayStr = birthDayDate.value;

    if (bdayStr !== '') {
        var listOfDate = bdayStr.split('-');
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };
        var isPalindrome = checkPalindromeForAllDateFormats(date);
        if (isPalindrome) {

            showMsgTrue(date);
        } else {

            showMsgFalse(date);

        }

    } else {

        result.innerText = "Input can't be empty !"
    }
}

function reverseString(str) {
    return str.split('').reverse().join('');
}

function isPalindrome(str) {
    var reverse = reverseString(str);

    return str === reverse;
}



function convertDateToString(date) {
    var dateString = {
        day: '',
        month: '',
        year: ''
    };

    if (date.day < 10) {
        dateString.day = '0' + date.day;
    } else {
        dateString.day = date.day.toString();
    }

    if (date.month < 10) {
        dateString.month = '0' + date.month;
    } else {
        dateString.month = date.month.toString();
    }

    dateString.year = date.year.toString();


    return dateString;
}

function getAllDateFormates(date) {
    var dateString = convertDateToString(date);

    var ddmmyyyy = dateString.day + dateString.month + dateString.year;
    var mmddyyyy = dateString.month + dateString.day + dateString.year;
    var yyyymmdd = dateString.year + dateString.month + dateString.day;
    var ddmmyy = dateString.day + dateString.month + dateString.year.slice(-2);
    var mmddyy = dateString.month + dateString.day + dateString.year.slice(-2);
    var yymmdd = dateString.year.slice(-2) + dateString.month + dateString.day;


    return [
        ddmmyyyy,
        mmddyyyy,
        yyyymmdd,
        ddmmyy,
        mmddyy,
        yymmdd
    ]

}


function checkPalindromeForAllDateFormats(date) {

    var listOfPalindromes = getAllDateFormates(date);
    var flag = false;

    for (var i = 0; i < listOfPalindromes.length; i++) {
        if (isPalindrome(listOfPalindromes[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}


function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}


function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            } else {
                if (day > 28) {
                    day = 1;
                    month++;
                }
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    }

}


function getPrevDate(date) {
    var day = date.day;
    var month = date.month;
    var year = date.year;


    if (day === 1) {
        if (month === 4 || month === 6 || month === 9 || month === 11) {
            day = 31;
            month = month - 1;
        } else if (month === 3) {
            if (year % 4 === 0) {
                day = 29;
            } else {
                day = 28;
            }
            month = month - 1;
        } else if (month === 1) {
            day = 31;
            month = 12;
            year = year - 1;
        } else if (month === 2) {
            day = 31;
            month = month - 1;
        } else {
            day = 30;
            month = month - 1;
        }
    } else {
        day = day - 1;
    }
    return {
        day: day,
        month: month,
        year: year
    }

}




function getNextPalindromeDate(date) {
    var counter = 0;
    var nextDate = getNextDate(date);

    while (1) {
        counter++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [counter, nextDate];
}

function getPrevPalindromeDate(date) {
    var counterPrev = 1;
    var prevDate = getPrevDate(date)
    while (1) {
        counterPrev++;
        var isPalindrome = checkPalindromeForAllDateFormats(prevDate);
        if (isPalindrome) {
            break;
        }
        prevDate = getPrevDate(prevDate);
    }
    return [counterPrev, prevDate];

}

function showMsgTrue(date) {
    result.innerText = `😁${date.day}-${date.month}-${date.year} is a Palindrome number. \n     Yay!! your birthday is a palindrome 😎!!`
    result.style.color = "#FF0099";
    result.style.border = "3px solid blue";
    result.style.backgroundColor = "rgb(212, 240, 247)";
}


function showMsgFalse(date) {
    result.innerText = `😌  ${date.day}-${date.month}-${date.year} is not a palindrome.\n `
    var [counter, nextDate] = getNextPalindromeDate(date);
    result.innerText += `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} , you missed it by ${counter} days.\n`

    var [counterPrev, prevDate] = getPrevPalindromeDate(date);
    result.innerText += `The previous palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year} , you missed it by ${counterPrev} days. `

    result.style.color = "#9333EA";
    result.style.border = "3px solid yellow";
    result.style.backgroundColor = "rgb(212, 240, 247)";

}