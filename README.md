# Hide cancelled Amazon orders

A lightweight Chrome extension that automatically hides cancelled orders from your Amazon order history.

## Installation

### Option A: Load unpacked (Developer mode)
1. Download and unzip the extension folder
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer mode** (toggle in the top right)
4. Click **Load unpacked** and select the unzipped folder

### Option B: Install from .crx file
1. Download the `.crx` file from the [Releases](../../releases) page
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer mode** (toggle in the top right)
4. Drag and drop the `.crx` file onto the page and confirm the installation prompt

## Usage

Navigate to your Amazon order history; cancelled orders will be hidden automatically. Click the extension icon in your toolbar to see how many orders are hidden and toggle the filter on or off.

## Supported Storefronts
- amazon.com
- amazon.de
- amazon.co.uk
- amazon.fr
- amazon.ca
- amazon.com.au

## Notes
- The extension only runs on Amazon order pages and does not collect or transmit any data
- Uses Chrome's local storage solely to remember your on/off preference
- If you toggle the filter off, all cancelled orders reappear instantly
