---
name: update_organiser_dropdown
description: Updates the 'Organiser' column in 'Event_Master' sheet to use a dropdown validation from the 'Organisers' sheet.
---

# Update Organiser Dropdown (Google Apps Script)

This skill updates the `Event_Master` Google Sheet to ensure the `Organiser` column (Column G, index 7) uses a dropdown list sourced from the `Organisers` sheet.

## Usage

1.  Open the Google Sheet: **Lounge Asia Automation**
2.  Open **Extensions > Apps Script**.
3.  Add or update the following function in `DatabaseSetup.js` (or a new file).
4.  Run the function `setupValidations` or `setOrganiserDropdown`.

## Script Code

```javascript
/**
 * Sets up the Organiser dropdown in Event_Master sheet.
 */
function setOrganiserDropdown() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const eventSheet = ss.getSheetByName("Event_Master");
  const organiserSheet = ss.getSheetByName("Organisers");

  if (!eventSheet || !organiserSheet) {
    Logger.log("Error: Missing sheets.");
    return;
  }

  // Configuration
  const TARGET_COL = 7; // Column G
  const START_ROW = 2;
  const DATA_COL = 1;   // Column A in Organisers

  // Define Range
  const maxRows = eventSheet.getMaxRows();
  const dropdownRange = eventSheet.getRange(START_ROW, TARGET_COL, maxRows - 1, 1);

  // Define Source Range (Dynamic)
  const lastSourceRow = Math.max(organiserSheet.getLastRow(), 2);
  const sourceRange = organiserSheet.getRange(2, DATA_COL, lastSourceRow - 1, 1);

  // Create Validation Rule
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInRange(sourceRange)
    .setAllowInvalid(false)
    .setHelpText("Please select a valid Organiser.")
    .build();

  // Apply
  dropdownRange.setDataValidation(rule);
  Logger.log("Organiser dropdown updated.");
}
```

## Verification

1.  Go to `Event_Master` sheet.
2.  Click any cell in **Column G** (Row 2+).
3.  Confirm a dropdown appears with names from the `Organisers` sheet.
