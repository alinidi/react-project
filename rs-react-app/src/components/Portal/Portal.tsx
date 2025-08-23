import { useLayoutEffect, useState, type ReactNode } from 'react';
import { createWrapper } from '../../helper/createWrapper';
import { createPortal } from 'react-dom';

type PortalType = {
  children: ReactNode;
  wrapperId: string;
};

export function Portal({ children, wrapperId = 'portal' }: PortalType) {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null
  );

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;

    if (!element) {
      systemCreated = true;
      element = createWrapper(wrapperId);
    }
    setWrapperElement(element);

    return () => {
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
}
