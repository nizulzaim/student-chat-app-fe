import each from 'lodash/each'

export const useHelper = () => {
  const hasClass = (el: Element, className: string): boolean => {
    if (!el.tagName)
      return false

    if (el.classList)
      return el.classList.contains(className)

    else
      return !!el.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`))
  }

  const addClass = (el: Element | null, className: string): void => {
    if (!el)
      return
    if (el.classList)
      el.classList.add(className)

    else if (!hasClass(el, className))
      el.className += ` ${className}`
  }

  const removeClass = (el: Element | null, className: string): void => {
    if (!el)
      return
    if (el.classList) {
      el.classList.remove(className)
    }
    else if (hasClass(el, className)) {
      const reg = new RegExp(`(\\s|^)${className}(\\s|$)`)
      el.className = el.className.replace(reg, ' ')
    }
  }

  const toggleClass = (el: Element | null, className: string): void => {
    if (!el)
      return
    if (hasClass(el, className))
      removeClass(el, className)

    else
      addClass(el, className)
  }

  const findAncestor = (el: Element | null, cls: string): Element | null => {
    if (!el)
      return null
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el
  }

  const children = (el: Element | null, cls: string): Element | null => {
    let child: Element | null = null
    if (el) {
      each(el.childNodes, (node: ChildNode) => {
        const pNode = node as Element
        if (!pNode.classList)
          return
        if (!child && hasClass(pNode, cls))
          child = pNode
      })
    }
    return child
  }

  const makeId = (length: number): string => {
    let result = ''
    const characters
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++)
      result += characters.charAt(Math.floor(Math.random() * charactersLength))

    return result
  }

  return {
    addClass,
    hasClass,
    removeClass,
    toggleClass,
    findAncestor,
    children,
    makeId
  }
}







// export function getParentFromClass(t: VNode, cls: string): VNode | undefined {
//   if (!t.) {
//     return undefined;
//   }
//   if (hasClass(t.$parent.$el, cls)) {
//     return t.$parent;
//   }
//   return getParentFromClass(t.$parent, cls);
// }

// export function one(el: Element, type: string, fn: Function) {
//   function handler(event: Event) {
//     el.removeEventListener(type, handler);
//     fn(event);
//   }
//   el.addEventListener(type, handler);
// }

