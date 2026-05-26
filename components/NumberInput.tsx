type NumberInputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
};

export function NumberInput({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 0.01,
}: NumberInputProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700">{label}</span>

      <div className="mt-1 flex rounded-lg border bg-white">
        {prefix ? (
          <span className="flex items-center px-3 text-sm text-gray-500">
            {prefix}
          </span>
        ) : null}

        <input
          type="number"
          min="0"
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full rounded-lg px-3 py-2 text-gray-950 outline-none"
        />

        {suffix ? (
          <span className="flex items-center px-3 text-sm text-gray-500">
            {suffix}
          </span>
        ) : null}
      </div>
    </label>
  );
}