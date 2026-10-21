/**
 * =======================================================================
 * 💍 HEMANTH & YASHASWINI WEDDING — GOOGLE SHEETS RSVP SCRIPT & DASHBOARD
 * =======================================================================
 * 
 * FEATURES:
 * 1. EXECUTIVE LIVE METRICS DASHBOARD:
 *    - Total Submissions
 *    - Total Attending Guests (Live Headcount)
 *    - Haldi Attendees
 *    - Wedding & Dinner Attendees
 *    - Mangalya Dharanam Attendees
 *    - Reception Attendees
 * 
 * 2. STRUCTURED DATA COLUMNS:
 *    - Col A: Timestamp
 *    - Col B: Guest Name
 *    - Col C: Contact (Phone / Email)
 *    - Col D: Total Guests
 *    - Col E: Haldi (30 Oct)
 *    - Col F: Wedding & Dinner (31 Oct)
 *    - Col G: Mangalya Dharanam (01 Nov)
 *    - Col H: Reception (06 Nov)
 *    - Col I: Warm Wishes / Blessings
 * 
 * 3. SMART IN-PLACE EDITING:
 *    - If a guest updates their RSVP, it automatically finds their row
 *      by contact/name and updates it in place without creating duplicates!
 * 
 * =======================================================================
 * HOW TO SET UP (Takes 2 minutes):
 * 1. Create a new Google Sheet at https://sheets.new
 * 2. Click Extensions -> Apps Script
 * 3. Delete any code in Code.gs and paste this ENTIRE file
 * 4. In the function dropdown at the top, select "setupSheet" and click "Run"
 *    (Click "Review Permissions" -> Choose your account -> "Advanced" -> "Go to Untitled project (unsafe)" -> "Allow")
 *    Your Google Sheet is now instantly transformed into a luxury royal dashboard!
 * 5. Click "Deploy" (top-right blue button) -> "New deployment"
 *    - Select type: "Web app" (click gear icon)
 *    - Description: "RSVP Webhook"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (CRITICAL: Do NOT choose "Only myself")
 *    - Click "Deploy"
 * 6. Copy the "Web app URL" and paste it into wedding.config.ts -> rsvp.googleSheetWebhookUrl
 * =======================================================================
 */

var SHEET_NAME = "RSVP Responses";

var HEADERS = [
  "Timestamp",
  "Guest Name",
  "Contact (Phone / Email)",
  "Total Guests",
  "Haldi (30 Oct)",
  "Wedding & Dinner (31 Oct)",
  "Mangalya Dharanam (01 Nov)",
  "Reception (06 Nov)",
  "Warm Wishes / Blessings"
];

/**
 * Clean contact string for comparison
 */
function cleanContact(c) {
  if (!c) return "";
  return String(c).trim().toLowerCase().replace(/\s+/g, "");
}

/**
 * Searches the sheet to find an existing row for this guest to update in place
 */
function findExistingRowIndex(sheet, data, startRow) {
  var lastRow = sheet.getLastRow();
  if (lastRow < startRow) return -1;

  var numRows = lastRow - startRow + 1;
  // Read Col B (Name) & Col C (Contact) from startRow to lastRow
  var values = sheet.getRange(startRow, 2, numRows, 2).getValues();

  var targetContact = cleanContact(data.contact || data.phone || data.email);
  var targetName = cleanContact(data.name || data.fullName);

  // 1. Primary check: Contact / Email / Phone match (searches newest rows first)
  if (targetContact) {
    for (var i = values.length - 1; i >= 0; i--) {
      var rowContact = cleanContact(values[i][1]); // Col C
      if (rowContact && rowContact !== "-") {
        if (rowContact === targetContact || rowContact.replace(/\D/g, "") === targetContact.replace(/\D/g, "")) {
          return startRow + i;
        }
      }
    }
  }

  // 2. Secondary check: Exact Name match
  if (targetName && targetName.length > 2) {
    for (var j = values.length - 1; j >= 0; j--) {
      var rowName = cleanContact(values[j][0]); // Col B
      if (rowName && rowName === targetName) {
        return startRow + j;
      }
    }
  }

  return -1; // New RSVP
}

/**
 * INITIALIZES THE LUXURY WEDDING DASHBOARD & STYLED DATA TABLE
 * Run this function once from the Apps Script toolbar!
 */
