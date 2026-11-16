import { useEffect, useState, useCallback } from "react";
import api, { errorMessage } from "../api";

export default function useResource(url) {
  const [state, setState] = useState({ data: null, loading: true, error: "" });
  const [version, setVersion] = useState(0);
  const reload = useCallback(() => setVersion((value) => value + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, loading: true, error: "" });
    api.get(url, { signal: controller.signal }).then(({ data }) => {
      setState({ data, loading: false, error: "" });
    }).catch((error) => {
      if (!controller.signal.aborted) setState({ data: null, loading: false, error: errorMessage(error) });
    });
    return () => controller.abort();
  }, [url, version]);

  return { ...state, reload };
}
