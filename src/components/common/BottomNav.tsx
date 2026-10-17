import { ReactNode } from "react";

export function BottomNav({
  items,
  activeKey,
  onChange,
}: {
  items: { key: string; label: string; icon: ReactNode }[];
  activeKey: string;
  onChange: (key: string) => void;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20">
      <div className="mx-3 mb-3 bg-white/95 backdrop-blur-md border border-slate-100 shadow-2xl rounded-2xl px-2 py-1 flex justify-around">
        {items.map((it) => {
          const active = it.key === activeKey;
          return (
            <button
              key={it.key}
              onClick={() => onChange(it.key)}
              className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition active:scale-95"
            >
              <div
                className={[
                  "p-2 rounded-xl transition",
                  active
                    ? "bg-orange-500 text-white shadow"
                    : "text-slate-400",
                ].join(" ")}
              >
                {it.icon}
              </div>
              <span
                className={[
                  "text-[11px]",
                  active ? "text-orange-600 font-medium" : "text-slate-500",
                ].join(" ")}
              >
                {it.label}
              </span>
            </button>
          );
        })}
      </div>
      <div className="h-2" />
    </div>
  );
}
