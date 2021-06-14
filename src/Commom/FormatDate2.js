export const FormatDate2 = (date) => {
    if(date === undefined){
        let data = 'N/A'
        return data;
    }
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        h = d.getHours(),
        m = d.getMinutes(),
        s = d.getSeconds(),
        f= d.getMilliseconds();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

        return    [ year, month, day].join('-') 
        
  
}