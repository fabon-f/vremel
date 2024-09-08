# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `startOfYear`, `startOfMonth`, `startOfDay`, `startOfHour`, `startOfMinute`, `startOfSecond`, `endOfYear`, `endOfMonth`, `endOfDay`, `endOfHour`, `endOfMinute`, `endOfSecond`, `fromRfc2822`, `fromRfc7231` functions

### Changed

- Make `formatWithoutLocale` not accept a temporal objects with non-ISO calendar by default. If you want to do that, please use `formatNonIsoDate` option.

## 0.3.3 (2024-05-09)

### Removed

- Stop exporting `Temporal` type from main module because it messed up docs. ([1126424](https://github.com/fabon-f/vremel/commit/1126424c2cd077267080a1dfa7c966ae4b499192))

## 0.3.2 (2024-05-09)

### Added

- Export custom types and `Temporal` itself in main module. ([6765b8d](https://github.com/fabon-f/vremel/commit/6765b8dd0b5e6e22d5088bbb93f9a99c0acddb84))

### Changed

- Move API docs to [JSR](https://jsr.io/@fabon/vremel/doc).

### Removed

- Stop exporting the namespace `duration` from main module. You can still import functions from `vremel/duration`. ([ffc4687](https://github.com/fabon-f/vremel/commit/ffc468739ea977904ad10e2782c4b3b49634260e))

## 0.3.1 (2024-05-08)

### Changed

- Update the type definition for Temporal API to latest spec. ([373c2ce](https://github.com/fabon-f/vremel/commit/373c2ce8434a2282ee12f859c8aefb9362524835))

## 0.3.0 (2024-03-11)

### Added

- `areIntervalsOverlapping`, `clamp`, `isWithinInterval` functions

### Changed

- Stop converting calendar automatically in `closestIndexTo` and `closestTo` for consistency with other functions. ([dcd1f37](https://github.com/fabon-f/vremel/commit/dcd1f37eb5c1de70a3bde61de88bce879e4aa8e8))

## 0.2.0 (2024-03-03)

### Added

- `toTemporalFromClockTime`, `formatWithoutLocale` functions

### Changed

- Change type signatures of functions, using generics instead of overload functions. ([be7da06](https://github.com/fabon-f/vremel/commit/be7da062168f2ca26152f885fbc275db2d631323))

## 0.1.2 (2024-02-13)

### Added

- `toDateFromClockTime`, `closestTo`, `closestIndexTo` functions

### Fixed

- Fix a broken type definition.

## 0.1.1 (2024-02-12)

### Fixed

- Fix a bug that some functions are not exported from the package.

## 0.1.0 (2024-02-12)

### Added

- `earliest`, `latest`, `isAfter`, `isBefore`, `compareAsc`, `compareDesc` functions
- `isEqual`, `longest`, `shortest` functions in `vremel/duration`
