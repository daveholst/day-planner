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
  buildObject() {
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
          // mutate and return object with new value
          endCopy = (() => moment(endCopy).add(this.timeSlotDuration * (i + 1), 'm').subtract(1,'seconds'))();
          return endCopy;
        }) (),
        slotDuration: this.timeSlotDuration,
        }
        // add state for ui (past, present, future)
      this.data[i].viewState = (() => {
        let timeDiff = (() => this.dateCreated.diff(this.data[i].slotStart, 'm'))()
        // console.log(this.data[i].slotStart);
        // console.log(timeDiff);
        if (timeDiff < 0) return 'future';
        else if (timeDiff >= 0 && timeDiff < 60) return 'present';
        else return 'past';
      }) ()
    }
  }
  //write to LS
  writeToLocal() {
    const json = JSON.stringify(this);
    window.localStorage.setItem('myDay', json);
  }
  //read from LS -- TODO: maybe add the local check into here?
  readFromLocal() {
    const parsed = JSON.parse(window.localStorage.getItem('myDay'));
    return parsed;
  }
  //table builder
  tableBuilder() {

  }


}