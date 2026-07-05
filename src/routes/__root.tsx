import { Outlet, createRootRoute } from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center bg-background text-foreground px-6 text-center">
      <div>
        <h1 className="font-display font-black text-6xl md:text-8xl leading-[0.95]">404</h1>
        <p className="mt-4 text-muted-foreground text-sm">Page not found</p>
      </div>
    </div>
  ),
})

function RootComponent() {
  return (
    <>
      <Outlet />
    </>
  )
}
