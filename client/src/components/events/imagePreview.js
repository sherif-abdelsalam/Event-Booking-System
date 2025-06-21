import Image from "../image";

export default function ImagePreview({ imageUrl, name }) {
  return (
    <div className="flex-1">
      <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-video">
        {imageUrl ? (
          <Image src={imageUrl} alt={name} Class="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <span className="text-gray-400 dark:text-gray-500">
              No image available
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
