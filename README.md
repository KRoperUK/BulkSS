# BulkSS

## Warning

>This is an early release project. This code is not tested properly, may not function correctly. Use with caution. You are responsible for any errors that arise from using this project.

## About

One issue I've found with StaffSavvy is that it takes ages to fill in multiple shift offers. This Chrome Extension solves that.

## How it Works

StaffSavvy seems to use ```https://<STAFFSAVVYURL.COM>/ajax/list-covershifts.php?take=<SHIFTNUMBER>&type=getz``` to apply for cover shifts.

Upon loading into the ```/shift/available``` page, the extension injects a bunch of JS and some HTML elements, plus some localStorage incase you refresh.

Once you click ```Process``` it will run the ajax requests in the background. Wait until it says ```Processed``` and it will all be fine and dandy.

## Installation

1. Clone the repo to somewhere safe and and accessible (e.g. Documents).
2. Open Chrome.
3. Go to Settings → Extensions.
  - Or navigate to chrome://extensions.
4. Enable Developer Mode.
5. Click ```Load unpacked```.
6. Navigate to the BulkSS folder and select it. This is the folder that contains ```manifest.json```.
7. Navigate to [Available Shifts](https://staff.guildofstudents.com/shifts/available).

## Usage

1. When loaded correctly, there will be ```Add to List``` buttons on each shift. Click these buttons to add to the ```Process list```.
2. Once you have selected all the shifts you want, click the ```Process list``` button.
3. Wait until ```X shifts remaining...``` becomes ```Processed```.

### Please note

- Sometimes not all shifts will be offered, simply repeat 1-3 again until they are offered.
- You can always use the normal offer / withdraw offer buttons.
- You can disable / uninstall the extension at any time.
- Currently, StaffSavvy changes the shift table view when the screen width is narrow. The ```Add to List``` buttons are currently only visible when in the wide view setting as shown in the demonstration video.

## Issues

- [ ] Less jank needed
- [ ] Better error handling
- [ ] Support for other StaffSavvy sites. (e.g. user custom entry / using active tab)
- [ ] Support for bulk cancelling shifts - should be pretty easy to implement.

For now, this application only supports the University of Birmingham - Guild of Students StaffSavvy.

## Contributing

Please fork the repo.

## Acknowledgements

FontAwesome for the icon logo. Bulk mail.

## Security

If there are any security concerns please contact me on GitHub through email or personal message.

## Functionality

https://github.com/KRoperUK/BulkSS/assets/13541920/970ae50e-999f-46af-a9a5-f1fa33a1af11
