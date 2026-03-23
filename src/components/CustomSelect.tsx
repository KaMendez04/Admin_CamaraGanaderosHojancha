import * as React from "react"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

type Option = { value: string | number; label: string }
type Size = "sm" | "md"

type CustomSelectProps = {
  value: string | number
  onChange: (value: string | number) => void
  options: Option[]
  placeholder?: string
  disabled?: boolean
  zIndex?: number
  buttonClassName?: string
  optionsClassName?: string
  size?: Size
  searchable?: boolean
  searchPlaceholder?: string
  emptyText?: string
}

const STYLES = {
  sm: {
    trigger: "h-9 rounded-md px-3 text-xs",
    icon: "h-3.5 w-3.5",
    content: "rounded-md p-1",
    input: "h-8 text-xs",
    item: "min-h-8 rounded-md px-3 text-xs",
    check: "h-3.5 w-3.5",
  },
  md: {
    trigger: "h-11 rounded-md px-3.5 text-sm",
    icon: "h-4 w-4",
    content: "rounded-lg p-1.5",
    input: "h-9 text-sm",
    item: "min-h-10 rounded-md px-4 text-sm",
    check: "h-4 w-4",
  },
} as const

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Selecciona una opción",
  disabled = false,
  zIndex = 1000,
  buttonClassName = "",
  optionsClassName = "",
  size = "md",
  searchable = false,
  searchPlaceholder = "Buscar...",
  emptyText = "No se encontraron opciones.",
}: CustomSelectProps) {
  const s = STYLES[size]
  const [open, setOpen] = React.useState(false)

  const selected = options.find((opt) => opt.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full justify-between border-[#E6E1D6] bg-white font-normal text-left shadow-sm transition-all duration-200",
            "hover:border-[#5B732E] hover:bg-white",
            "focus-visible:ring-2 focus-visible:ring-[#5B732E]/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            s.trigger,
            buttonClassName
          )}
        >
          <span
            className={cn(
              "block flex-1 truncate text-left",
              !selected ? "text-gray-400" : "font-medium text-[#2E321B]"
            )}
          >
            {selected ? selected.label : placeholder}
          </span>

          <ChevronDown
            className={cn(
              "ml-2 shrink-0 text-[#708C3E] transition-transform duration-200",
              s.icon,
              open && "rotate-180"
            )}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        side="bottom"
        sideOffset={8}
        avoidCollisions={true}
        collisionPadding={12}
        className={cn(
          "w-[var(--radix-popover-trigger-width)] border border-[#E6E1D6] bg-white p-0 shadow-xl",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
          s.content,
          optionsClassName
        )}
        style={{ zIndex }}
      >
        <Command className="bg-transparent">
          {searchable && (
            <div className="px-1 pb-1">
              <CommandInput
                placeholder={searchPlaceholder}
                className={cn(
                  "border-[#E6E1D6] focus-visible:ring-[#5B732E]/20",
                  s.input
                )}
              />
            </div>
          )}

          <CommandList className="max-h-60 overflow-y-auto scrollbar-none">
            <CommandEmpty>{emptyText}</CommandEmpty>

            <CommandGroup className="p-0">
              {options.map((option) => {
                const isSelected = option.value === value

                return (
                  <CommandItem
                    key={option.value}
                    value={String(option.label)}
                    onSelect={() => {
                      onChange(option.value)
                      setOpen(false)
                    }}
                    className={cn(
                      "mx-1 cursor-pointer select-none text-[#2E321B]",
                      "aria-selected:bg-[#E6EDC8] aria-selected:text-[#2E321B]",
                      s.item
                    )}
                  >
                    <span
                      className={cn(
                        "flex-1 truncate",
                        isSelected
                          ? "font-semibold text-[#5B732E]"
                          : "font-normal"
                      )}
                    >
                      {option.label}
                    </span>

                    <Check
                      className={cn(
                        "ml-3 shrink-0 text-[#6F8C1F]",
                        s.check,
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}