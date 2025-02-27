interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ModalHeader({ children, ...rest }: ModalHeaderProps) {
  return (
    <div className={rest.className}>
      {children}
    </div>
  )
}