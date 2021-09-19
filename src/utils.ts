export const getRelativeDateString = (utcTimestamp: number) => {
    let relativeDateString: string;
    let currentDate = Math.floor(Date.now() / 1000);
    let dateDifference = currentDate - utcTimestamp;
    if (dateDifference < 60) {
        relativeDateString = `${dateDifference} seconds ago`
    } else if (dateDifference < 3600) {
        relativeDateString = `${Math.floor(dateDifference / 60)} minutes ago`
    } else if (dateDifference < 86400) {
        relativeDateString = `${Math.floor(dateDifference / 3600)} hours ago`
    } else if (dateDifference < 604800) {
        relativeDateString = `${Math.floor(dateDifference / 86400)} days ago`
    } else if (dateDifference < 2628000) {
        relativeDateString = `${Math.floor(dateDifference / 604800)} weeks ago`
    } else if (dateDifference < 31540000) {
        relativeDateString = `${Math.floor(dateDifference / 2628000)} months ago`
    } else {
        relativeDateString = `${Math.floor(dateDifference / 31540000)} years ago`
    }
    return relativeDateString;
}

export const getAbbreviatedNumberString = (num: number) => {
    let abbreviatedNumberString: string;
    if (num < 1000) {
        abbreviatedNumberString = num.toString();
    } else if (num < 1000000) {
        abbreviatedNumberString = `${(num / 1000).toFixed(1)}k`;
    } else {
        abbreviatedNumberString = `${(num / 1000000).toFixed(1)}m`;
    }
    return abbreviatedNumberString;
}

