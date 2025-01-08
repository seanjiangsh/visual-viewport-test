// Source: https://martijnhols.nl/blog/how-to-get-document-height-ios-safari-osk

import { useCallback, useEffect, useState, useLayoutEffect } from "react";

const useBrowserLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : () => {};

type Width = number;
type Height = number;
type Size = [Width, Height];

export const getViewportSize = (): Size => {
  if (window.visualViewport) {
    const { width, height } = window.visualViewport;
    return [width, height] as const;
  }

  return [window.innerWidth, window.innerHeight] as const;
};

export const fixScroll = () => scrollTo(0, 0);

/**
 * Returns the viewport size. This can also be used as a dependency in a
 * useEffect to trigger an update when the browser resizes.
 */
const useViewportSize = () => {
  const [viewportSize, setViewportSize] = useState<Size>(getViewportSize());

  const updateViewportSize = useCallback(() => {
    const viewportSize = getViewportSize();

    setViewportSize((oldViewportSize) => {
      if (
        oldViewportSize &&
        oldViewportSize[0] === viewportSize[0] &&
        oldViewportSize[1] === viewportSize[1]
      ) {
        // Maintain old instance to prevent unnecessary updates
        return oldViewportSize;
      }

      return viewportSize;
    });

    // Fix the scroll position to the top of the page
    fixScroll();
  }, []);

  useBrowserLayoutEffect(updateViewportSize, [updateViewportSize]);

  useEffect(() => {
    const effectTwice = () => {
      updateViewportSize();
      // Closing the OSK in iOS does not immediately update the visual viewport
      // size :<
      setTimeout(updateViewportSize, 200);
    };

    window.addEventListener("resize", effectTwice);
    // From the top of my head this used to be required for older browsers since
    // this didn't trigger a resize event. Keeping it in to be safe.
    window.addEventListener("orientationchange", effectTwice);
    // This is needed on iOS to resize the viewport when the Virtual/OnScreen
    // Keyboard opens. This does not trigger any other event, or the standard
    // resize event.
    window.visualViewport?.addEventListener("resize", effectTwice);

    window.addEventListener("scroll", fixScroll);

    return () => {
      window.removeEventListener("resize", effectTwice);
      window.removeEventListener("orientationchange", effectTwice);
      window.visualViewport?.removeEventListener("resize", effectTwice);
      window.removeEventListener("scroll", fixScroll);
    };
  }, [updateViewportSize]);

  return viewportSize;
};

export default useViewportSize;
