export const YEET = message => { throw(message) }

export const findSemester = (year, month) => {

    if(month === "Jan" || month === "Feb" || month === "Mar" || month === "Apr") return 'Winter ' + year
    if(month === "May" || month === "Jun") return 'Spring ' + year
    if(month === "Jul" || month === "Aug" ) return 'Summer ' + year
    return 'Fall ' + year
}