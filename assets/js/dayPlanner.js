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
      copy = (() => moment(copy)
        .add(this.timeSlotDuration * (i + modifier), 'm')
        .subtract(modifier, 'seconds'))();
      return copy;
    }
    // build array of objects (based on input arguments [start,end, interval])
    for (var i = 0; i < this.totalTimeSlots; i++) {
      // add blank object
      this.data.push({})
      // populate object
      this.data[i] = {
        description: '',
        slotStart: timeCalc(),
        slotEnd: timeCalc(1),
        slotDuration: this.timeSlotDuration,
        get viewState() {
          let timeDiff = (() => moment().diff(this.slotStart, 'm'))()
          if (timeDiff < 0) return 'future';
          else if (timeDiff >= 0 && timeDiff < 60) return 'present';
          else return 'past';
        }
      }
    }
  }

  //write to LS
  writeToLocal() {
    const json = JSON.stringify(this);
    window.localStorage.setItem('myDay', json);
  }
  //read from LS --
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
    //table builder iterator
    tableRawData.forEach(data => {
      // create and append <tr> with class based off state (past,present,future )
      let newRow = $('<tr>')
        .attr('id', `row-${rowCount}`)
        .attr('scope', 'row')
        .addClass('row');
      //slotTime (row-head)
      let newHourCell = $('<th>')
        .text(data.slotStart.format('hA'))
        .addClass('hour')
      newRow.append(newHourCell);
      //add description cell
      let newDescriptionCell = $('<td>')
        .text(data.description)
        .addClass(`description ${data.viewState}`);
      newRow.append(newDescriptionCell);
      //add text area
      let newTextArea = $('<textarea>')
        .attr('id', `text-area-${rowCount}`);
      newDescriptionCell.append(newTextArea);
      //add save button/icon
      let newTableData2 = $('<td>')
        .html(`<i id="save-${rowCount}" class="fas fa-save"></i>`)
        .addClass('saveBtn');
      newRow.append(newTableData2);
      // append to table
      tableBody.append(newRow);
      //add event listeners
      let saveButton = $(`#save-${rowCount}`);
      saveButton.on('click', () => this.writeToLocal())
      let textInput = $(`#text-area-${rowCount}`);
      // textInput.on('change', () => {
      //   // console.log('in e listener', this);

      //   console.log(rowCount);
      //   console.log(this.data[rowCount]);
      //     // = textInput.val();
      document.querySelector(`text-area-${rowCount}`).addEventListener('click', () => {
        console.log(rowCount)
      })
      });

      // increment count
      rowCount++;
      });
    };

  }


