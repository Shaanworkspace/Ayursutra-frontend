/* eslint-disable no-unused-vars */
export const ProfileField = ({
    icon: Icon,
    label,
    value,
    isEditing,
    onChange,
    name,
    type = "text",
}) => (
    <div className="flex items-start gap-4 py-4 border-b border-gray-100 dark:border-gray-800">
        <div className="p-2 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
            <Icon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
        </div>
        <div className="flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {label}
            </p>
            {isEditing ? (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 outline-none text-gray-900 dark:text-gray-100"
                />
            ) : (
                <p className="text-gray-900 dark:text-gray-100 font-medium">
                    {value || "Not provided"}
                </p>
            )}
        </div>
    </div>
);
