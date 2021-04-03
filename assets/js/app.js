//set date at top of page
datePElement = $('#currentDay');
currentDate = moment().format('dddd, MMM Do');
datePElement.text(currentDate);

// assumes that the local storage was generated with same args as below. Could Probably validate this?
let myDay = new DayPlanner('09:00', '18:00', 60);

//check local object exists, if not. build!
if (localStorage.getItem('myDay')) {
  // read in the data from local storage and build data object
  myDay.buildFromLocal();
  // build the  table in the DOM
  myDay.tableBuilder();
  //check if data is from yesterday? if so rebuild!
  if (moment().isSame(myDay.dateCreated, 'days') === false) {
    // rebuild new object
    myDay = new DayPlanner('09:00', '18:00', 60);
    myDay.buildObject();
    myDay.tableBuilder();
    myDay.writeToLocal();
  }
  } else {
    // build new data object & table
    myDay.buildObject();
    myDay.tableBuilder();
  }
