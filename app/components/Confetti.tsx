import { useWindowSize } from '@react-hook/window-size';
import dynamic from 'next/dynamic';
const FallingConfetti = dynamic(() => import('react-confetti'), { ssr: false });

interface ConfettiProps {
  run: boolean;
}

export default function Confetti({ run }: ConfettiProps) {
  const [width, height] = useWindowSize();
  return <FallingConfetti width={width} height={height} run={run} recycle={false} gravity={0.25} />;
}
