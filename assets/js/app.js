// assumes that the local storage was generated with same args as below. Could Probably validate this?
const myDay = new DayPlanner('09:00', '18:00', 60);

//check local object exists, if not. build!
if (localStorage.getItem('myDay')) {
  // read in the data from local storage and build data object
  myDay.buildFromLocal();
  // build the table in the DOM
  myDay.tableBuilder();
} else {
  // build new data object
  myDay.buildObject();
  // build table to
  myDay.tableBuilder();
}