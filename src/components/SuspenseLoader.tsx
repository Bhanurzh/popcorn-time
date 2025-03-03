const SuspenseLoader = () => {
  return (
    <div
      role="status"
      aria-busy="true"
      className="flex justify-center items-center h-screen"
    >
      <div className="flex flex-col items-center gap-2">
        <p className="text-white text-2xl font-semibold">Please Wait</p>
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default SuspenseLoader;
