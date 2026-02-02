import { Clock } from "lucide-react";

export default function ColdStartNotice() {
    return (
        <div className="mt-4 flex items-center gap-2 text-md text-gray-500 dark:text-gray-400">
            <Clock className="w-5 h-6" />
            <span>
                Free-tier servers may take up to <strong>3 minutes</strong> to
                start. Thanks for your patience.
            </span>
        </div>
    );
}
