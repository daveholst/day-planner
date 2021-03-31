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
    //time calc function -
    const timeCalc = (modifier = 0) => {
      // create a copy of the formatted start time
      let copy = this.startTime.format();
      // calculate new time and assign to copy
      copy = (() => moment(copy).add(this.timeSlotDuration * (i + modifier), 'm').subtract(modifier, 'seconds'))();
      return copy;
    }
    // build array of objects (based on input arguments [start,end, interval])
    for (var i = 0; i < this.totalTimeSlots; i++) {
      // add blank object
      this.data.push({})
      // populate object
      this.data[i] = {
        slotStart: timeCalc(),
        slotEnd: timeCalc(1),
        slotDuration: this.timeSlotDuration,
        }
      // add state for ui (past, present, future)
      this.data[i].viewState = (() => {
        let timeDiff = (() => this.dateCreated.diff(this.data[i].slotStart, 'm'))()
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
    //jQuery Selectors
    const tableBody = $('#table-body')
    //create table from object.data
    const tableRawData = this.data;
    let rowCount = 0;

    tableRawData.forEach(data => {
      // create and append <tr> with class based off state (past,present,future )
      tableBody.append($('tr')).addClass(`${data.viewState}`)
      //
    });



    //create table element

  }


}