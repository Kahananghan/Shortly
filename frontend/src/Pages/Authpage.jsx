import Leftauth from '../Components/Leftauth';
import Rightauth from '../Components/Rightauth';

const Authpage = () => {
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex rounded-2xl shadow-2xl overflow-hidden">
        <Leftauth />
        <Rightauth />
      </div>
    </div>
  )
}

export default Authpage