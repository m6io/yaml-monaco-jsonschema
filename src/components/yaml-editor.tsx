import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
import { SchemasSettings, setDiagnosticsOptions } from "monaco-yaml"
import { FC, useEffect, useRef, useState } from "react"
import { AppState, useStore } from "../store"
import "./yaml-editor-styles.css"

const selector = (state: AppState) => ({
  schema: state.schema,
})

export const YamlEditor: FC = () => {
  const { schema } = useStore(selector)
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null)
  const monacoEl = useRef(null)
  const problemsEl = useRef(null)

  const defaultSchema: SchemasSettings = {
    uri: "http://example.com/schema.json",
    schema,
    fileMatch: ["monaco-yaml.yaml"],
  }

  setDiagnosticsOptions({
    schemas: [defaultSchema],
    format: true,
    hover: true,
    completion: true,
  })

  const value = ``.replace(/:$/m, ": ")

  useEffect(() => {
    if (monacoEl) {
      setEditor((editor) => {
        if (editor) return editor

        return monaco.editor.create(monacoEl.current!, {
          value: "",
          language: "yaml",
          automaticLayout: true,
          model: monaco.editor.createModel(
            value,
            "yaml",
            monaco.Uri.parse("monaco-yaml.yaml"),
          ),
          theme: window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "vs-dark"
            : "vs-light",
        })
      })
    }

    monaco.editor.onDidChangeMarkers(([resource]) => {
      if (resource.path !== "/monaco-yaml.yaml") {
        return
      }

      const problems: HTMLElement = problemsEl.current!
      const markers = monaco.editor.getModelMarkers({ resource })
      while (problems.lastChild) {
        problems.lastChild.remove()
      }

      for (const marker of markers) {
        if (marker.severity === monaco.MarkerSeverity.Hint) {
          continue
        }

        if (marker.owner !== "yaml") {
          continue
        }

        const wrapper = document.createElement("div")
        wrapper.setAttribute("role", "button")
        const codicon = document.createElement("div")
        const text = document.createElement("div")
        wrapper.classList.add("problem")
        codicon.classList.add(
          "codicon",
          marker.severity === monaco.MarkerSeverity.Warning
            ? "codicon-warning"
            : "codicon-error",
        )
        text.classList.add("problem-text")
        text.textContent = marker.message
        wrapper.append(codicon, text)
        wrapper.addEventListener("click", () => {
          editor!.setPosition({
            lineNumber: marker.startLineNumber,
            column: marker.startColumn,
          })
          editor!.focus()
        })
        problems.append(wrapper)
      }
    })

    return () => editor?.dispose()
  }, [monacoEl.current])

  return (
    <main>
      <div id="editor" className="h-[400px]" ref={monacoEl}></div>
      <div id="problems" className="problems" ref={problemsEl}></div>
    </main>
  )
}
