import { Static, Type } from "@sinclair/typebox"

export const Unit = Type.Union(
  [
    Type.Literal("dB"),
    Type.Literal("Hz"),
    Type.Literal("Seconds"),
    Type.Literal("Percent"),
    Type.Literal("None"),
    Type.Literal("Toggle"),
    Type.Literal("Ratio")
  ],
  { $id: "Unit" }
)

export type Unit = Static<typeof Unit>

export const AllowedValue = Type.Union(
  [
    Type.Number(),
    Type.Object({
      min: Type.Number(),
      max: Type.Number()
    })
  ],
  { $id: "AllowedValue" }
)

export type AllowedValue = Static<typeof AllowedValue>

export const ParameterModel = Type.Object(
  {
    default: Type.Number(),
    unit: Unit,
    allowedValues: Type.Array(AllowedValue),
    channels: Type.Optional(Type.Number({ default: 1 })),
    labels: Type.Optional(Type.Array(Type.Union([Type.Null(), Type.String()])))
  },
  {
    additionalProperties: false,
    $id: "ParameterModel"
  }
)

export type ParameterModel = Static<typeof ParameterModel>

export const ReportModel = Type.Object(
  {
    unit: Unit,
    allowedValues: Type.Array(AllowedValue),
    channels: Type.Optional(Type.Number({ default: 1 })),
    labels: Type.Optional(Type.Array(Type.Union([Type.Null(), Type.String()])))
  },
  {
    additionalProperties: false,
    $id: "ReportModel"
  }
)

export type ReportModel = Static<typeof ReportModel>

export const InstanceCapabilities = Type.Union(
  [Type.Literal("Router"), Type.Literal("AudioCard"), Type.Literal("AlwaysOn"), Type.Literal("Media")],
  { $id: "InstanceCapabilities" }
)

export type InstanceCapabilities = Static<typeof InstanceCapabilities>

export const InstanceModelPart = Type.Object(
  {
    inputChannels: Type.Number({ default: 2 }),
    outputChannels: Type.Number({ default: 2 }),
    params: Type.Record(Type.String(), ParameterModel),
    reports: Type.Record(Type.String(), ReportModel)
  },
  {
    additionalProperties: false,
    $id: "InstanceModelPart"
  }
)

export type InstanceModelPart = Static<typeof InstanceModelPart>

export const PartId = Type.Union(
  [
    Type.String(),
    Type.Literal("eq"),
    Type.Literal("compressor"),
    Type.Literal("limiter"),
    Type.Literal("saturation"),
    Type.Literal("preamp")
  ],
  {
    $id: "PartId"
  }
)

export type PartId = Static<typeof PartId>

export const InstanceModel = Type.Object(
  {
    // XXX: for some reason PartId is  not accepted here. Bug?
    parts: Type.Record(Type.String(), InstanceModelPart),
    capabilities: Type.Array(InstanceCapabilities)
  },
  { additionalProperties: false, $id: "InstanceModel" }
)

export type InstanceModel = Static<typeof InstanceModel>

export const InstanceRef = Type.Object(
  {
    domainId: Type.String(),
    instanceId: Type.String()
  },
  { additionalProperties: false, $id: "InstanceRef" }
)

export type InstanceRef = Static<typeof InstanceRef>

export function instanceRefToString(ref: InstanceRef) {
  return `${ref.domainId}:${ref.instanceId}`
}

export const InstancePartRef = Type.Object(
  {
    domainId: Type.String(),
    instanceId: Type.String(),
    partId: Type.String()
  },
  { additionalProperties: false, $id: "InstancePartRef" }
)

export function instancePartRefToString(ref: InstancePartRef) {
  return `${ref.domainId}.${ref.instanceId}.${ref.partId}`
}

export type InstancePartRef = Static<typeof InstancePartRef>

export const InstanceRoute = Type.Object(
  {
    from: InstancePartRef,
    to: InstancePartRef
  },
  { additionalProperties: false, $id: "InstanceRoute" }
)

export type InstanceRoute = Static<typeof InstanceRoute>

export function segmented(...values: number[]) {
  const rv = []
  for (let i = 0; i < values.length - 1; i++) {
    rv.push({ min: values[i], max: values[i + 1] })
  }
  return rv
}

export function normalizeRange(value: number, allowedValues: AllowedValue[], factor = 1) {
  let numValues = allowedValues.length
  for (let i = 0; i < allowedValues.length; i++) {
    const allowedValue = allowedValues[i]
    if (typeof allowedValue === "object") {
      if (allowedValue.min <= value && allowedValue.max >= value) {
        const range = Math.abs(allowedValue.max - allowedValue.min)
        const position = (value - allowedValue.min) / range
        return ((i + position) / numValues) * factor
      }
    } else if (allowedValue === value) {
      return (i / numValues) * factor
    }
  }
  throw new Error("Could not normalize")
}

export const ToggleValues = [0, 1]
export const OutInLabels = ["Out", "In"]
export const PercentValues = [{ min: 0, max: 100 }]
