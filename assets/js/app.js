// class object requires momentJS
// takes args as 24-hr. syntax -> 'hh:mm' || timeSlot in minutes (num type)

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
    console.log(this.totalTimeSlots);
    for (let i = 0; i <= this.totalTimeSlots; i++) {
      // add blank object
      this.data.push({})
      // populate object
      this.data[i] = {
        slotStart:  ( () => this.startTime.add(this.timeSlotDuration * i, 'm'))(),
        slotEnd: ( () => this.startTime.add(this.timeSlotDuration * (i + 1), 'm'))(),
        slotDuration: this.timeSlotDuration
      }

      console.log(this.data);

      // const element = array[i];

    }

    console.log('iran?')
    this.data = ['test', 'test2', 'test3']
  }

}


//TESTING

const myDay = new DayPlanner('09:00', '18:00', 60);
myDay.build();
console.log(myDay);