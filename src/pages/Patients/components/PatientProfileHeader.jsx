import React from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Save, X } from "lucide-react";

export const PatientProfileHeader = ({
    profileData,
    isEditing,
    onEdit,
    onSave,
    onCancel,
}) => {
    return (
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {profileData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {profileData.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Patient ID: PAT-2024-001
                    </p>
                </div>
            </div>
            <div className="flex gap-2">
                {isEditing ? (
                    <>
                        <Button
                            onClick={onSave}
                            className="bg-cyan-600 hover:bg-cyan-700"
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
