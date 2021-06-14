export const FormatDate = (date, key = 1) => {
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

        return  key === 1 ?  [day, month, year].join('-') : [ month, day, year].join('/');
        
  
}