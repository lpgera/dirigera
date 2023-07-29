import type { AirPurifier } from './AirPurifier'
import type { Blinds } from './Blinds'
import type { Controller } from './Controller'
import type { EnvironmentSensor } from './EnvironmentSensor'
import type { Hub } from './Hub'
import type { Light } from './Light'
import type { MotionSensor } from './MotionSensor'
import type { Outlet } from './Outlet'
import type { Repeater } from './Repeater'
import type { Speaker } from './Speaker'

export type AnyDevice =
  | AirPurifier
  | Blinds
  | Controller
  | EnvironmentSensor
  | Hub
  | Light
  | MotionSensor
  | Outlet
  | Repeater
  | Speaker
