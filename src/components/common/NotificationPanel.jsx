/* eslint-disable no-unused-vars */
import { Bell } from "lucide-react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function NotificationPanel({
    notifications = [],
    hasUnread = false,
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative hover:bg-white/20"
                >
                    <Bell className="w-5 h-5 text-gray-200" />

                    {hasUnread && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent
                align="end"
                className="w-80 p-0 bg-gray-900 border border-gray-800 text-gray-100"
            >
                {/* Header */}
                <div className="px-4 py-3">
                    <p className="text-sm font-semibold">Notifications</p>
                    <p className="text-xs text-gray-400">
                        Updates about your care
                    </p>
                </div>

                <Separator className="bg-gray-800" />

                {/* Body */}
                <ScrollArea className="h-64">
                    {notifications.length === 0 ? (
                        <div className="px-4 py-6 text-sm text-gray-400 text-center">
                            No notifications yet
                        </div>
                    ) : (
                        notifications.map((n) => (
                            <NotificationItem
                                key={n.id}
                                title={n.title}
                                message={n.message}
                            />
                        ))
                    )}
                </ScrollArea>

                <Separator className="bg-gray-800" />

                {/* Footer */}
                <div className="px-4 py-2 text-center">
                    <span className="text-xs text-gray-500">
                        You’re all caught up
                    </span>
                </div>
            </PopoverContent>
        </Popover>
    );
}

/* ---------- Row ---------- */

const NotificationItem = ({ title, message }) => (
    <div className="px-4 py-3 hover:bg-gray-800/60 transition cursor-pointer">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-gray-400 mt-1">{message}</p>
    </div>
);
