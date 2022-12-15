import { useEffect, useState } from "react";

const useScroll = () => {
  const [scroll_position, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const window_scroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    const scrolled = (window_scroll / height) * 100;

    setScrollPosition(scrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scroll_position;
};

export default useScroll;
