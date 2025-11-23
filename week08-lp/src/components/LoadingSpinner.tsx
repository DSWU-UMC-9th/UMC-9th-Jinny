const LoadingSpinner = () => {
  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 size-12 animate-spin rounded-full border-5 border-t-transparent border-gray-400"
      role="status"
    >
      <span className="sr-only">로딩중</span>
    </div>
  );
};

export default LoadingSpinner;
