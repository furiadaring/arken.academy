type PaymentInputProps = {
  label: string
  name: string
  type: string
  placeholder: string
  error?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  defaultValue?: string
}

export const PaymentInput = ({
  label,
  name,
  type,
  placeholder,
  error,
  value,
  onChange,
  disabled,
  defaultValue,
}: PaymentInputProps) => {
  return (
    <div>
      <label className="flex flex-col gap-3">
        <span>{label}</span>
        <input
          className="rounded-[64px] border border-[#DEDEDE] bg-[#EEF1F41A] px-6 py-4"
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          defaultValue={defaultValue}
        />
      </label>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
