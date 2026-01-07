import { DotStream } from 'ldrs/react';
import 'ldrs/react/DotStream.css';

export const Spinner = ({ size = '120', speed = '2.5', color = 'black' }) => {
  return <DotStream size={size} speed={speed} color={color} />;
};
