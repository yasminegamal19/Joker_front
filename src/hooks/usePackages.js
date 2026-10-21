import { useEffect, useMemo, useState } from "react";
import { getPackages } from "../services/packageService";
import { mapPackage } from "../utils/packages";

export const usePackages = () => {
  const [raw, setRaw] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);

    getPackages(controller.signal)
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.packages;
        setRaw(Array.isArray(list) ? list.map(mapPackage) : []);
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [attempt]);

  const packages = useMemo(
    () => [...raw].sort((a, b) => a.priceValue - b.priceValue),
    [raw],
  );

  return { packages, loading, error, retry: () => setAttempt((n) => n + 1) };
};
