import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { useRoutes } from "react-router-dom"
import JsonEditor from "./components/json-editor"
import Samples from "./components/samples"
import { TailwindIndicator } from "./components/tailwind-indicator"
import { AppState, useStore } from "./store"
import "./userWorker"
import { YamlEditor } from "./components/yaml-editor"

const selector = (state: AppState) => ({
  schema: state.schema,
})

const ResponsiveContainer = ({ heading, children }: any) => {
  return (
    <div className="flex items-center justify-center [&>div]:w-full">
      <div className="bg-transparent">
        <div className="border bg-transparent px-4 py-5 sm:px-6">
          <h3 className="text-base font-semibold leading-6 ">{heading}</h3>
        </div>
        <div className="h-full">{children}</div>
      </div>
    </div>
  )
}

const routes = [{ path: "/", element: <Home /> }]

function Home() {
  const { schema } = useStore(selector)

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          YAML Monaco editor <br className="hidden sm:inline" />
          with JSON Schema validation.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          A simple YAML editor with JSON Schema validation that you can use in
          Vite + React applications.
        </p>
      </div>
      <div className="grid w-full gap-6">
        <Samples />
        <div className="border bg-transparent p-5 shadow">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="w-full lg:w-1/2">
              <ResponsiveContainer heading="JSON Schema">
                <div className="flex h-[400px] flex-col">
                  <JsonEditor
                    editorId="jsonSchemaEditorContainer"
                    jsonData={schema}
                  />
                </div>
              </ResponsiveContainer>
            </div>
            <div className="w-full lg:w-1/2">
              <ResponsiveContainer heading="YAML Editor">
                <div className="flex flex-col">
                  <YamlEditor />
                </div>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function App() {
  const children = useRoutes(routes)

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
      </div>
      <TailwindIndicator />
    </ThemeProvider>
  )
}

export default App
