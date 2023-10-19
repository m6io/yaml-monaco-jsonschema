import { JSONSchema7 } from "json-schema"
import { create } from "zustand"
import { samples } from "./samples"

type Sample = {
  schema: JSONSchema7
}

export type AppState = {
  schema: JSONSchema7
  label: string
  setLabel: (label: string) => void
}

export const useStore = create<AppState>((set) => ({
  schema: samples.Simple.schema as JSONSchema7,
  label: "Simple",
  setLabel: (label: string) => {
    // @ts-expect-error resolve later - TS doesn't like using a string value to query an object
    const sample: Sample = samples[label]
    set({
      label,
      schema: sample.schema as JSONSchema7,
    })
  },
}))
