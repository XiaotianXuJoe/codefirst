import { type ReactNode, createElement, forwardRef } from 'react'

/* ── framer-motion compatibility shim ──
 * Replaces framer-motion with no-op versions to avoid the large bundle
 * and runtime errors. All animation props are ignored.
 */

// Helper: filter out animation-related props
function filterProps(props: Record<string, unknown>): Record<string, unknown> {
  const {
    initial, animate, transition, variants,
    whileHover, whileTap, whileFocus, whileDrag,
    whileInView, viewport, onViewportEnter, onViewportLeave,
    layout, layoutId,
    exit,
    ...rest
  } = props
  return rest
}

// Create motion components that render as plain HTML elements
function createMotionComponent(tag: string) {
  const Component = forwardRef<HTMLElement, Record<string, unknown>>(
    (props, ref) => {
      return createElement(tag, { ...filterProps(props), ref })
    }
  )
  Component.displayName = `motion.${tag}`
  return Component
}

// motion object with common HTML elements
export const motion: Record<string, unknown> = new Proxy(
  {
    div: createMotionComponent('div'),
    p: createMotionComponent('p'),
    span: createMotionComponent('span'),
    h1: createMotionComponent('h1'),
    h2: createMotionComponent('h2'),
    h3: createMotionComponent('h3'),
    h4: createMotionComponent('h4'),
    article: createMotionComponent('article'),
    section: createMotionComponent('section'),
    header: createMotionComponent('header'),
    footer: createMotionComponent('footer'),
    nav: createMotionComponent('nav'),
    main: createMotionComponent('main'),
    aside: createMotionComponent('aside'),
    ul: createMotionComponent('ul'),
    li: createMotionComponent('li'),
    a: createMotionComponent('a'),
    button: createMotionComponent('button'),
    form: createMotionComponent('form'),
    input: createMotionComponent('input'),
    textarea: createMotionComponent('textarea'),
    img: createMotionComponent('img'),
    svg: createMotionComponent('svg'),
    path: createMotionComponent('path'),
    circle: createMotionComponent('circle'),
    rect: createMotionComponent('rect'),
    line: createMotionComponent('line'),
    polyline: createMotionComponent('polyline'),
    polygon: createMotionComponent('polygon'),
    g: createMotionComponent('g'),
    defs: createMotionComponent('defs'),
    clipPath: createMotionComponent('clipPath'),
    mask: createMotionComponent('mask'),
    pattern: createMotionComponent('pattern'),
    linearGradient: createMotionComponent('linearGradient'),
    radialGradient: createMotionComponent('radialGradient'),
    stop: createMotionComponent('stop'),
    use: createMotionComponent('use'),
    symbol: createMotionComponent('symbol'),
    text: createMotionComponent('text'),
    tspan: createMotionComponent('tspan'),
    style: createMotionComponent('style'),
  },
  {
    get(target, prop: string) {
      if (prop in target) return target[prop as keyof typeof target]
      // For any unknown tag, create a motion component on the fly
      return createMotionComponent(prop)
    },
  }
)

// No-op hooks
export function useInView(
  _ref?: unknown,
  _options?: { once?: boolean; margin?: string; amount?: string | number }
): boolean {
  return true // Always in view (skip animations)
}

export function useMotionValue<T>(init: T) {
  const get = () => init
  const set = (v: T) => { init = v }
  return { get, set, on: () => () => {} }
}

export function useTransform<T>(
  _input: unknown,
  _inputRangeOrTransformer: unknown,
  _outputRange?: T[]
): { get: () => T } {
  return { get: () => (Array.isArray(_outputRange) ? _outputRange[0] : 0 as unknown as T) }
}

export function useScroll() {
  return { scrollY: { get: () => 0 } }
}

export function useSpring() {
  return { get: () => 0 }
}

export function animate(
  _from: number | unknown,
  _to: number | unknown,
  _options?: unknown
) {
  return { stop: () => {} }
}

// No-op components
export function AnimatePresence({ children }: { children?: ReactNode }) {
  return children
}

export function LazyMotion({ children }: { children?: ReactNode }) {
  return children
}

export function domAnimation() {
  return {}
}

export function m() {
  return null
}
