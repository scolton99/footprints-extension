# Footprints Extension
A Chrome extension written for Northwestern IT to extend the functionality of the Footprints IT Service Manager.

## Features
This extension provides a number of features that improve the experience of using Footprints.

### Location Detection (TSC Tier 1 Only)
Tier 1 of the IT Support Center is required to set the **Location** field on all tickets that we complete.
To streamline this process, the extension uses the subnet of the computer that it is currently running on to determine
whether the user is at our 1800 Sherman location or our University Library location and it automatically sets the location
accordingly on all tickets created or edited during that session.

In the event that the location cannot be accurately determined (for example, if the user is on the wireless network), a warning
is shown that a location has not been automatically selected, and the location can be set manually through the menu under the 
extension's icon.

**For non-Tier 1 users of the extension**, we recommend that you turn off the location features in the extension settings. 
This will disable the warning and it will stop the extension from automatically setting the Location field.

### Aesthetic Changes
The extension also applies a more aesthetically pleasing theme to the ticket page. This can be disabled in the extension's 
settings.

### Conweb Interaction (TSC Tier 1 Only)
[Conweb](https://kb.northwestern.edu/internal/conweb) will display a warning by default that this extension is not installed. 
Once this extension is installed and Conweb is refreshed, the message will be removed.

### Category Search
Since Footprints has [nearly 1000](https://kb.northwestern.edu/internal/87181) distinct categories, it can be difficult to 
remember where all of them are or even to know that some of them exist. This extension provides a method of searching for 
categories and displaying the closest matching ones.

## Installation
The extension can be installed in Google Chrome on the Chrome Web Store
[here](https://chrome.google.com/webstore/detail/footprints-selector/bhcajiiignledggebpaalkpcccbjohhc).

## Acknowledgements
Thank you to [@tuchandra](https://github.com/tuchandra) for the original idea to create a Chrome Extension for Footprints.
