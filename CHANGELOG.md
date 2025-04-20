# Changelog

## [Unreleased](https://github.com/lpgera/dirigera/compare/v1.3.0...HEAD)

- Add support for BADRING water sensors by introducing the `client.waterSensors` API and the `WaterSensor` type
  including the `waterLeakDetected` attribute.
- Verify the HTTPS certificate of the hub for better security.

## [1.3.0](https://github.com/lpgera/dirigera/compare/v1.2.0...v1.3.0) - 2024-12-10

- Add startupOnOff startToggle mode for lights and outlets.
- Update dependencies.

## [1.2.0](https://github.com/lpgera/dirigera/compare/v1.1.0...v1.2.0) - 2024-10-20

- Add support for VALLHORN's light sensor functionality by introducing the `client.lightSensors` API and the
  `LightSensor` type, including the `illuminance` attribute.

## [1.1.0](https://github.com/lpgera/dirigera/compare/v1.0.0...v1.1.0) - 2024-10-02

- Add support for INSPELNING plug, including energy measurement attributes, child lock and status light toggle.

## [1.0.0](https://github.com/lpgera/dirigera/releases/tag/v1.0.0) - 2024-08-24

First stable release.
