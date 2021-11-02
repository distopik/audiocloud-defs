import { OutInLabels, segmented, ToggleValues } from "../../types"

export const ElysiaXfilterModel = {
  parts: {
    eq: {
      inputChannels: 2,
      outputChannels: 2,
      params: {
        enable: {
          unit: "Toggle",
          default: 1,
          labels: OutInLabels,
          allowedValues: ToggleValues
        },
        lowCut: {
          unit: "Toggle",
          default: 0,
          allowedValues: ToggleValues
        },
        lowMidQWide: {
          unit: "Toggle",
          default: 0,
          allowedValues: ToggleValues
        },
        highMidQWide: {
          unit: "Toggle",
          default: 0,
          allowedValues: ToggleValues
        },
        highCut: {
          unit: "Toggle",
          default: 0,
          allowedValues: ToggleValues
        },
        passiveMassage: {
          unit: "Toggle",
          default: 0,
          allowedValues: ToggleValues
        },
        lowGain: {
          unit: "dB",
          default: 0,
          allowedValues: [{ min: -16, max: 16 }]
        },
        lowFrequency: {
          unit: "Hz",
          allowedValues: segmented(20, 25, 30, 40, 60, 80, 100, 150, 200, 400, 600, 900),
          default: 90
        },
        lowMidGain: {
          unit: "dB",
          default: 0,
          allowedValues: [{ min: -13, max: 13 }]
        },
        lowMidFrequency: {
          unit: "Hz",
          default: 250,
          allowedValues: segmented(45, 50, 70, 100, 150, 200, 300, 400, 600, 1000, 1500, 2200)
        },
        highMidGain: {
          unit: "dB",
          default: 0,
          allowedValues: [{ min: -13, max: 13 }]
        },
        highMidFrequency: {
          unit: "Hz",
          default: 2250,
          allowedValues: segmented(300, 350, 500, 1000, 1500, 2000, 2500, 3500, 4500, 8000, 12000, 16000)
        },
        highGain: {
          unit: "dB",
          default: 0,
          allowedValues: [{ min: -16, max: 16 }]
        },
        highFrequency: {
          unit: "Hz",
          default: 4500,
          allowedValues: segmented(
            700,
            800,
            1000,
            2000,
            3000,
            4000,
            5000,
            7500,
            10000,
            16000,
            22000,
            28000
          )
        }
      },
      reports: {}
    }
  },
  capabilities: []
}

export const ElysiaXfilterName = "elysia:xfilter-1.0"
