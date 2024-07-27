function processSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('hourly');
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();

  // Find the index of the "Date time" column
  var dateTimeColumnIndex = values[1].indexOf('Date time');
  var minColumnIndex = values[1].indexOf('Min');

  // Convert date-time to plain text and prepare for sorting
  for (var i = 2; i < values.length; i++) {
    if (values[i][dateTimeColumnIndex]) {
      var dateTimeValue = values[i][dateTimeColumnIndex];
      if (dateTimeValue instanceof Date) {
        values[i][dateTimeColumnIndex] = Utilities.formatDate(dateTimeValue, Session.getScriptTimeZone(), "MM/dd/yyyy HH:mm");
      }
    }
  }

  // Sort the array based on the date-time column
  values.sort(function(a, b) {
    return new Date(a[dateTimeColumnIndex]) - new Date(b[dateTimeColumnIndex]);
  });

  // Calculate duration and write it in the "Min" column
  for (var i = 2; i < values.length - 1; i++) {
    var currentDateTime = new Date(values[i][dateTimeColumnIndex]);
    var nextDateTime = new Date(values[i + 1][dateTimeColumnIndex]);
    var durationInMinutes = (nextDateTime - currentDateTime) / (1000 * 60);
    values[i][minColumnIndex] = durationInMinutes;
  }

  // Clear the sheet and write the new values
  sheet.clear();
  sheet.getRange(1, 1, values.length, values[0].length).setValues(values);

  // Format the date-time column as plain text
  sheet.getRange(3, dateTimeColumnIndex + 1, values.length - 2, 1).setNumberFormat("@");
}