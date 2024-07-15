# React Contact Page with Google Sheets Integration

Our Online Judge platform is an advanced and user-friendly system designed to facilitate coding practice and competitive programming. It offers an extensive problem set that spans from basic exercises to complex algorithmic challenges, catering to programmers of all skill levels. Users can submit their solutions in multiple programming languages and receive real-time feedback on correctness and efficiency through an automated evaluation system. Key features include detailed result analysis, comprehensive test cases, and a variety of difficulty levels, ensuring a thorough and engaging coding experience. Whether you're honing your skills, preparing for competitions, or simply enjoying the art of problem-solving, our platform provides the tools and environment to support your journey in the world of programming.

## Features

- Responsive design
- Contact form submission with Google Sheets integration
- Use of Material-UI components for styling

## Installation
1.Navigate through project directory
```bash
cd <project_directory>
```
2. Clone the repository:

```bash
git clone <https://github.com/TarunDev1478/Contact-Page-Tarun>
```

3.Install npm:

```bash
npm install
```
```bash
npm init
```

4.Install Material-UI components:
```bash
npm install @mui/material @emotion/react @emotion/styled
```

5.Install styled components for Material-UI:
```bash
npm install @mui/material @mui/styled-engine-sc styled-components
```

6.Install Material-UI icons:
```bash
npm install @mui/icons-material
```

# Running project loacally
After importing git hub repo to your dekstop and after installing all dependencies now run following command to see the results.
```bash
npm run dev
```
Open your web browser and navigate to http://localhost:5173 to view the contact page.

Fill out the contact form and submit it. The form data will be sent to a Google Sheets spreadsheet.


# How to link your project with google spreadsheet Spreadsheet

1. Navigate your self to given link https://www.google.com/sheets/about/

2. Singin or signup there to access there Spreadsheet.

3. Now click on go to sheets button or click this llink given https://docs.google.com/spreadsheets/u/0/?ec=asw-sheets-hero-goto

4. Now open a blank sheet for data storage.

5. Name the sheet according to you.

6. Now click on Extensions button given on Menubar nad choose Appscript.

7. And now on code.gs file paste this code given below.
   ```javascript
           const sheetName = '';
        const scriptProp = PropertiesService.getScriptProperties()
        function intialSetup () {
          const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
          scriptProp.setProperty('key', activeSpreadsheet.getId())
        }
        function doPost (e) {
          const lock = LockService.getScriptLock()
          lock.tryLock(10000)
          try {
            const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
            const sheet = doc.getSheetByName(sheetName)
            const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
            const nextRow = sheet.getLastRow() + 1
            const newRow = headers.map(function(header) {
              return header === 'Date' ? new Date() : e.parameter[header]
            })
            sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])
            return ContentService
              .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
              .setMimeType(ContentService.MimeType.JSON)
          }
          catch (e) {
            return ContentService
              .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
              .setMimeType(ContentService.MimeType.JSON)
          }
          finally {
            lock.releaseLock()
          }
        }
```
```
8.In the first line of the given code include your sheet name like my sheet name is form-data, you can get your sheet name at bootomleft corner as sheet1 you can change that name.

9.Now click save and run the code and do as it says to do.

10.After that click on deploy and select webapp.

11.Now it will provide you a link which you can include in the code.

12.Now whenever you will enter any data in form you will see the results in the spreadsheet.

# Credits


1. This project uses React and Vite for development.
2. Material-UI components are used for styling and UI elements.
3. Google Sheets API is used for storing contact form submissions.
