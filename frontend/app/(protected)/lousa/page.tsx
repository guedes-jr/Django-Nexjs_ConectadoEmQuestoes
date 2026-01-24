"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { createSketch, getSketch, updateSketch } from "@/lib/sketches";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  { ssr: false }
);

export default function WhiteboardPage() {
  const apiRef = useRef<any>(null);

  const [sketchId, setSketchId] = useState<number | null>(null);
  const [title, setTitle] = useState("Rascunho");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const saveTimer = useRef<NodeJS.Timeout | null>(null);
  const lastPayload = useRef<string>("");

  const initialData = useMemo(() => ({ elements: [], appState: {}, files: {} }), []);

  useEffect(() => {
    const url = new URL(window.location.href);
    const idStr = url.searchParams.get("id");
    if (!idStr) return;

    (async () => {
      try {
        const s = await getSketch(Number(idStr));
        setSketchId(s.id);
        setTitle(s.title || "Rascunho");

        setTimeout(() => {
          apiRef.current?.updateScene(s.data);
        }, 0);
      } catch {
        setStatus("error");
      }
    })();
  }, []);

  const queueSave = (data: any) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);

    saveTimer.current = setTimeout(async () => {
      const payloadStr = JSON.stringify({ title, data });
      if (payloadStr === lastPayload.current) return;
      lastPayload.current = payloadStr;

      try {
        setStatus("saving");

        if (!sketchId) {
          const created = await createSketch(title, data);
          setSketchId(created.id);

          const url = new URL(window.location.href);
          url.searchParams.set("id", String(created.id));
          window.history.replaceState({}, "", url.toString());
        } else {
          await updateSketch(sketchId, { title, data });
        }

        setStatus("saved");
        setTimeout(() => setStatus("idle"), 800);
      } catch {
        setStatus("error");
      }
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-56px)] bg-slate-50 dark:bg-slate-950">
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-10 w-full max-w-md rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-slate-900 dark:text-slate-100"
            placeholder="Título"
          />

          <div className="text-sm text-slate-600 dark:text-slate-300">
            {status === "saving" && "Salvando..."}
            {status === "saved" && "Salvo ✓"}
            {status === "error" && "Erro ao salvar"}
          </div>

          {sketchId ? (
            <div className="text-xs text-slate-500 dark:text-slate-400">ID: {sketchId}</div>
          ) : null}
        </div>
      </div>

      <div className="h-[78vh] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="h-full w-full">
          <Excalidraw
            initialData={initialData}
            excalidrawAPI={(api: any) => (apiRef.current = api)}
            onChange={(elements: any, appState: any, files: any) => {
              queueSave({ elements, appState, files });
            }}
          />
        </div>
      </div>
    </div>
  );
}