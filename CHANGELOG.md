# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
