interface SummaryListItem {
    label: string
    value: string
}

interface SummaryListCardProps {
    title: string
    items: SummaryListItem[]
    tone?: "base" | "gold"
    emptyText?: string
    maxItems?: number
}

export function SummaryListCard({
    title,
    items,
    tone = "base",
    emptyText = "Sin datos",
    maxItems = 4,
}: SummaryListCardProps) {
    const toneMap = {
        base: {
            card: "bg-[#EAEFE0] border border-[#d7dfc7]",
            title: "text-[#556B2F]",
            value: "text-[#5B732E]",
            itemText: "text-[#33361D]",
        },
        gold: {
            card: "bg-[#fdf5e4] border border-[#F1E3B7]",
            title: "text-[#8A6A19]",
            value: "text-[#C19A3D]",
            itemText: "text-[#4B3B12]",
        },
    } as const

    const current = toneMap[tone]
    const visibleItems = items.slice(0, maxItems)

    return (
        <div className={`min-w-[150px] rounded-2xl px-5 py-4 ${current.card}`}>
            <div className={`text-[11px] font-semibold uppercase tracking-[0.08em] ${current.title}`}>
                {title}
            </div>

            {visibleItems.length > 0 ? (
                <div className="mt-3 space-y-2">
                    {visibleItems.map((item, index) => (
                        <div
                            key={`${item.label}-${index}`}
                            className="flex items-start justify-between gap-3"
                        >
                            <span className={`min-w-0 text-sm font-medium ${current.itemText} truncate`}>
                                {item.label}
                            </span>
                            <span className={`shrink-0 text-sm font-bold ${current.value} tabular-nums`}>
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={`mt-2 text-sm font-medium ${current.value}`}>
                    {emptyText}
                </div>
            )}
        </div>
    )
}