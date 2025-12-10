import { Button } from "@/components/ui/button";

export const DoctorScheduleCard = ({
    time,
    period,
    patientName,
    consultationType,
    sessionType,
    status,
    onAction,
}) => {
    const bgClass =
        status === "active"
            ? "bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800"
            : "bg-gray-50 dark:bg-gray-800/50";

    const timeClass =
        status === "active"
            ? "text-teal-600 dark:text-teal-400"
            : "text-gray-600 dark:text-gray-400";

    const buttonClass =
        status === "active" ? "bg-teal-600 hover:bg-teal-700" : "";

    return (
        <div className={`flex gap-4 p-4 rounded-lg border ${bgClass}`}>
            <div className="text-center">
                <div className={`text-xl font-bold ${timeClass}`}>{time}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                    {period}
                </div>
            </div>
            <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    {patientName}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {consultationType}
                </p>
                <p className={`text-sm mt-1 ${timeClass}`}>{sessionType}</p>
            </div>
            <Button
                size="sm"
                variant={status === "active" ? "default" : "outline"}
                className={buttonClass}
                onClick={onAction}
            >
                {status === "active" ? "Start" : "View"}
            </Button>
        </div>
    );
};
