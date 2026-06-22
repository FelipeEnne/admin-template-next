interface ContentProps {
  children?: React.ReactNode;
}

export default function Content({ children }: ContentProps) {
  return (
    <div className={`flex flex-col mt-7`}>
      {children}
      <h3>Content</h3>
    </div>
  );
}
