interface ModalActionProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function ModalAction({ children, ...rest }: ModalActionProps) {
  return (
    <button className={rest.className}>
      {children}
    </button>
  )
}