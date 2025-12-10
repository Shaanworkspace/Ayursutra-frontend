/* eslint-disable no-unused-vars */
import React from "react";
import { TrendingUp } from "lucide-react";

export const StatCard = ({
    icon: Icon,
    label,
    value,
    trend,
    color = "cyan",
}) => {
    const colorClasses = {
        cyan: "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400",
        teal: "bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400",
        blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
        green: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
                <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
                    <Icon className="w-6 h-6" />
                </div>
                {trend && (
                    <span className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {trend}
                    </span>
                )}
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {value}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
        </div>
    );
};
