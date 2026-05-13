"use client";

import { Check, ChevronDown } from "lucide-react";
import {
  Children,
  isValidElement,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  ChangeEvent,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

const field =
  "min-h-11 w-full rounded-2xl border border-black/10 bg-white px-4 py-2.5 text-sm text-brand-ink outline-none transition placeholder:text-black/35 focus:border-brand focus:ring-4 focus:ring-brand/15";

type OptionProps = {
  value?: string | number;
  disabled?: boolean;
  children?: ReactNode;
};

type SelectOption = {
  value: string;
  label: string;
  disabled: boolean;
};

function valueToString(value: SelectHTMLAttributes<HTMLSelectElement>["value"] | SelectHTMLAttributes<HTMLSelectElement>["defaultValue"]) {
  if (value === undefined || value === null) return undefined;
  if (Array.isArray(value)) return String(value[0] ?? "");
  return String(value);
}

function nodeToText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return nodeToText(node.props.children);
  return "";
}

function collectOptions(children: ReactNode) {
  const options: SelectOption[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement<OptionProps>(child)) return;

    const label = nodeToText(child.props.children).trim();

    options.push({
      value: child.props.value === undefined ? label : String(child.props.value),
      label,
      disabled: Boolean(child.props.disabled),
    });
  });

  return options;
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(field, className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(field, "min-h-28 resize-y", className)} {...props} />;
}

export function Select({
  className,
  children,
  name,
  defaultValue,
  value,
  disabled,
  required,
  onChange,
  id,
  title,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
}: SelectHTMLAttributes<HTMLSelectElement>) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const rootRef = useRef<HTMLDivElement>(null);
  const options = useMemo(() => collectOptions(children), [children]);
  const fallbackValue = options.find((option) => !option.disabled)?.value ?? options[0]?.value ?? "";
  const controlledValue = valueToString(value);
  const defaultSelectedValue = valueToString(defaultValue) ?? fallbackValue;
  const [selectedValue, setSelectedValue] = useState(defaultSelectedValue);
  const [open, setOpen] = useState(false);
  const hasFixedWidth = typeof className === "string" && /\bw-(?!full\b)[^\s]+/.test(className);

  useEffect(() => {
    if (controlledValue !== undefined) setSelectedValue(controlledValue);
  }, [controlledValue]);

  useEffect(() => {
    if (controlledValue === undefined) setSelectedValue(defaultSelectedValue);
  }, [controlledValue, defaultSelectedValue]);

  useEffect(() => {
    const form = rootRef.current?.closest("form");
    if (!form || controlledValue !== undefined) return;

    function handleReset() {
      setSelectedValue(defaultSelectedValue);
      setOpen(false);
    }

    form.addEventListener("reset", handleReset);
    return () => form.removeEventListener("reset", handleReset);
  }, [controlledValue, defaultSelectedValue]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === selectedValue) ?? options[0];

  function chooseOption(option: SelectOption) {
    if (option.disabled) return;

    setSelectedValue(option.value);
    setOpen(false);

    onChange?.({
      target: { name, value: option.value },
      currentTarget: { name, value: option.value },
    } as ChangeEvent<HTMLSelectElement>);
  }

  return (
    <div ref={rootRef} className={cn("relative", hasFixedWidth ? "w-fit" : "w-full")}>
      <input type="hidden" name={name} value={selectedValue} disabled={disabled} />
      <button
        id={controlId}
        type="button"
        title={title}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-required={required}
        className={cn(
          field,
          "group flex items-center justify-between gap-3 text-left shadow-[0_14px_40px_rgba(147,112,219,0.10)] hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-[0_18px_52px_rgba(147,112,219,0.16)] disabled:cursor-not-allowed disabled:opacity-60",
          open && "border-brand ring-4 ring-brand/15",
          selectedOption?.disabled && "text-black/45",
          className,
        )}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="truncate">{selectedOption?.label || "Выберите"}</span>
        <span
          className={cn(
            "grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand transition",
            open && "rotate-180 bg-brand text-white",
          )}
          aria-hidden="true"
        >
          <ChevronDown size={16} strokeWidth={2.4} />
        </span>
      </button>

      {open ? (
        <div
          role="listbox"
          aria-labelledby={controlId}
          className="absolute left-0 top-[calc(100%+8px)] z-50 max-h-72 w-full min-w-[14rem] overflow-y-auto rounded-3xl border border-brand/15 bg-white p-1.5 shadow-[0_24px_70px_rgba(17,16,24,0.18)]"
        >
          {options.map((option) => {
            const selected = option.value === selectedValue;

            return (
              <button
                key={`${option.value}-${option.label}`}
                type="button"
                role="option"
                aria-selected={selected}
                disabled={option.disabled}
                className={cn(
                  "flex min-h-10 w-full items-center justify-between gap-3 rounded-2xl px-3 py-2 text-left text-sm font-semibold text-brand-ink transition hover:bg-brand-mist disabled:cursor-not-allowed disabled:text-black/35",
                  selected && "bg-brand text-white hover:bg-brand",
                )}
                onClick={() => chooseOption(option)}
              >
                <span className="truncate">{option.label}</span>
                {selected ? <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function Label({
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("space-y-2 text-sm font-semibold text-brand-ink", className)} {...props} />;
}