function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  sheet.setName(SHEET_NAME);
  sheet.clear();

  // Color Palette: Royal Navy & Luxury Gold
  var COLOR_NAVY = "#162E5A";
  var COLOR_GOLD = "#D4AF37";
  var COLOR_LIGHT_BLUE = "#EBF3FB";
  var COLOR_CARD_BG = "#F6F9FD";
  var COLOR_TEXT_MUTED = "#5578A0";

  // ── 1. HEADER BANNER ──
  sheet.getRange("A1:I1").merge();
  var banner = sheet.getRange("A1");
  banner.setValue("💍 HEMANTH & YASHASWINI WEDDING — EXECUTIVE RSVP DASHBOARD");
  banner.setBackground(COLOR_NAVY);
  banner.setFontColor("#FFFFFF");
  banner.setFontSize(14);
  banner.setFontWeight("bold");
  banner.setHorizontalAlignment("center");
  banner.setVerticalAlignment("middle");
  sheet.setRowHeight(1, 44);

  // ── 2. METRICS CARDS (ROW 3 & 4) ──
  // Card 1: Total RSVPs
  sheet.getRange("B3:C3").merge();
  sheet.getRange("B3").setValue("TOTAL SUBMISSIONS").setFontSize(9).setFontWeight("bold").setFontColor(COLOR_TEXT_MUTED).setHorizontalAlignment("center");
  sheet.getRange("B4:C4").merge();
  sheet.getRange("B4").setFormula('=IFERROR(COUNTA(B8:B), 0)').setFontSize(20).setFontWeight("bold").setFontColor(COLOR_NAVY).setHorizontalAlignment("center");
  sheet.getRange("B3:C4").setBackground(COLOR_CARD_BG).setBorder(true, true, true, true, false, false, COLOR_GOLD, SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

  // Card 2: Total Attending Guests
  sheet.getRange("D3:E3").merge();
  sheet.getRange("D3").setValue("TOTAL ATTENDING GUESTS").setFontSize(9).setFontWeight("bold").setFontColor(COLOR_TEXT_MUTED).setHorizontalAlignment("center");
  sheet.getRange("D4:E4").merge();
  sheet.getRange("D4").setFormula('=IFERROR(SUM(D8:D), 0)').setFontSize(20).setFontWeight("bold").setFontColor("#15803D").setHorizontalAlignment("center");
  sheet.getRange("D3:E4").setBackground(COLOR_CARD_BG).setBorder(true, true, true, true, false, false, COLOR_GOLD, SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

  // Card 3: Haldi Count
  sheet.getRange("F3").setValue("HALDI (30 OCT)").setFontSize(8).setFontWeight("bold").setFontColor(COLOR_TEXT_MUTED).setHorizontalAlignment("center");
  sheet.getRange("F4").setFormula('=IFERROR(SUMIF(E8:E, "Yes", D8:D), 0)').setFontSize(16).setFontWeight("bold").setFontColor(COLOR_NAVY).setHorizontalAlignment("center");
  sheet.getRange("F3:F4").setBackground(COLOR_CARD_BG).setBorder(true, true, true, true, false, false, "#CBD5E1", SpreadsheetApp.BorderStyle.SOLID);

  // Card 4: Wedding Count
  sheet.getRange("G3").setValue("WEDDING & DINNER").setFontSize(8).setFontWeight("bold").setFontColor(COLOR_TEXT_MUTED).setHorizontalAlignment("center");
  sheet.getRange("G4").setFormula('=IFERROR(SUMIF(F8:F, "Yes", D8:D), 0)').setFontSize(16).setFontWeight("bold").setFontColor(COLOR_NAVY).setHorizontalAlignment("center");
  sheet.getRange("G3:G4").setBackground(COLOR_CARD_BG).setBorder(true, true, true, true, false, false, "#CBD5E1", SpreadsheetApp.BorderStyle.SOLID);

  // Card 5: Muhurtham Count
  sheet.getRange("H3").setValue("MUHURTHAM (01 NOV)").setFontSize(8).setFontWeight("bold").setFontColor(COLOR_TEXT_MUTED).setHorizontalAlignment("center");
  sheet.getRange("H4").setFormula('=IFERROR(SUMIF(G8:G, "Yes", D8:D), 0)').setFontSize(16).setFontWeight("bold").setFontColor(COLOR_NAVY).setHorizontalAlignment("center");
  sheet.getRange("H3:H4").setBackground(COLOR_CARD_BG).setBorder(true, true, true, true, false, false, "#CBD5E1", SpreadsheetApp.BorderStyle.SOLID);

  // Card 6: Reception Count
  sheet.getRange("I3").setValue("RECEPTION (06 NOV)").setFontSize(8).setFontWeight("bold").setFontColor(COLOR_TEXT_MUTED).setHorizontalAlignment("center");
  sheet.getRange("I4").setFormula('=IFERROR(SUMIF(H8:H, "Yes", D8:D), 0)').setFontSize(16).setFontWeight("bold").setFontColor(COLOR_NAVY).setHorizontalAlignment("center");
  sheet.getRange("I3:I4").setBackground(COLOR_CARD_BG).setBorder(true, true, true, true, false, false, "#CBD5E1", SpreadsheetApp.BorderStyle.SOLID);

  sheet.setRowHeight(3, 24);
  sheet.setRowHeight(4, 38);

  // ── 3. DATA TABLE HEADERS (ROW 7) ──
  sheet.setRowHeight(6, 12); // Spacer row
  var headerRange = sheet.getRange(7, 1, 1, HEADERS.length);
  headerRange.setValues([HEADERS]);
  headerRange.setBackground(COLOR_NAVY);
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(10);
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  sheet.setRowHeight(7, 36);

  // Freeze top rows so headers stay pinned when scrolling
  sheet.setFrozenRows(7);

  // Column Widths
  sheet.setColumnWidth(1, 150); // Timestamp
  sheet.setColumnWidth(2, 180); // Guest Name
  sheet.setColumnWidth(3, 190); // Contact
  sheet.setColumnWidth(4, 110); // Guests Count
  sheet.setColumnWidth(5, 130); // Haldi
  sheet.setColumnWidth(6, 170); // Wedding
  sheet.setColumnWidth(7, 180); // Muhurtham
  sheet.setColumnWidth(8, 150); // Reception
  sheet.setColumnWidth(9, 300); // Wishes

  // Set gridlines
  sheet.setShowGridLines(true);
}

/**
 * WEBHOOK POST ENDPOINT: Receives RSVP from website form
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000); // Prevent concurrent write race conditions

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.getActiveSheet();
      setupSheet();
    }

    var data;
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = e.parameter;
      }
    } else {
      data = e.parameter;
    }

    var timestamp = new Date();
    var name = data.name || data.fullName || "Guest";
    var contact = data.contact || data.email || data.phone || "-";
    var guestCount = parseInt(data.guestCount || data.guests || 1, 10);
    if (isNaN(guestCount) || guestCount < 1) guestCount = 1;

    // Events mapping
    var haldi = data.haldi === "Yes" || data.haldi === "attending" ? "Yes" : "No";
    var wedding = data.wedding === "Yes" || data.wedding === "attending" ? "Yes" : "No";
    var muhurtham = data.muhurtham === "Yes" || data.muhurtham === "attending" ? "Yes" : "No";
    var reception = data.reception === "Yes" || data.reception === "attending" ? "Yes" : "No";
    var message = data.message || data.note || data.wishes || "";

    var rowValues = [
      timestamp,
      name,
      contact,
      guestCount,
      haldi,
      wedding,
      muhurtham,
      reception,
      message
    ];

    // Check if guest already exists to update in place
    var startDataRow = 8;
    var existingRow = findExistingRowIndex(sheet, data, startDataRow);

    var targetRow = existingRow !== -1 ? existingRow : Math.max(sheet.getLastRow() + 1, startDataRow);

    var targetRange = sheet.getRange(targetRow, 1, 1, rowValues.length);
    targetRange.setValues([rowValues]);

    // Style row
    targetRange.setFontSize(10).setVerticalAlignment("middle");
    sheet.getRange(targetRow, 1).setNumberFormat("yyyy-mm-dd hh:mm:ss");
    sheet.getRange(targetRow, 4, 1, 5).setHorizontalAlignment("center");

    // Alternate row zebra striping
    var rowBg = targetRow % 2 === 0 ? "#F8FAFC" : "#FFFFFF";
    targetRange.setBackground(rowBg);

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        row: targetRow,
        isUpdate: existingRow !== -1,
        message: existingRow !== -1 ? "RSVP updated successfully!" : "RSVP recorded successfully!"
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * GET Endpoint for testing connection
 */
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "active",
      message: "💍 Hemanth & Yashaswini Wedding RSVP Webhook is live and ready!"
    })
  ).setMimeType(ContentService.MimeType.JSON);
}
