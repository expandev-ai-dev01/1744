import { useState } from 'react';
import { cn } from '@/core/utils';
import type { VehicleImageGalleryProps } from './types';

/**
 * @component VehicleImageGallery
 * @summary Image gallery component for vehicle photos
 * @domain vehicle
 * @type domain-component
 * @category display
 */
export const VehicleImageGallery = ({ images, vehicleName }: VehicleImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const sortedImages = [...images].sort((a, b) => {
    if (a.isPrimary) return -1;
    if (b.isPrimary) return 1;
    return a.order - b.order;
  });

  const selectedImage = sortedImages[selectedIndex];

  if (sortedImages.length === 0) {
    return (
      <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
        <svg
          className="h-24 w-24 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={selectedImage.url}
          alt={`${vehicleName} - Imagem ${selectedIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {sortedImages.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {sortedImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                'aspect-video rounded-md overflow-hidden border-2 transition-all',
                selectedIndex === index
                  ? 'border-blue-600 ring-2 ring-blue-200'
                  : 'border-gray-300 hover:border-gray-400'
              )}
            >
              <img
                src={image.url}
                alt={`${vehicleName} - Miniatura ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
