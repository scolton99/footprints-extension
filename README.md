# footprints-selector
A browser extension written for Northwestern IT to auto-select the Walk-In Location field on Footprints.

## About
This extension was developed out of laziness and forgetfulness. While at work, I frequently forgot to select the Walk-In Location field, and we are unable to make it mandatory, so I took matters into my own hands.

This auto-detects your location as either the Library or Sherman based on the IP address of your computer. If your location cannot be determined, it asks for it on the Footprints login screen. This is saved to Chrome storage, and the extension then automatically populates the Walk-In Location field when editing tickets.

**April 23, 2018** - We updated the Northwestern IT splash page ("CONWEB") to include a banner telling consultants to use this. The newest version of the extension removes that banner.

## Installation
### Chrome
1. Click the green "Clone or download" button, then Download ZIP.
2. Unzip the repository somewhere.
3. Visit `chrome://extensions` in your browser, or open up the Chrome menu > More Tools > Extensions.
4. Ensure that the "Developer mode" checkbox in the top right is checked.
5. Click "Load unpacked extension ..." to pop up a file-selection dialog.
6. Select the directory you just created.

If you are already logged into Footprints, please log out and log back in for this to take effect.

### Firefox
1. Click the green "Clone or download" button, then Download ZIP.
2. Unzip the repository somewhere.
3. Visit `about:debugging` in your browser
4. Ensure that the "Enable add-on debugging" checkbox in the top left is checked.
5. Click "Load Temporary Add-on" to pop up a file-selection dialog.
6. Select _any file_ (```selector.js```, ```choose_location.js```, etc.) in the directory you just created.

If you are already logged into Footprints, please log out and log back in for this to take effect.

That should be all you need to get started. Please email me with any questions or bug reports.

## Acknowledgements
Thank you to [@pavilion99](https://github.com/pavilion99) for your contributions.