import { isNumber, isString } from 'util'

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday', 'Sunday']
const SHORT_DAYS_OF_WEEK = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']
const ONE_LETTER_DAYS_OF_WEEK = ['M', 'T', 'W', 'Th', 'F', 'S', 'Su']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const THIRTY_DAY_MONTHS = [3, 5, 8, 10]
const THIRTY_ONE_DAY_MONTHS = [0, 2, 4, 6, 7, 9, 11]
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const TIME_ZONES = [
    'IDLW', 'HST', 'AKST', 'PST', 'MST', 'CST', 'AST', 'BRT', 
    'FNT', 'CVT', 'UTC', 'CET', 'EET', 'EAT', 'GET', 'PKT', 'BST',
    'THA', 'CIT', 'JST', 'AEST', 'SBT', 'NZST', 'TOT', 'LINT'
]

export default class LSDateTime {
    // @dateString accepts 'Nov 11, 2017', 'November 11, 2017', MM(one indexed)-DD-YYYY, or C# dateTime string
    constructor(dateString) {
        try {
            if(!dateString) {
                const NOW = new Date()
                const year = NOW.getFullYear()
                const month = NOW.getMonth()
                const date = NOW.getDate()
                const hour = NOW.getHours()
                const minutes = NOW.getMinutes()
                const seconds = NOW.getSeconds()


                this.year = year
                this.month = month
                this.date = date
                this.hour = hour
                this.minutes = minutes
                this.seconds = seconds
            }
            else if(dateString.includes(',')) {
                const split = dateString.split(',')

                if(split.length !== 2) throw("Unsupported string format")
                    
                const firstSplit = split[0].split(' ')
                const date = parseInt(firstSplit[1])
                let month = MONTHS.indexOf(firstSplit[0])
                let year

                if(split[1].includes(':')) {
                    let splitYearAndTime = split[1].split(' ')
                    let timeSplit = splitYearAndTime[2].split(':')

                    const h = parseInt(timeSplit[0], 10)
                    const m = parseInt(timeSplit[1], 10)
                    const s = parseInt(timeSplit[2], 10)

                    if(isNaN(h) || isNaN(m) || isNaN(s)) throw('Time' + h + ':' + m + ':' + s + ' does not exists')
                    else if(h > 24 || m > 59 || s > 59) throw('Time' + h + ':' + m + ':' + s + ' does not exists')
                    else if(h < 0 || m < 0 || s < 0) throw('Time' + h + ':' + m + ':' + s + ' does not exists')
                    else {
                        this.hour = h
                        this.minutes = m
                        this.seconds = s

                        year = parseInt(splitYearAndTime[1], 10)
                    }
                }
                else {
                    year = parseInt(split[1], 10)
                    this.hour = 12
                    this.minutes = 0
                    this.seconds = 0
                }

                // check if month is short or long format
                if(month === -1) month = SHORT_MONTHS.indexOf(firstSplit[0])
                if(month === -1) throw("Month '" + firstSplit[0] + "'" + ' does not exsist')

                // throw out dates that have a date less than 0
                if(date < 1) throw("Date can not be less than 1")

                // make sure date does not exeed number of days in the month
                if(THIRTY_DAY_MONTHS.indexOf(month) !== -1 && date > 30) throw("Date " + date + ' does not exsist in ' + THIRTY_DAY_MONTHS[month])
                else if(THIRTY_ONE_DAY_MONTHS.indexOf(month) !== -1 && date > 31) throw("Date " + date + ' does not exsist in ' + THIRTY_ONE_DAY_MONTHS[month])
                else if(month === 1) {
                    if(year % 4 === 0 && date > 29) throw("Date " + date + ' does not exsist in ' + 'February ' + year)
                    else if(year % 4 > 0 && date > 28) throw("Date " + date + ' does not exsist in ' + 'February ' + year)
                }
                else if (THIRTY_DAY_MONTHS.indexOf(month) === -1 && THIRTY_ONE_DAY_MONTHS.indexOf(month) === -1) 
                    throw("Month '" + firstSplit[0] + "' does not exsist")

                this.year = year
                this.month = month
                this.date = date
            }
            
            // Accepts C# DateTime string
            else if (dateString.includes('T')) {
                const midSplit = dateString.split('T')
                const dateSplit = midSplit[0].split('-')
                const timeSplit = midSplit[1].split(':')
            
                this.year = parseInt(dateSplit[0], 10)
                this.month = parseInt(dateSplit[1], 10)
                this.date = parseInt(dateSplit[2], 10)
                this.hour = parseInt(timeSplit[0], 10)
                this.minutes = parseInt(timeSplit[1], 10)
                this.seconds = parseInt(timeSplit[2], 10)
            }

            //Accepts string in format of MM-DD-YYYY
            else if(dateString.includes('-')) {
                const split = dateString.split('-')
                const date = parseInt(split[1], 10)
                const month = parseInt(split[0], 10) - 1
                const year = parseInt(split[2], 10)

                if(split.length !== 3) throw("Unsupported string format")

                // throw out dates that have a date less than 0
                if(date < 1) throw("Date can not be less than 1")

                // make sure date does not exeed number of days in the month
                if(THIRTY_DAY_MONTHS.indexOf(month) !== -1 && date > 30) throw("Date " + date + ' does not exsist in ' + THIRTY_DAY_MONTHS[month])
                else if(THIRTY_ONE_DAY_MONTHS.indexOf(month) !== -1 && date > 31) throw("Date " + date + ' does not exsist in ' + THIRTY_ONE_DAY_MONTHS[month])
                else if(month === 1) {
                    if(year % 4 === 0 && date > 29) throw("Date " + date + ' does not exsist in ' + 'February ' + year)
                    else if(year % 4 > 0 && date > 28) throw("Date " + date + ' does not exsist in ' + 'February ' + year)
                }
                else if(month > 11 || month < 0) throw('Month ' + "'" + month + "' does not exsist" )
                
                this.year = parseInt(split[2], 10)
                this.month = parseInt(split[0], 10)
                this.date = parseInt(split[1], 10)
                this.hour = 12
                this.minutes = 0
                this.seconds = 0
            }
            else throw("Unsupported string format")

            this.timeZone = TIME_ZONES.indexOf('MST')
        }
        catch (err) {
            console.error(err)
        }
    }
    // getters

