import { Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';

export default function EventImageUpload({ image, onChange, onBlur, error }) {
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleChangeFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Update Formik state with File object
        onChange({
            target: {
                name: "image",
                value: file,
            },
        });

        // Generate preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveImage = (e) => {
        e.stopPropagation();
        onChange({
            target: {
                name: "image",
                value: null,
            },
        });

        setPreview(null);

        // Optional: reset actual file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleClickLabel = () => {
        // Manually open file dialog
        fileInputRef.current.click();
    };
    console.log("---------------------------------");
    console.log(image)

    return (
        <div className="mb-4">
            <div className="relative inline-block">
                <div
                    onClick={handleClickLabel}
                    className="w-96 h-96 border border-gray-300 rounded flex items-center justify-center cursor-pointer relative overflow-hidden group"
                >
                    <input
                        ref={fileInputRef}
                        id="event-image-upload"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleChangeFile}
                        onBlur={onBlur}
                        className="hidden"
                    />


                    {/* Show image preview or upload icon */}
                    {preview || image ? (
                        <>
                            <img
                                src={preview || image || URL.createObjectURL(image)}
                                alt="Preview"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </>
                    ) : (
                        <Upload size={40} className="text-gray-600" />
                    )}
                </div>

                {/* Only show remove button if image exists */}
                {(preview || image) && (
                    <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition z-10"
                    >
                        <X size={24} />
                    </button>
                )}
            </div>

            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    );
}