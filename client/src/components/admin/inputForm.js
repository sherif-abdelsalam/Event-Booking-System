import React, { useState, useEffect } from 'react';
import { Input, InputLabel } from "../../components/admin/input";
import { useNavigate } from "react-router-dom";
import Image from "../../components/image";
import { Trash, Upload } from 'lucide-react';

export const Arrow = () => {
    return <svg className={"absolute right-[12px] top-[12px]"} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 16.8C11.3 16.8 10.6 16.53 10.07 16L3.55002 9.48001C3.26002 9.19001 3.26002 8.71001 3.55002 8.42001C3.84002 8.13001 4.32002 8.13001 4.61002 8.42001L11.13 14.94C11.61 15.42 12.39 15.42 12.87 14.94L19.39 8.42001C19.68 8.13001 20.16 8.13001 20.45 8.42001C20.74 8.71001 20.74 9.19001 20.45 9.48001L13.93 16C13.4 16.53 12.7 16.8 12 16.8Z" fill="#292D32" />
    </svg>
}

// Event categories options
const EventInputForm = ({ handleSubmit, formData, setFormData, eventCategories }) => {
    const navigate = useNavigate();
    const [valid, setValid] = useState(false);
    // Validate form
    useEffect(() => {
        const isValid =
            formData.name &&
            formData.category &&
            formData.description &&
            formData.date &&
            formData.venue &&
            formData.price !== '' &&
            formData.capacity !== '' &&
            formData.preview;
        setValid(isValid);
    }, [formData]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type.startsWith("image/")) {
            setFormData({
                ...formData,
                image: selectedFile,
                preview: URL.createObjectURL(selectedFile)
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validatePrice = () => {
        return !isNaN(formData.price) && parseFloat(formData.price) >= 0;
    };

    const validateCapacity = () => {
        return !isNaN(formData.capacity) && parseInt(formData.capacity) > 0;
    };

    return (
        <div className={"flex flex-col py-[56px]"}>
            <div className={"w-[220px] flex flex-row gap-[8px]"}>
                {formData.preview ? (
                    <div className="bg-[#f5f5f5] border-[1px] border-[#dbdbdb] relative w-[172px] h-[132px] overflow-hidden rounded-[4px]">
                        <Image
                            Class={'object-cover w-[172px] h-[132px]'}
                            src={formData.preview}
                            alt={`Event preview`}
                        />
                        <button
                            className='border-none bg-none absolute top-2 right-2'
                            onClick={() => {
                                setFormData({ ...formData, preview: null, image: null });
                            }}
                        >
                            <div className='text-red-600 bg-white border border-red-600 p-2 rounded-full '>
                                <Trash />
                            </div>
                        </button>
                    </div>
                ) : (
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            id="upload-image"
                        />
                        <label
                            htmlFor="upload-image"
                            className="bg-[#f5f5f5] border-[1px] border-[#dbdbdb] cursor-pointer rounded-[4px] flex justify-center items-center w-[172px] h-[132px]"
                        >
                            <Upload />
                        </label>
                    </div>
                )}
                <span className="text-red-500 text-3xl mt-[-20px]">*</span>
            </div>

            <form
                className="flex flex-row justify-between items-stretch box-border pt-[24px] pr-[24px] gap-5 rounded-lg"
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!valid) return;
                    handleSubmit(formData);
                }}
            >
                <div className="flex-1">
                    <div className="mb-4 relative">
                        <InputLabel>Event Name</InputLabel>
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Summer Music Festival"
                            required
                        />

                    </div>

                    <div className="mb-4 relative">
                        <InputLabel>Category</InputLabel>
                        <div className={"relative"}>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="appearance-none w-full h-12 px-3 py-2 text-lg text-text-medium border border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                            >
                                <option value="">Select Category</option>
                                {eventCategories.map(opt => (
                                    <option key={opt.name} value={opt._id}>{opt.name}</option>
                                ))}
                            </select>
                            <Arrow />
                        </div>
                    </div>

                    <div className="mb-4 relative">
                        <InputLabel>Date</InputLabel>
                        <Input
                            type="datetime-local"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4 relative">
                        <InputLabel>Venue</InputLabel>
                        <Input
                            type="text"
                            name="venue"
                            value={formData.venue}
                            onChange={handleChange}
                            placeholder="e.g. City Convention Center"
                            required
                        />
                    </div>

                    <div className="mb-4 relative">
                        <InputLabel>Price ($)</InputLabel>
                        <Input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            required
                        />
                        {!validatePrice() && formData.price !== '' && (
                            <p className="absolute top-20 text-red-500 text-[12px] mt-1">
                                Price must be a positive number
                            </p>
                        )}
                    </div>

                    <div className="mb-4 relative">
                        <InputLabel>Capacity</InputLabel>
                        <Input
                            type="number"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            placeholder="100"
                            min="1"
                            required
                        />
                        {!validateCapacity() && formData.capacity !== '' && (
                            <p className="absolute top-20 text-red-500 text-[12px] mt-1">
                                Capacity must be at least 1
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex-1 h-full">
                    <div className="mb-9 relative">
                        <InputLabel>Description</InputLabel>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={18}
                            maxLength={1000}
                            required
                            className="w-full h-full resize-none bg-transparent border bg-white border-gray-200 rounded-lg p-3 text-lg text-text-medium font-Inter focus:border-primary focus:outline-none"
                            placeholder="Describe the event in detail..."
                        ></textarea>
                        <div className="absolute bottom-5 right-5 text-text-medium text-[16px]">
                            {1000 - (formData?.description?.length || 0)}
                        </div>
                        {formData?.description?.length < 10 && formData?.description && (
                            <p className="absolute bottom-[-10px] text-red-500 text-[12px] mt-1">
                                Description must be at least 10 characters.
                            </p>
                        )}
                    </div>

                    <div className="flex justify-between gap-3 mt-4">
                        <button
                            type="button"
                            className="flex-1 bg-purple-50 text-primary border border-gray-200 rounded-lg font-semibold py-3 px-2 transition duration-300"
                            onClick={() => {
                                navigate("/events", { replace: true });
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`flex-1 ${valid ? "bg-[#6609F8]" : "bg-[#888888]"} text-white rounded-lg font-semibold py-3 px-2 transition duration-300 `}
                            disabled={!valid}
                        >
                            Add Event
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EventInputForm;