import { cn } from '@/lib/utils';
import type { Experimental_GeneratedImage } from 'ai';
import Image from 'next/image';

export type ImageProps = Experimental_GeneratedImage & {
  className?: string;
  alt?: string;
};

export const ImageType = ({
  base64,
  mediaType,
  ...props
}: ImageProps) => (
  <Image
    width={500}
    height={500}
    {...props}
    alt={props.alt || 'Generated image'}
    className={cn(
      'h-auto max-w-full overflow-hidden rounded-md',
      props.className
    )}
    src={`data:${mediaType};base64,${base64}`}
  />
);
