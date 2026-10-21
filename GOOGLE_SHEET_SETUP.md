# 💍 Google Sheets RSVP Setup Guide — Hemanth & Yashaswini

Follow these simple steps to link your RSVP form directly to Google Sheets with a live executive dashboard.

---

### Step 1: Create a Google Sheet
1. Open [https://sheets.new](https://sheets.new) in your browser.
2. Name the sheet **Hemanth & Yashaswini RSVP**.

---

### Step 2: Open Apps Script & Paste the Code
1. In the Google Sheets menu, click **Extensions** → **Apps Script**.
2. Select everything in the code editor (`Code.gs`) and delete it.
3. Open [`google-sheet-script.gs`](file:///C:/Users/sohai/.gemini/antigravity/scratch/hemanth%20weds%20yashaswini/google-sheet-script.gs) from your project folder, copy all contents, and paste into `Code.gs`.
4. Press **Ctrl + S** (or Cmd + S) to save.

---

### Step 3: Run `setupSheet`
1. In the top toolbar dropdown (next to *Debug*), select **setupSheet**.
2. Click **Run**.
3. When prompted for authorization:
   - Click **Review Permissions**.
   - Select your Google account.
   - Click **Advanced** (bottom left of popup).
   - Click **Go to Untitled project (unsafe)**.
   - Click **Allow**.
4. Switch back to your Google Sheet tab — you will see a luxury royal navy and gold live metric dashboard with automatic formulas!

---

### Step 4: Deploy as a Web App
1. In the top-right corner of Apps Script, click the blue **Deploy** button → **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in:
   - **Description**: `RSVP Webhook`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` *(IMPORTANT: Must be "Anyone" so guests can submit without logging into your Google account)*
4. Click **Deploy**.
5. Copy the **Web app URL** (starts with `https://script.google.com/macros/s/.../exec`).

---

### Step 5: Connect URL in Website
1. Open [`src/wedding.config.ts`](file:///C:/Users/sohai/.gemini/antigravity/scratch/hemanth%20weds%20yashaswini/src/wedding.config.ts).
2. Under `rsvp.googleSheetWebhookUrl`, paste your Web app URL:
```typescript
rsvp: {
  googleSheetWebhookUrl: 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec',
}
```
3. Save the file. All RSVPs will now automatically stream live into your Google Sheet!
