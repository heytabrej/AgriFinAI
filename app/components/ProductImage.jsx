import { useState } from 'react';
import Image from 'next/image';

const ProductImage = ({ src, alt }) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <div className="relative h-48 w-full">
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
        priority
        onError={() => setImgSrc('/fallback-product.svg')}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
      />
    </div>
  );
};

export default ProductImage;