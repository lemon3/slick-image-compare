# Changelog

## v0.4.7
### Changed
- bugfix: error when only one DOM image was given (<img src="" />) fixed.

## v0.4.6
### Changed
- bugfix

## v0.4.5
### Changed
- bugfix: fixed a bug with the 'before' and 'after' label if 'ltr' (left-to-right direction) was set to 'false' in the option object.

## v0.4.4
### Added
- SlickImageCompare.**getDefaults()** static function added, returns the object with the default values.
- SlickImageCompare.**getInstances()** static function added, returns array with all instances, or false.
### Changed
- optimization
- update README doc

## v0.4.3
### Added
- combineDataset option added, available values: true, false, default value: true. Combines dataset values with the values given in the options object (js overrides existing dataset values)
- added style to package.json exports
### Changed
- autoInit for the (data api) has been removed, you have to manually call the static class method: **SlickImageCompare.init()**;
- Positioning of the before and after images changed. Now, by default, the first element in the DOM tree is the left one in the slider, and the second image element is the right one. (you can change this behavior by setting the option 'ltr' to false)

## v0.4.2
### Added or Changed
- small css bugfix (vertical view)
- improve handle-angle (horizontal and vertical view)
- demo update

## v0.4.1
### Added or Changed
- small css bugfix

## v0.4.0
### Added or Changed
- it is now possible to change the angle of the handle (parting line)
- general improvements

## v0.3.0
### Added or Changed
- added picture element support
- optimization of responsive images via srcset attribute

## v0.2.14
### Added or Changed
- added interactionstart event
- demo/preview update with more documentation

## v0.2.13
### Added or Changed
- Added basic CSS to JS so the layout doesn't look destroyed.
(If the default style is not loaded)
- Add class “playing” when play() method is active (remove when stopped or interrupted).

## v0.2.12
### Added or Changed
- rename to slick-image-compare

## v0.2.11
### Added or Changed
- drag-handle css update
- preview update

## v0.2.10
### Added or Changed
- object-fit cover support added
- preview update

## v0.2.9
### Added or Changed
- play method added
- preview update

## v0.2.8
### Added or Changed
- performance optimization
- preview update

## v0.2.7
### Added or Changed
- changeOrientation and changeDirection update

## v0.2.6
### Added or Changed
- changeOrientation support

## v0.2.5
### Added or Changed
- changeDirection
- horizontal and vertical support

## v0.2.4
### Added or Changed
- style update
- dimension calculation update

## v0.2.3
### Added or Changed
- changed options afterOnTheRight with ltr true|false
- added viewchanged event (fired when the before or after image is 70 percent or more visible)

## v0.2.2
### Added or Changed
- remove toggle-button & description options in favour of events

## v0.2.1
- performance update
- bug fixing
- event emitter

## v0.2.0
- switching to vite / vitest

## v0.1.2
- bug fixes and improvements
- update getJSONData in helper
- add imageDimensions in helper
- update demo

## v0.1.1
- bug fixing
- add Promise to _animateTo method

## v0.1.0
- The initial version of an old library (from the year 2014)
- translated to modern js
