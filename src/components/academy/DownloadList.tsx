"use client";

import { useState } from "react";
import { Download, ExternalLink, Loader2 } from "lucide-react";
import type { AcademyDownload } from "@/lib/academy-downloads";

interface SectionProps {
  section: string;
  items: AcademyDownload[];
}

const typeLabels: Record<AcademyDownload["type"], string> = {
  guide: "Download PDF",
  checklist: "Download PDF",
  template: "Download PDF",
  spreadsheet: "Download CSV",
  contract: "Download PDF",
};

export function DownloadList({ section, items }: SectionProps) {
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchFile = async (fileKey: string) => {
    const res = await fetch(
      `/api/academy/download?file=${encodeURIComponent(fileKey)}`,
      { credentials: "same-origin" }
    );

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(
        data.error ?? "Download failed. Please refresh and try again."
      );
    }

    return res.blob();
  };

  const handleDownload = async (fileKey: string) => {
    setLoadingKey(fileKey);
    setError(null);

    try {
      const blob = await fetchFile(fileKey);
      const filename = fileKey.split("/").pop() ?? "download";
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Download failed");
    } finally {
      setLoadingKey(null);
    }
  };

  const handleView = async (fileKey: string) => {
    if (!fileKey.endsWith(".pdf")) {
      handleDownload(fileKey);
      return;
    }

    setLoadingKey(`view-${fileKey}`);
    setError(null);

    try {
      const blob = await fetchFile(fileKey);
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank", "noopener,noreferrer");
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not open file");
    } finally {
      setLoadingKey(null);
    }
  };

  return (
    <>
      {error && (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}
      <ul className="divide-y divide-navy/10 rounded-xl border border-navy/10 bg-white">
        {items.map((item) => {
          const isLoading = loadingKey === item.fileKey;
          const isViewLoading = loadingKey === `view-${item.fileKey}`;
          const isPdf = item.fileKey.endsWith(".pdf");

          return (
            <li
              key={item.fileKey}
              className="flex items-center justify-between gap-4 px-5 py-4"
            >
              <span className="text-sm font-medium text-navy">{item.title}</span>
              <div className="flex shrink-0 items-center gap-2">
                {isPdf && (
                  <button
                    type="button"
                    onClick={() => handleView(item.fileKey)}
                    disabled={!!loadingKey}
                    className="flex items-center gap-1.5 rounded-full border border-navy/15 px-3 py-1.5 text-xs font-medium text-navy/70 transition-colors hover:bg-cream disabled:opacity-50"
                  >
                    {isViewLoading ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : (
                      <ExternalLink size={12} />
                    )}
                    View PDF
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleDownload(item.fileKey)}
                  disabled={!!loadingKey}
                  className="flex items-center gap-1.5 rounded-full bg-academy-blue/10 px-3 py-1.5 text-xs font-medium text-academy-blue transition-colors hover:bg-academy-blue/20 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <Download size={12} />
                  )}
                  {typeLabels[item.type]}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
