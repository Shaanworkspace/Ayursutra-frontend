import { Button } from "@/components/ui/button";

export const PatientAppointmentCard = ({
    date,
    month,
    doctorName,
    type,
    time,
    status,
    actionLabel,
    onAction,
}) => {
    const bgClass =
        status === "upcoming"
            ? "bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800"
            : "bg-gray-50 dark:bg-gray-800/50";

    const timeClass =
        status === "upcoming"
            ? "text-cyan-600 dark:text-cyan-400"
            : "text-gray-600 dark:text-gray-400";

    return (
        <div className={`flex gap-4 p-4 rounded-lg border ${bgClass}`}>
            <div className="text-center">
                <div
                    className={`text-2xl font-bold ${
                        status === "upcoming"
                            ? "text-cyan-600 dark:text-cyan-400"
                            : "text-gray-600 dark:text-gray-400"
                    }`}
                >
                    {date}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                    {month}
                </div>
            </div>
            <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    {doctorName}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {type}
                </p>
                <p className={`text-sm mt-1 ${timeClass}`}>{time}</p>
            </div>
            <Button size="sm" variant="outline" onClick={onAction}>
                {actionLabel}
            </Button>
        </div>
    );
};
