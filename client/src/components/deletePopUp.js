import { X, Trash2 } from 'lucide-react';
import Button from "./button";
const DeletePopup = ({
    itemName = "this item",
    onConfirm,
    onCancel,
    isLoading = false
}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-full">
                            <Trash2 className="text-red-600 w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-semibold">Delete Confirmation</h3>
                    </div>
                    <button
                        onClick={onCancel}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete <span className="font-medium">{itemName}</span>?
                    This action cannot be undone.
                </p>

                <div className="flex justify-end gap-3">
                    <Button
                        variant="outline"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        isLoading={isLoading}
                        icon={<Trash2 className="w-4 h-4" />}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DeletePopup;