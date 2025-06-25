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
      className={`flex w-full cursor-pointer items-center gap-4.5 rounded-[64px] border border-white/10 px-6 py-3 ${white ? 'bg-white text-black' : 'bg-[#202020] text-white'}`}
    >
      <span>{icon}</span>
      <span className="font-light">{title}</span>
    </button>
  )
}
