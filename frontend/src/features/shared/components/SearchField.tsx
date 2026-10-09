import { Search, X } from "lucide-react";
import type { ReactNode } from "react";
import { Input } from "@/features/shared/components/ui/Input";

interface SearchFieldProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export const SearchField = ({
  label,
  value,
  placeholder,
  onChange,
}: SearchFieldProps): ReactNode => (
  <div className="relative mx-auto w-full max-w-md">
    <Search
      size={19}
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-ink-500"
    />
    <Input
      label={label}
      type="search"
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className="pr-12 pl-12"
    />
    {value.length > 0 ? (
      <button
        type="button"
        onClick={() => onChange("")}
        aria-label="Clear search"
        className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full p-1 text-ink-500 hover:bg-parchment-200 hover:text-ink-900"
      >
        <X size={17} />
      </button>
    ) : null}
  </div>
);
