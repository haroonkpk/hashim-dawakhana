import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const LoadingCompo = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center overflow-hidden">
      <DotLottieReact
        className="w-40 h-40 mx-auto"
        src="https://lottie.host/0635bec6-1856-48b6-bd25-ded05f4b7832/4BsV7Zo5Sp.lottie"
        loop
        autoplay
      />
    </div>
  );
};
