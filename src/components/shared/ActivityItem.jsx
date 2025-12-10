/* eslint-disable no-unused-vars */
import { Clock } from "lucide-react";

export const ActivityItem = ({
    icon: Icon,
    title,
    description,
    time,
    color = "cyan",
}) => {
    const colorClasses = {
        cyan: "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400",
        teal: "bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400",
        blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    };

    return (
        <div className="flex gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
            <div className={`p-2 rounded-lg h-fit ${colorClasses[color]}`}>
                <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                    {title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {description}
                </p>
                {time && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {time}
                    </p>
                )}
            </div>
        </div>
    );
};
