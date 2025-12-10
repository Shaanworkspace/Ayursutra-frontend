import { Users, Calendar, Star, Heart } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";

export const TherapistStatsGrid = ({ stats }) => {
    return (
        <div className="grid md:grid-cols-4 gap-6">
            <StatCard
                icon={Users}
                label="Today's Sessions"
                value={stats.todaySessions}
                color="blue"
            />
            <StatCard
                icon={Calendar}
                label="This Week"
                value={stats.weeklySessions}
                trend={stats.weeklyTrend}
                color="cyan"
            />
            <StatCard
                icon={Star}
                label="Client Rating"
                value={stats.rating}
                color="teal"
            />
            <StatCard
                icon={Heart}
                label="Active Clients"
                value={stats.activeClients}
                color="green"
            />
        </div>
    );
};
