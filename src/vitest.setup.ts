import { afterEach, vi } from "vitest";
import "@testing-library/jest-dom/vitest"
import { cleanup } from "@testing-library/svelte";

// auto cleanup dom after every test
afterEach(() => cleanup());

Object.assign(global, {
  // kludge because window.scrollTo isn't in js-dom
  scrollTo: vi.fn(),
})

