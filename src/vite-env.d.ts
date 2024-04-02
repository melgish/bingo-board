/// <reference types="svelte" />
/// <reference types="vite/client" />

// For some reason this module's types do not import
// so I hijaked them from node_modules
declare module "svelte-routing" {
  import { SvelteComponent } from "svelte"

  type LinkProps = {
    to: string
    replace?: boolean
    preserveScroll?: boolean
    state?: {
      [k in string | number]: unknown
    }
    getProps?: (linkParams: GetPropsParams) => Record<string, any>
  }

  type GetPropsParams = {
    location: RouteLocation
    href: string
    isPartiallyCurrent: boolean
    isCurrent: boolean
  }

  export class Link extends SvelteComponent<
    Omit<LinkProps & HTMLAnchorAttributes, "href">
  > {}

  type Viewtransition = {
    fn?: any
    delay?: number
    duration?: number
    x?: number
    y?: number
    opacity?: number
    easing?: any
    css?: (t: number) => string
  }

  type RouterProps = {
    basepath?: string
    url?: string
    viewtransition?: (direction?: string) => Viewtransition
  }

  export class Router extends SvelteComponent<RouterProps> {}

  type AsyncSvelteComponent = () => Promise<{
    default: typeof SvelteComponent<any>
  }>

  type RouteProps = {
    path?: string
    component?: typeof SvelteComponent<any> | AsyncSvelteComponent
    [additionalProp: string]: unknown
  }

  type RouteSlots = {
    default: {
      location: RouteLocation
      params: RouteParams
    }
  }

  type RouteLocation = {
    pathname: string
    search: string
    hash?: string
    state: {
      [k in string | number]: unknown
    }
  }

  type RouteParams = {
    [param: string]: string
  }

  export class Route extends SvelteComponent<
    RouteProps,
    Record<string, any>,
    RouteSlots
  > {}
}
