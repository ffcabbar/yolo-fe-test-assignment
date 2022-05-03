import { useLottie } from 'lottie-react';
import loaderLottie from './loader.json';

const style = {
  height: 250
};

export const Loader = () => {
  const options = {
    animationData: loaderLottie,
    loop: true,
    autoplay: true
  };

  const { View } = useLottie(options, style);

  return View;
};
