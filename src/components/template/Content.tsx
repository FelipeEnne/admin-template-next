interface ContentProps {
  children?: React.ReactNode;
}

export default function Content({ children }: ContentProps) {
  return (
    <div className={`flex flex-col mt-7 text-gray-700 dark:text-gray-200`}>
      {children}
      <h3>Content</h3>
    </div>
  );
}
