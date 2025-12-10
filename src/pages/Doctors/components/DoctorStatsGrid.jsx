import { Users, Calendar, Star, Activity } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";

export const DoctorStatsGrid = ({ stats }) => {
    return (
        <div className="grid md:grid-cols-4 gap-6">
            <StatCard
                icon={Users}
                label="Today's Patients"
                value={stats.todayPatients}
                color="teal"
            />
            <StatCard
                icon={Calendar}
                label="This Week"
                value={stats.weeklyPatients}
                trend={stats.weeklyTrend}
                color="cyan"
            />
            <StatCard
                icon={Star}
                label="Average Rating"
                value={stats.rating}
                color="blue"
            />
            <StatCard
                icon={Activity}
                label="Active Cases"
                value={stats.activeCases}
                color="green"
            />
        </div>
    );
};
