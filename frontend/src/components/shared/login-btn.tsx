export const LoginBtn = ({
  title,
  icon,
  white,
  onClick,
}: {
  title: string
  icon: React.ReactNode
  white?: boolean
  onClick?: () => void
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`flex w-full cursor-pointer items-center gap-4.5 rounded-[64px] border px-6 py-3 ${white ? 'border-text/15 bg-background/10 text-black' : 'bg-[#202020] text-white'}`}
    >
      <span>{icon}</span>
      <span className="font-light">{title}</span>
    </button>
  )
}