    // @format can be undefined, 'full' or 'short' 
    getMonth(format) {
        if(format === undefined) return this.month                                          // returns zero-indexed month
        else if(format === 'full') return MONTHS[ parseInt(this.month, 10) ]                // returns the full name of the month
        else if (format === 'short') return SHORT_MONTHS[ parseInt(this.month, 10) ]        // returns the 3 letter abbreviation of the month
        else {
            console.error("Unsupported format for month. Accepted parameters are: nothing, 'short', 'full'")
            return -1
        }
    }

    getCalendarMonth() { return this.month + 1 }  // returns the one-indexed month 

    getYear() { return this.year }

    // returns the time in 24 hour format
    get24HourTime(showSeconds) { 
        const hour = this.hour
        const mins = this.minutes < 10 ? '0' + this.minutes : this.minutes
        const seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds
        
        if(showSeconds) return hour + ':' + mins + ':' + seconds 
        else return hour + ':' + mins
    } 

    // returns the time in 12 hour format
    get12HourTime(showSeconds) {
        const hour = this.hour > 12 ? this.hour - 12 : this.hour
        const mins = this.minutes < 10 ? '0' + this.minutes : this.minutes
        const seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds
        const m = this.hour > 12 ? 'pm' : 'am'

        if(showSeconds) return hour + ':' + mins + ':' + seconds + ' ' + m
        else return hour + ':' + mins + ' ' + m
    }

    //returns current timezone
    getTimeZone() {
        return TIME_ZONES[this.timeZone]
    }

    //returns the day of the week 
    // @format accepts 'full', 'short', 'single' or nothing
    getDayOfWeek(format) {
        const day = new Date(this.year, this.month, this.date, this.hour, this.minutes, this.seconds, 0)    
        if(!format) return day.getDay()
        else if(format === 'short') return SHORT_DAYS_OF_WEEK[day.getDay()]
        else if(format === 'single') return ONE_LETTER_DAYS_OF_WEEK[day.getDay()]
        else if (format === 'full') return DAYS_OF_WEEK[day.getDay()]
        else {
            console.error("Unsupported format for Day of the Week. Accepted parameters are: nothing, 'short', 'single' or 'full'")
            return -1
        }
    }


    //setters

