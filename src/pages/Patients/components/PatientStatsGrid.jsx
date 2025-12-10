import { Calendar, Activity, FileText, Star } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";

export const PatientStatsGrid = ({ stats }) => {
    return (
        <div className="grid md:grid-cols-4 gap-6">
            <StatCard
                icon={Calendar}
                label="Upcoming Sessions"
                value={stats.upcomingSessions}
                color="cyan"
            />
            <StatCard
                icon={Activity}
                label="Completed Sessions"
                value={stats.completedSessions}
                trend={stats.sessionsTrend}
                color="teal"
            />
            <StatCard
                icon={FileText}
                label="Health Reports"
                value={stats.healthReports}
                color="blue"
            />
            <StatCard
                icon={Star}
                label="Wellness Score"
                value={stats.wellnessScore}
                trend={stats.wellnessTrend}
                color="green"
            />
        </div>
    );
};
