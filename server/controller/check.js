const dates = [
    {
        name: "Ephraim",
        email: "hello@gmail.com",
        createdAt: "2018-12-17 09:33:47.817+00"
    },
    {
        name: "Ephraim",
        email: "ephylogistics@gmail.com",
        createdAt: "2018-12-17 09:35:55.707+00"
    },
    {
        name: "Admin",
        email: "admin@wizzyagro.com",
        createdAt: "2018-12-17 06:59:05.878+00"
    }
]

let sortDates = dates.map(date=> new Date(date.createdAt).getTime());

sortDates.sort();
let num = sortDates.length;
//console.log(sortDates[num-1])
let strDate = JSON.stringify(new Date(sortDates[num-1]));
//let strDate = JSON.stringify(latestDate);
let date = strDate.slice(1, 11);
let time = strDate.slice(12, 20);
let gmt = strDate.slice(21,24)
// console.log(date)
// console.log(time)

let fullDate = `${date} ${time}.${gmt}+00`;
//console.log(fullDate)
let latestOrder = dates.map(order => {
    // console.log(order.createdAt);
    // console.log(fullDate)
    let newOrder;
    if(order.createdAt === fullDate) {
        newOrder = order
    }
    console.log(newOrder)
    return newOrder
    //order.createdAt === fullDate ? return order : null
})


 //console.log(sortDates)
// console.log(sortDates[num-1])
//console.log(strDate)
//console.log(latestOrder)

// let date = new Date("2018-12-17 09:35:55.707+00").getTime();

// let num = date/1000;

// console.log(date);