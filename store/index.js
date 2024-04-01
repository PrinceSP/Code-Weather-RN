import {configureStore} from "@reduxjs/toolkit"
import unitsMeasurements from './unitsMeasurements.js'
import currentCoordinates from './currentCoordinates.js'

export const store = configureStore({
  reducer:{
    units: unitsMeasurements,
    coords: currentCoordinates
  }
})
