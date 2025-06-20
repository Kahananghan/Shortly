import { useSelector } from 'react-redux';
import RingLoader from "react-spinners/RingLoader"; 

const Loader = () => {
  const { isLoading, loadingMessage } = useSelector((state) => state.loading);
  
  if (!isLoading) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-75"
      aria-live="assertive"
      aria-busy={isLoading} 
    >
      <RingLoader
        color={"#2563EB"} 
        loading={true} 
        size={100} 
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      {loadingMessage && <p className="mt-4 text-lg text-gray-800">{loadingMessage}</p>}
    </div>
  );
};

export default Loader;