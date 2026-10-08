import { ChevronsLeft } from "lucide-react";
import { useEffect, useState, type RefObject } from "react";

export function SwipeHint({ scroller }: { scroller: RefObject<HTMLElement | null> }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const update = () => {
      const overflow = el.scrollWidth > el.clientWidth + 8;
      setShow(overflow && Math.abs(el.scrollLeft) < 16);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [scroller]);

  if (!show) return null;

  return (
    <span className="swipe-hint" aria-hidden="true">
      <ChevronsLeft size={18} strokeWidth={2.2} />
    </span>
  );
}
