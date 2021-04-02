//set date at top of page
datePElement = $('#currentDay');
currentDate = moment().format('dddd, MMM Do');
datePElement.text(currentDate);

// assumes that the local storage was generated with same args as below. Could Probably validate this?
const myDay = new DayPlanner('09:00', '18:00', 60);

//check local object exists, if not. build!
if (localStorage.getItem('myDay')) {
  // TODO: check if it is for today? if not, REBUILD!!!
  // read in the data from local storage and build data object
  myDay.buildFromLocal();
  // build the table in the DOM
  myDay.tableBuilder();
  // check if data is from yesterday? if so rebuild!
  if (moment().diff(myDay.dateCreated, 'days') > 1) {
    // rebuild new object
    myDay.buildObject();
    // rebuild table
    myDay.tableBuilder();
  }
  } else {
    // build new data object
    myDay.buildObject();
    // build table to
    myDay.tableBuilder();
  }

// TESTING -- log out days different
console.log('days diff from created',moment().diff(myDay.dateCreated, 'days'));