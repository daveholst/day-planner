// class object requires momentJS
// takes args as 24-hr. syntax -> 'hh:mm' || timeSlot in minutes (int-type)




//TESTING


const myDay = new DayPlanner('09:00', '18:00', 60);

myDay.buildObject();
console.log(myDay);