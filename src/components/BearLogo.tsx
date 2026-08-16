import { ImgHTMLAttributes } from 'react';

export function BearLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img referrerPolicy="no-referrer"       src="/logo.png"
      alt="Fahrschule Bär Logo"
      {...props}
    />
  );
}
