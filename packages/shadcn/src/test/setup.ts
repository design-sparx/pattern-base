import "@testing-library/jest-dom/vitest";

if (typeof globalThis.PointerEvent === "undefined") {
  globalThis.PointerEvent = MouseEvent as unknown as typeof PointerEvent;
}

if (
  typeof globalThis.HTMLElement !== "undefined" &&
  !HTMLElement.prototype.hasPointerCapture
) {
  HTMLElement.prototype.hasPointerCapture = function hasPointerCapture() {
    return false;
  } as typeof HTMLElement.prototype.hasPointerCapture;
  HTMLElement.prototype.setPointerCapture =
    function setPointerCapture() {} as typeof HTMLElement.prototype.setPointerCapture;
  HTMLElement.prototype.releasePointerCapture =
    function releasePointerCapture() {} as typeof HTMLElement.prototype.releasePointerCapture;
}

if (
  typeof globalThis.HTMLElement !== "undefined" &&
  !HTMLElement.prototype.scrollIntoView
) {
  HTMLElement.prototype.scrollIntoView = function scrollIntoView() {};
}

if (typeof globalThis.ResizeObserver === "undefined") {
  class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  globalThis.ResizeObserver =
    ResizeObserverStub as unknown as typeof globalThis.ResizeObserver;
}

if (typeof globalThis.IntersectionObserver === "undefined") {
  class IntersectionObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
    root = null;
    rootMargin = "";
    thresholds = [];
  }
  globalThis.IntersectionObserver =
    IntersectionObserverStub as unknown as typeof globalThis.IntersectionObserver;
}

if (typeof globalThis.matchMedia === "undefined") {
  globalThis.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  })) as typeof globalThis.matchMedia;
}