    // @Timestring accepts '{12hour}:{minutes}:{seconds}' or '{24hour}:{minutes}'
    // @aOrP accepts either 'am' or 'pm'. If left undefined it will assume am
    setTime(timeString, aOrP) {
        const split = timeString.split(':')
        try {

            if(split.length < 2) throw("Badly formated string")

            else if(split.length === 2) {
                let hour = parseInt(split[0], 10)
                let mins = parseInt(split[1], 10)

                if(hour > 23) throw("Hour can not exceed 23")
                if(hour < 0)throw("Hour must be grater than 0")

                if(mins > 59) throw("Minuets can not exceed 59")
                if(mins < 0)throw("Minuets must be grater than 0")

                if(aOrP === 'pm') {
                    if(hour < 1) throw("Hours must be greater than 1")
                    else if (hour > 12) throw("Hours must be less than 12")
                    else if (hour !== 12) hour += 12
                }

                else if(aOrP === 'am') {
                    if(hour < 1) throw("Hours must be greater than 1")
                    else if(hour > 12) throw("Hours must be less than 12")
                    else if (hour === 12) hour = 0
                }
                else if(aOrP === undefined) {
                    if(hour < 0) throw("Hours must be greater than 0")
                    else if(hour > 23) throw("Hours must be less than 23")
                }
                else throw("'"+ aOrP + "'" + " is not a valid value or aOrP. Accepted values are 'am' or 'pm'")

                this.hour = hour
                this.minutes = mins
                this.seconds = 0
            }
            
            else if (split.length === 3) {
                let hour = parseInt(split[0], 10)
                let mins = parseInt(split[1], 10)
                let secs = parseInt(split[2], 10)

                if(hour > 23) throw("Hour can not exceed 23")
                if(hour < 0)throw("Hour must be grater than 0")

                if(mins > 59) throw("Minuets can not exceed 59")
                if(mins < 0)throw("Minuets must be grater than 0")

                if(secs > 59) throw("Seconds can not exceed 59")
                if(secs < 0)throw("Seconds must be grater than 0")
                

                if(aOrP === 'pm') {
                    if(hour < 1) throw("Hours must be greater than 1")
                    else if (hour > 12) throw("Hours must be less than 12")
                    else if (hour !== 12) hour += 12
                }
                else if(aOrP === 'am') {
                    if(hour < 1) throw("Hours must be greater than 1")
                    else if(hour > 12) throw("Hours must be less than 12")
                    else if (hour === 12) hour = 0
                }
                else if(aOrP === undefined) {
                    if(hour < 0) throw("Hours must be greater than 0")
                    else if(hour > 23) throw("Hours must be less than 23")
                }
                else throw("'"+ aOrP + "'" + " is not a valid value or aOrP. Accepted values are 'am' or 'pm'")

                this.hour = hour
                this.minutes = mins
                this.seconds = secs
            }

            else throw("Badly formated string")
        }
        catch(err) {
            console.error(err)
        }
    }

    setYear(year) {
        try {
            const temp = parseInt(year, 10)
            if (temp < 0) throw("setYear only accepts positive numbers")
            if(temp === 'NaN' || isNaN(temp)) throw(year + " is not a valid year")
            else this.year = temp
        }
        catch (err) {
            console.error(err)
        }
    }

    // @month accepts 1-indexed month of the year, the full name of the month, or the three-letter abbrevitaion of the month
    setMonth(month) {
        if(month > 12 || month < 1) throw(month + " is not a valid month")
        try {
            const temp = parseInt(month, 10)
            if(MONTHS.indexOf(temp) > 0) this.month = MONTHS.indexOf(temp)
            else if(SHORT_MONTHS.indexOf(temp) > 0) this.month = SHORT_MONTHS.indexOf(temp)
            else if(isNaN(temp)) throw(month + " is not a valid month")
            else this.month = temp
        }
        catch (err) {
            console.error(err)
        }
    }

    // @month accepts 0-indexed month of the year
    setZeroMonth(month) {
        try {
            const temp = parseInt(month, 10)
            if(isNaN(temp)) this.setMonth(month + 1)
            throw(month + ' is not a valid month')
        }
        catch (err) {
            console.error(err)
        }
    }

