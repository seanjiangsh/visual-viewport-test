// Source: https://martijnhols.nl/blog/how-to-get-document-height-ios-safari-osk

import {
  useCallback,
  useEffect,
  useState,
  useLayoutEffect,
  useRef,
} from "react";

const useBrowserLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : () => {};

export type Size = { width: number; height: number };

export const getViewportSize = (): Size => {
  let width = window.innerWidth;
  let height = window.innerHeight;

  if (window.visualViewport) {
    width = window.visualViewport.width;
    height = window.visualViewport.height;
  }

  width = Math.round(width);
  height = Math.round(height);

  return { width, height };
};

const fixScroll = () => scrollTo(0, 0);

/**
 * Returns the viewport size. This can also be used as a dependency in a
 * useEffect to trigger an update when the browser resizes.
 */
export const useViewportSize = () => {
  const [viewportSize, setViewportSize] = useState<Size>(getViewportSize());

  const updateViewportSize = useCallback(() => {
    const viewportSize = getViewportSize();

    setViewportSize((oldViewportSize) => {
      if (
        oldViewportSize &&
        oldViewportSize.width === viewportSize.width &&
        oldViewportSize.height === viewportSize.height
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

/**
 * Hook to detect if the virtual keyboard is opened on mobile devices.
 * Returns undefined if the visualViewport API is not available.
 */
export const useVirtualKeyboardOpened = (
  inputElem: HTMLInputElement | null
) => {
  const [isKeyboardOpened, setIsKeyboardOpened] = useState<boolean | undefined>(
    undefined
  );
  const initialViewportHeightRef = useRef<number | undefined>(
    visualViewport?.height
  );

  useEffect(() => {
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (
      !isMobile ||
      !visualViewport ||
      !inputElem ||
      initialViewportHeightRef.current === undefined
    ) {
      setIsKeyboardOpened(undefined);
      return;
    }

    const onBlur = () => {
      setIsKeyboardOpened(false);
    };

    const onResize = () => {
      const visualVpHeight = visualViewport?.height;
      const initVpHeight = initialViewportHeightRef.current;
      if (visualVpHeight === undefined || initVpHeight === undefined) return;

      const isActiveElement = document.activeElement === inputElem;
      const isViewportHeightSmaller = visualVpHeight < initVpHeight;
      const isKeyboardOpened = isActiveElement && isViewportHeightSmaller;

      setIsKeyboardOpened(isKeyboardOpened);
    };

    inputElem.addEventListener("blur", onBlur);
    visualViewport.addEventListener("resize", onResize);
    onResize();

    return () => {
      inputElem.removeEventListener("blur", onBlur);
      visualViewport?.removeEventListener("resize", onResize);
    };
  }, [inputElem]);

  return isKeyboardOpened;
};
