# BulkSS

## Warning

>This is an early release project. This code is not tested properly, may not function correctly. Use with caution. You are responsible for any errors that arise from using this project.

## About

One issue I've found with StaffSavvy is that it takes ages to fill in multiple shift offers. This Chrome Extension solves that.

## How it Works

StaffSavvy seems to use ```https://<STAFFSAVVYURL.COM>/ajax/list-covershifts.php?take=<SHIFTNUMBER>&type=getz``` to apply for cover shifts.

Upon loading into the ```/shift/available``` page, the extension injects a bunch of JS and some HTML elements, plus some localStorage incase you refresh.

Once you click ```Process``` it will run the ajax requests in the background. Wait until it says ```Processed``` and it will all be fine and dandy.

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

![img/functionality.mp4]