    // @date accepts 1-indexed date
    setDate(date) {

        if(!isNumber(date)) throw('setDate only accepts type of number')

        if(date < 0) throw('The date can not be less than 1')
        if(date > 31) throw('The date can not be grater than 31')

        const isThirty = THIRTY_DAY_MONTHS.indexOf(this.month)
        const isThrityOne = THIRTY_ONE_DAY_MONTHS.indexOf(this.month)
        const isFeb = this.month === 2 ? 2 : -1;

        if(isThirty > 0 && date < 31) this.date = date
        else if(isThrityOne > 0 && date < 32 ) this.date = date
        else if(isFeb > 0) {

            if (this.year % 4 === 0 && date < 30) this.date = date
            else if (this.year % 4 !== 0 && date < 29) this.date = date
            else throw(date + ' is not a valid date for February')
        }
        else throw(date + ' is an invalid date for month of ' + MONTHS[this.getMonth()])
    }

    // @hours accepts a number from 0-23 or a string with an hour with a suffix 'am' or 'pm'
    setHours(hours) {
        try {

            if(isString(hours)) {
                if(hours.includes('am')) {
                    const h = hours.replace('am', '')
                    const convert = parseInt(h, 10)

                    if(isNaN(convert)) throw(hours + ' is not a valid string')
                    else {
                        if(convert < 1 || convert > 12) throw(hours + ' is not a valid string')
                        else this.hour = convert
                    }
                }
                else if(hours.includes('pm')) {
                    const h = hours.replace('pm', '')
                    const convert = parseInt(h, 10)
                    
                    if(isNaN(convert)) throw(hours + ' is not a valid string')
                    else {
                        if(convert < 1 || convert > 12) throw(hours + ' is not a valid string')
                        else this.hour = convert === 12 ? convert : convert + 12
                    }
                }
                else throw('Invalid string for hours')
            }
            else if (isNumber(hours)) {
                if(hours > 23) throw('Hours can not be greater than 23')
                else if (hours < 0) throw('Hours can not be last than 0')
                else {
                    this.hour = hours
                } 
            }
        }
        catch (err) {
            console.error(err)
        }
    }
    
    // @mins accepts a number between 0 and 59
    setMinuets(mins) {
        try {
            if(!isNumber(mins)) throw(mins + ' is not a valid value for Minuets') 
            else if (mins > 59 || mins < 0) throw(mins + ' is not a valid value for Minuets') 
            else this.minutes = mins
        }
        catch(err) {
            console.error(err)
        }
    }

    // @seconds accepts a number between 0 and 59
    setSeconds(seconds) {
        try {
            if(!isNumber(seconds)) throw(seconds + ' is not a valid value for Minuets') 
            else if (seconds > 59 || seconds < 0) throw(seconds + ' is not a valid value for Minuets') 
            else this.minutes = seconds
        }
        catch(err) {
            console.error(err)
        }
    }

    // sets the timezone without modifying the actual content of the object
    // @tz accepts the three letter abbreviation of a timezone as a string
    setTimeZone(tz) {
        try {
            if(!isString(tz)) throw('setTimeZone only accepts strings')

            const test = TIME_ZONES.indexOf(tz.toUpperCase())
            if(test < 0) throw("'" + tz + "'" + ' is not a supported timeZone')
            
            this.timeZone = test

        }
        
        catch(err) {
            console.error(err)
        }
    }

    // sets the timezone and automatically handles the difference between the old and new timezones
    // @tz accepts the three letter abbreviation of a timezone as a string
    setTimeZoneAndUpdate(tz) {
        try {
            if(!isString(tz)) throw('setTimeZone only accepts strings')

            const test = TIME_ZONES.indexOf(tz.toUpperCase())
            if(test < 0) throw(tz + ' does is not a supported timeZone')
            
            const current = this.timeZone
            const diff = test - current

            this.addHours(diff)

            this.timeZone = test

        }
        
        catch(err) {
            console.error(err)
        }
    }

    // @yearsToAdd accepts a number to be added to years, inculding negitive numbers
    addYears(yearsToAdd) {
        try {
            if(!isNumber(yearsToAdd)) throw("addYears only accepts numbers")
            else this.year += yearsToAdd
        }
        catch(err) {
            console.error(err)
        }
    }

