import { Button } from "@/components/ui/button";

export const TherapistScheduleCard = ({
    time,
    period,
    clientName,
    sessionType,
    sessionMode,
    status,
    onAction,
}) => {
    const bgClass =
        status === "active"
            ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
            : "bg-gray-50 dark:bg-gray-800/50 border-transparent";

    const timeClass =
        status === "active"
            ? "text-blue-600 dark:text-blue-400"
            : "text-gray-600 dark:text-gray-400";

    const buttonClass =
        status === "active" ? "bg-blue-600 hover:bg-blue-700" : "";

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
                    {clientName}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {sessionType}
                </p>
                <p className={`text-sm mt-1 ${timeClass}`}>{sessionMode}</p>
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
