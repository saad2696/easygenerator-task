// src/components/Loading.js
import logo from '/assets/logo.png';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2E3B4E]">
      <div className="relative flex items-center justify-center w-20 h-20">
        <img src={logo} alt="Loading..." className="absolute w-12 h-12" />
        <div className="w-20 h-20 rounded-full animate-spin border-4 border-solid border-[#FF5522] border-t-transparent"></div>
      </div>
    </div>
  );
};

export default Loading;