    // @monthsToAdd accepts a number to be added to months, inculding negitive numbers 
    // and will add or subtract years as well
    addMonths(monthsToAdd) {
        try {
            if(!isNumber(monthsToAdd)) throw("addMonths only accepts numbers")
            let years = Math.floor(monthsToAdd / 12)
            const addTo = years * 12
            const res = monthsToAdd - addTo

            if(res < 0) {
                if(res > this.month) {
                    const diff = this.month - res
                    this.month = diff + 12
                    years -= res
                }
                else this.month -= res
            }
            if(res > 0){ 
                if(res + this.month > 11) {
                    const diff = this.month + res
                    this.month = diff - 12
                    years++
                }
                else this.month += res
            }

            this.addYears(years)
        }
        catch(err) {
            console.error(err)
        }
    }

    // @daysToAdd accepts a number to be added to months, inculding negitive numbers 
    // and will add or subtract years as well
    addDays(daysToAdd) {
        try {
            if(!isNumber(daysToAdd)) throw("addDays only accepts numbers")

            let whatsLeft = daysToAdd

            while (whatsLeft > 0) {
                let daysInMonth = DAYS_IN_MONTH[this.month]
                if(this.month === 1 && this.year % 4 === 0) daysInMonth++
                let daysLeftInMonth = daysInMonth - this.date

                if(daysLeftInMonth >= whatsLeft) {
                    this.date += whatsLeft
                    whatsLeft = 0
                }
                else {
                    this.date = 1
                    whatsLeft -= daysLeftInMonth + 1
                    this.addMonths(1)
                }
            }

            while (whatsLeft < 0) {

                if(this.date > (-1 * whatsLeft)) {
                    this.date += whatsLeft
                    whatsLeft = 0
                }
                else {
                    whatsLeft += this.date 
                    this.addMonths(-1)
                    this.date = DAYS_IN_MONTH[this.month]
                    if(this.month === 1 && this.year % 4 === 0) this.date++
                }
            }
        }
        catch(err) {
            console.error(err)
        }
    }

    addHours(hoursToAdd) {
        try {
            if(!isNumber(hoursToAdd)) throw("addHours only accepts numbers")

            let whatsLeft = hoursToAdd

            while(whatsLeft > 0) {
                const check  = whatsLeft + this.hour

                if(check < 24) {
                    this.hour = check
                    whatsLeft = 0
                }

                else {
                    const diff = 24 - this.hour
                    this.addDays(1)
                    this.hour = 0
                    whatsLeft -= diff
                }

            }
            while(whatsLeft < 0) {
                const check = this.hour + whatsLeft

                if(check >= 0 ) {
                    this.hour = check
                    whatsLeft = 0
                }
                else {
                    this.addDays(-1)
                    whatsLeft += this.hour
                    this.hour = 24
                }
            }
        }
        catch(err) {
            console.error(err)
        }
    }

    addMinuets(minsToAdd) {
        try {
            if(!isNumber(minsToAdd)) throw("addMinutes only accepts numbers")

            let whatsLeft = minsToAdd

            while(whatsLeft > 0) {
                const check = whatsLeft - this.minutes
                
                if(check < 60) {
                    this.minutes = check
                    whatsLeft = 0
                } 
                else {
                    this.addHours(1)
                    const diff = 60 - this.minutes
                    whatsLeft -= diff
                    this.minutes = 0
                }
            }

            while(whatsLeft < 0) {
                const check = whatsLeft + this.minutes

                if(check > -1) {
                    this.minutes = check
                    whatsLeft = 0
                }
                else {
                    this.addHours(-1)
                    whatsLeft += this.minutes
                    this.minutes = 60
                }
            }
        }
        catch(err) {
            console.error(err)
        }
    }

    addSeconds(secsToAdd) {
        let whatsLeft = secsToAdd

        while(whatsLeft > 0) {
            const check = whatsLeft - this.minutes
            
            if(check < 60) {
                this.seconds = check
                whatsLeft = 0
            } 
            else {
                this.addMinuets(1)
                const diff = 60 - this.seconds
                whatsLeft -= diff
                this.seconds = 0
            }
        }

        while(whatsLeft < 0) {
            const check = whatsLeft + this.seconds

            if(check > -1) {
                this.seconds = check
                whatsLeft = 0
            }
            else {
                this.addMinuets(-1)
                whatsLeft += this.seconds
                this.seconds = 60
            }
        }
    }
    catch(err) {
        console.error(err)
    }

    difference() {

    }

    stringify() {
        return this.getMonth('full') +  ' ' + this.date + ', ' + this.getYear() + ' ' + this.get24HourTime() + ':' + this.seconds
    }
}