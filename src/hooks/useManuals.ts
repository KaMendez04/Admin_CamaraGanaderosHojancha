import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { showErrorAlertEmpty } from "@/utils/alerts";
import type { ManualItem } from "@/types/manualsTypes";
import { downloadManualFile, getManuals } from "@/services/manualsService";


export function useManuals() {
  const [search, setSearch] = useState("");

  const manualsQuery = useQuery<ManualItem[]>({
    queryKey: ["manuals"],
    queryFn: getManuals,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const downloadMutation = useMutation({
    mutationFn: async (manual: ManualItem) => {
      await downloadManualFile(manual.path, manual.name);
      return manual;
    },
    onError: () => {
      void showErrorAlertEmpty("No se pudo descargar el manual");
    },
  });

  const manuals = manualsQuery.data ?? [];

  const filteredManuals = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return manuals;

    return manuals.filter((manual) =>
      manual.name.toLowerCase().includes(term)
    );
  }, [manuals, search]);

  const downloadManual = async (manual: ManualItem) => {
    await downloadMutation.mutateAsync(manual);
  };

  return {
    search,
    setSearch,
    manuals,
    filteredManuals,
    isLoading: manualsQuery.isLoading,
    isFetching: manualsQuery.isFetching,
    isError: manualsQuery.isError,
    error: manualsQuery.error,
    refetch: manualsQuery.refetch,
    isDownloading: downloadMutation.isPending,
    downloadManual,
  };
}