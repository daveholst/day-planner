class DayPlanner {
  constructor(startTime, endTime, interval) {
    this.dateCreated = moment();
    this.startTime = moment().hour(startTime.slice(0, 2)).minute(startTime.slice(3, 5)).seconds(0);
    this.endTime = moment().hour(endTime.slice(0, 2)).minute(endTime.slice(3, 5)).seconds(0);
    this.timeSlotDuration = interval;
    this.totalTimeSlots = this.endTime.diff(this.startTime, 'minutes') / interval;
    this.data = [];
  }
  //build the day planner storage object.
  buildObject() {
    // build array of objects (based on input arguments [start,end, interval])
    for (var i = 0; i < this.totalTimeSlots; i++) {
      // add blank object
      this.data.push({})
      // populate object
      this.data[i] = {
        description: '',
        slotStart: this.timeCalc(0,i),
        slotEnd: this.timeCalc(1,i),
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

  //write to LS -
  writeToLocal() {
    window.localStorage.removeItem('myDay');
    const json = JSON.stringify(this);
    window.localStorage.setItem('myDay', json);
  }

  //read from LS and rebuild object.
  buildFromLocal() {
    //grab data
    const localParsed = JSON.parse(window.localStorage.getItem('myDay'));
    // turn props back into functions/objects.
    this.dateCreated = moment(localParsed.dateCreated);
    this.startTime = moment(localParsed.startTime);
    this.endTime  = moment(localParsed.endTime)
    this.timeSlotDuration = localParsed.timeSlotDuration;
    this.totalTimeSlots = localParsed.totalTimeSlots;

    for (var i = 0; i < this.totalTimeSlots; i++) {
      // add blank object
      this.data.push({})
      // populate object
      this.data[i] = {
        description: localParsed.data[i].description,
        slotStart: moment(localParsed.data[i].slotStart),
        slotEnd: moment(localParsed.data[i].slotStart),
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

  //table builder
  tableBuilder() {
    //jQuery Selectors
    const tableBody = $('#table-body');
    //table builder iterator
    for (let i = 0; i < this.data.length; i++){
      // create and append <tr> with class based off state (past,present,future )
      let newRow = $('<tr>')
        .attr('id', `row-${i}`)
        .attr('scope', 'row')
        .addClass('row');
      //slotTime (row-head)
      let newHourCell = $('<th>')
        .text(this.data[i].slotStart.format('hA'))
        .addClass('hour')
      newRow.append(newHourCell);
      //add description cell
      let newDescriptionCell = $('<td>')
      .addClass(`description ${this.data[i].viewState}`);
      newRow.append(newDescriptionCell);
      //add text area
      let newTextArea = $('<textarea>')
        .attr('id', `text-area-${i}`)
        .text(this.data[i].description);
      newDescriptionCell.append(newTextArea);
      //add save button/icon
      let newSaveButton = $('<td>')
        .html(`<i id="save-${i}" class="fas fa-save"></i>`)
        .addClass('saveBtn');
      newRow.append(newSaveButton);
      // append to table
      tableBody.append(newRow);
      //add event listeners
      let saveButton = $(`#save-${i}`);
      saveButton.on('click', () => this.writeToLocal())
      let textInput = $(`#text-area-${i}`);
      textInput.on('input', () => {
        this.data[i].description = textInput.val();
      });
      };
    };

    timeCalc(modifier = 0,i) {
      // create a copy of the formatted start time
      let copy = this.startTime.format();
      // calculate new time and assign to copy
      copy = (() => moment(copy)
        .add(this.timeSlotDuration * (i + modifier), 'm')
        .subtract(modifier, 'seconds'))();
      return copy;
    }
  }


