// class object requires momentJS
// takes args as 24-hr. syntax -> 'hh:mm' || timeSlot in minutes (int-type)

class DayPlanner {
  constructor(startTime, endTime, interval) {
    this.dateCreated = moment();
    this.startTime = moment().hour(startTime.slice(0, 2)).minute(startTime.slice(3, 5)).seconds(0);
    this.endTime = moment().hour(endTime.slice(0, 2)).minute(endTime.slice(3, 5)).seconds(0);
    this.timeSlotDuration = interval;
    this.totalTimeSlots = this.endTime.diff(this.startTime, 'minutes') / interval;
    this.data = [];


  }
  //build the dayplanner storage object.
  build() {
    // build array of objects (based on input arguments [start,end, interval])
    for (let i = 0; i < this.totalTimeSlots; i++) {
      // add blank object
      this.data.push({})
      // populate object
      this.data[i] = {
        slotStart: (() => {
          // create copy
          let startCopy = this.startTime.format();
          // mutate and return object with new value
          startCopy = (() => moment(startCopy).add(this.timeSlotDuration * i, 'm'))();
          return startCopy;
        }) (),
        slotEnd: (() => {
          //create copy
          let endCopy = this.startTime.format();
          endCopy = (() => moment(endCopy).add(this.timeSlotDuration * (i + 1), 'm').subtract(1,'seconds'))();
          // mutate and return object with new value
          return endCopy;
        }) (),
        slotDuration: this.timeSlotDuration
      }
    }

  }
}


//TESTING

const myDay = new DayPlanner('09:00', '18:00', 60);
myDay.build();
console.log(myDay);