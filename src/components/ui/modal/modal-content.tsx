interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ModalContent({ children, ...rest }: ModalContentProps) {
  return (
    <div className={rest.className}>
      {children}
    </div>
  )
}