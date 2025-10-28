
# Invoice App

>This is a React + Vite based invoice management app. You can upload invoice PDFs, auto-populate fields, and manage invoice details.

## Setup Instructions

### Prerequisites
- Node.js (v18 or newer recommended)
- npm (comes with Node.js)

### 1. Clone the repository
```powershell
git clone https://github.com/Asthasingh-2002/invoice-app.git
cd invoice-app
```

### 2. Install dependencies
```powershell
npm install
```

### 3. Start the development server
```powershell
npm run dev
```
This will start the app at [http://localhost:5173](http://localhost:5173) (default Vite port).

### 4. Open the app
Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Features
- Upload invoice PDFs and preview them
- Auto-populate invoice fields from PDF (if implemented)
- Fill and save invoice details
- Responsive design

## Project Structure
- `src/components/` — React components (InvoiceForm, PDFUploadArea, Header)
- `src/pages/` — Page components (InvoicePage, LoginPage)
- `src/styles/` — CSS files for styling
- `public/` — Static assets

## Troubleshooting
- If you see errors about missing dependencies, run `npm install` again.
- For port conflicts, change the port in `vite.config.js` or stop other apps using port 5173.

## Build for Production
```powershell
npm run build
```
Output will be in the `dist/` folder.

## License
MIT
