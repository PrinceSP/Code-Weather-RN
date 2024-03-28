import {configureStore} from "@reduxjs/toolkit"
import unitsMeasurements from './unitsMeasurements.js'

export const store = configureStore({
  reducer:{
    units: unitsMeasurements
  }
})
