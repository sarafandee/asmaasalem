import clsx from 'clsx';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}

export function Container({ children, className, narrow }: ContainerProps) {
  return (
    <div
      className={clsx(
        'mx-auto w-full px-4 sm:px-6 md:px-8',
        narrow ? 'max-w-[720px]' : 'max-w-[1200px]',
        className
      )}
    >
      {children}
    </div>
  );
}
