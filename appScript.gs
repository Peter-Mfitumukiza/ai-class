function listAllFiles() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Clear existing content and set headers
  sheet.clear();
  sheet.getRange(1, 1, 1, 4).setValues([['name of the file', 'id', 'file type', 'size']]);
  
  var files = DriveApp.getFiles();
  var fileData = [];
  
  while (files.hasNext()) {
    var file = files.next();
    fileData.push([
      file.getName(),
      file.getId(),
      file.getMimeType(),
      file.getSize()
    ]);
  }
  
  // Write data to sheet
  if (fileData.length > 0) {
    sheet.getRange(2, 1, fileData.length, 4).setValues(fileData);
  }
}