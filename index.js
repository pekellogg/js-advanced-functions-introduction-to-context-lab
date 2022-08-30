// assumptions
// employees always check in and check out.
// employees always check in and out on the hour
// Employees will never work across days
//   in at 2200 and out at 0400 the next day

// time represented on 24-hour
// timestamps as Strings:
//   "YYYY-MM-DD 800"
//   "YYYY-MM-DD 1800"
//   "2018-01-01 2300"

function createEmployeeRecord (srcArr) {
  return {
    firstName: srcArr[0],
    familyName: srcArr[1],
    title: srcArr[2],
    payPerHour: srcArr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords (srcArrofArrs) {
  return srcArrofArrs.map(createEmployeeRecord);
}

function createTimeInEvent (employeeObj, timeInStr) {
  let timeStr = timeInStr.split(" ")
  let date = timeStr[0];
  let hour = Number.parseInt(timeStr[1], 10);
  let newEvent = {type: "TimeIn", date: date, hour: hour};
  employeeObj.timeInEvents.push(newEvent);
  return employeeObj;
}

function createTimeOutEvent (employeeObj, timeOutStr) {
  let timeStr = timeOutStr.split(" ")
  let date = timeStr[0];
  let hour = Number.parseInt(timeStr[1], 10);
  let newEvent = {type: "TimeOut", date: date, hour: hour};
  employeeObj.timeOutEvents.push(newEvent);
  return employeeObj;
}

function hoursWorkedOnDate (employeeObj, dateStr) {
  let timeIn = employeeObj.timeInEvents.find(function(e) { return e.date === dateStr });
  let timeOut = employeeObj.timeOutEvents.find(function(e) { return e.date === dateStr });
  return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate (employeeObj, dateStr) {
  return hoursWorkedOnDate(employeeObj, dateStr) * employeeObj.payPerHour
}
  
function allWagesFor (employeeObj) {
  let eligibleDates = employeeObj.timeInEvents.map(function(e){ return e.date });
  let wageEarned = eligibleDates.reduce(function(previousVal, date){ return previousVal + wagesEarnedOnDate(employeeObj, date) }, 0);
  return wageEarned
}

function findEmployeeByFirstName (srcArray, employeeNameStr) {
  return srcArray.find(function(record){ return record.firstName === employeeNameStr })
}

function calculatePayroll (employeeObjsArr) {
  return employeeObjsArr.reduce(function(previousVal, record){ return previousVal + allWagesFor(record) }, 0)
}