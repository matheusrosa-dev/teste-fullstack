function RootTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="py-7 shadow-md mb-10 bg-white">
        <h1 className="text-center text-3xl font-bold">Books Review</h1>
      </header>

      {children}
    </>
  );
}

export default RootTemplate;
