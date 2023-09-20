import { useEffect, useRef } from "react";
export function useCloseForm(closeModal) {
  const ref = useRef();
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        console.log("close");
        closeModal();
      }
    }
    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, [closeModal]);

  return { ref };
}
