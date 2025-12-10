import { Button } from "@/components/ui/button";
import { Edit2, Save, X, Star } from "lucide-react";

export const DoctorProfileHeader = ({
    profileData,
    isEditing,
    onEdit,
    onSave,
    onCancel,
}) => {
    return (
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {profileData.name
                        .split(" ")
                        .filter((n) => !n.startsWith("Dr."))
                        .map((n) => n[0])
                        .join("")}
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {profileData.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        {profileData.specialization}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            4.9 (127 reviews)
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex gap-2">
                {isEditing ? (
                    <>
                        <Button
                            onClick={onSave}
                            className="bg-teal-600 hover:bg-teal-700"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Save
                        </Button>
                        <Button variant="outline" onClick={onCancel}>
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                        </Button>
                    </>
                ) : (
                    <Button variant="outline" onClick={onEdit}>
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit Profile
                    </Button>
                )}
            </div>
        </div>
    );
};
