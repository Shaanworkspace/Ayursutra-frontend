/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    Brain,
    User,
    Calendar,
    Save,
    AlertCircle,
    Sparkles,
    Clock,
    FileText,
} from "lucide-react";
import TherapistNavbar from "../components/TherapistNavbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function TherapistSessionNotes() {
    const { id } = useParams();
    const profile = useSelector((state) => state.profile.data);

    const record = profile?.medicalRecords?.find(
        (r) => r.medicalRecordId === id,
    );

    const [notes, setNotes] = useState(record?.therapistNotes || "");
    const [lastSaved, setLastSaved] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const originalNotes = record?.therapistNotes || "";
    const isDirty = notes !== originalNotes;

    // Auto-save timer
    useEffect(() => {
        if (isDirty) {
            const timer = setTimeout(() => {
                // Auto-save logic could go here
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [notes, isDirty]);

    if (!record) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                <div className="text-center space-y-4 animate-in fade-in duration-700">
                    <div className="w-16 h-16 mx-auto bg-slate-800/50 rounded-2xl flex items-center justify-center">
                        <FileText className="w-8 h-8 text-slate-400" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold text-slate-200">
                            Session Not Found
                        </h2>
                        <p className="text-slate-400">
                            This session record could not be located
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

    const formatTime = (date) =>
        new Date(date).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
        });

    const handleSave = async () => {
        setIsSaving(true);

        // Simulate save delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        console.log("Saved notes:", notes);
        setLastSaved(new Date());
        setIsSaving(false);

        // Optional: Show success toast
        alert("Session notes saved successfully");
    };

    const wordCount = notes.trim().split(/\s+/).filter(Boolean).length;

    return (
        <>
            <TherapistNavbar />

            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
                {/* Ambient background effect */}
                <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent pointer-events-none" />
                <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent pointer-events-none" />

                <div className="relative z-10 p-6 pt-28 pb-16">
                    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {/* Header */}
                        <header className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl border border-indigo-500/20">
                                    <Brain className="w-6 h-6 text-indigo-300" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-semibold tracking-tight bg-gradient-to-br from-slate-100 to-slate-400 bg-clip-text text-transparent">
                                        Therapy Session Notes
                                    </h1>
                                    <p className="text-slate-400 mt-0.5 text-sm">
                                        Document observations, progress, and
                                        therapeutic insights
                                    </p>
                                </div>
                            </div>
                        </header>

                        {/* Session Context Card */}
                        <Card className="bg-slate-900/40 backdrop-blur-xl border-slate-800/50 shadow-2xl shadow-black/20 overflow-hidden group hover:border-slate-700/50 transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <CardContent className="p-6 relative">
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                                        Session Details
                                    </h2>
                                    <Badge
                                        variant="outline"
                                        className="border-indigo-500/30 text-indigo-300 bg-indigo-500/10"
                                    >
                                        Active Session
                                    </Badge>
                                </div>

                                <div className="grid md:grid-cols-3 gap-4">
                                    <InfoCard
                                        icon={User}
                                        label="Patient"
                                        value={record.patientName || "Patient"}
                                        gradient="from-blue-500/10 to-cyan-500/10"
                                        iconColor="text-blue-300"
                                    />
                                    <InfoCard
                                        icon={Calendar}
                                        label="Session Date"
                                        value={formatDate(
                                            record.visitDate ||
                                                record.createdDate,
                                        )}
                                        subtitle={formatTime(
                                            record.visitDate ||
                                                record.createdDate,
                                        )}
                                        gradient="from-violet-500/10 to-purple-500/10"
                                        iconColor="text-violet-300"
                                    />
                                    <InfoCard
                                        icon={Brain}
                                        label="Session Type"
                                        value="Therapy Session"
                                        gradient="from-indigo-500/10 to-blue-500/10"
                                        iconColor="text-indigo-300"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Notes Editor Card */}
                        <Card className="bg-slate-900/40 backdrop-blur-xl border-slate-800/50 shadow-2xl shadow-black/20 overflow-hidden">
                            <CardHeader className="border-b border-slate-800/50 bg-slate-900/20">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <CardTitle className="text-xl font-semibold text-slate-100">
                                            Clinical Notes
                                        </CardTitle>
                                        <p className="text-xs text-slate-400">
                                            Confidential therapeutic
                                            documentation
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {lastSaved && (
                                            <div className="flex items-center gap-2 text-xs text-emerald-400 animate-in fade-in duration-500">
                                                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                                                Saved {formatTime(lastSaved)}
                                            </div>
                                        )}

                                        {isDirty && !isSaving && (
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg animate-in fade-in duration-300">
                                                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                                                <span className="text-xs text-amber-300 font-medium">
                                                    Unsaved
                                                </span>
                                            </div>
                                        )}

                                        {isSaving && (
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                                                <div className="w-3.5 h-3.5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                                                <span className="text-xs text-indigo-300 font-medium">
                                                    Saving...
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="p-6 space-y-4">
                                {/* Suggested Structure Pills */}
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-xs text-slate-400 font-medium">
                                        Quick sections:
                                    </span>
                                    {[
                                        "Presenting Concerns",
                                        "Emotional State",
                                        "Techniques Used",
                                        "Response",
                                        "Next Steps",
                                    ].map((section) => (
                                        <button
                                            key={section}
                                            onClick={() =>
                                                setNotes(
                                                    notes +
                                                        `\n\n### ${section}\n`,
                                                )
                                            }
                                            className="px-2.5 py-1 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 rounded-md text-xs text-slate-300 transition-all duration-200 hover:scale-105"
                                        >
                                            + {section}
                                        </button>
                                    ))}
                                </div>

                                <Separator className="bg-slate-800/50" />

                                {/* Text Editor */}
                                <div className="relative">
                                    <Textarea
                                        value={notes}
                                        onChange={(e) =>
                                            setNotes(e.target.value)
                                        }
                                        placeholder="Begin documenting the session...

Suggested structure:
• Presenting concerns and chief complaints
• Patient's emotional and mental state
• Therapeutic techniques and interventions used
• Patient's response and engagement
• Progress observations
• Homework assignments or action items
• Plan for next session"
                                        className="min-h-[320px] text-white bg-slate-950/50 border-slate-800/50 focus:border-indigo-500/50 resize-none leading-relaxed text-[15px] placeholder:text-slate-600 focus-visible:ring-indigo-500/20 transition-all duration-300"
                                    />

                                    {/* Word Counter */}
                                    <div className="absolute bottom-3 right-3 text-xs text-slate-500 bg-slate-900/80 backdrop-blur-sm px-2 py-1 rounded border border-slate-800/50">
                                        {wordCount}{" "}
                                        {wordCount === 1 ? "word" : "words"}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-between pt-3 border-t border-slate-800/50">
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>Auto-save enabled</span>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                setNotes(originalNotes)
                                            }
                                            disabled={!isDirty || isSaving}
                                            className="border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-slate-300 disabled:opacity-50 transition-all duration-200"
                                        >
                                            Discard Changes
                                        </Button>

                                        <Button
                                            onClick={handleSave}
                                            disabled={!isDirty || isSaving}
                                            className={cn(
                                                "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:shadow-none transition-all duration-300",
                                                isDirty &&
                                                    "animate-in slide-in-from-bottom-2",
                                            )}
                                        >
                                            {isSaving ? (
                                                <>
                                                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="w-4 h-4 mr-2" />
                                                    Save Notes
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Additional Tips Section */}
                        <Card className="bg-gradient-to-br from-slate-900/30 to-slate-900/50 backdrop-blur-xl border-slate-800/30 overflow-hidden">
                            <CardContent className="p-5">
                                <div className="flex gap-4">
                                    <div className="p-2 bg-indigo-500/10 rounded-lg h-fit">
                                        <Sparkles className="w-4 h-4 text-indigo-400" />
                                    </div>
                                    <div className="space-y-1.5 text-sm">
                                        <p className="font-medium text-slate-300">
                                            Documentation Best Practices
                                        </p>
                                        <p className="text-slate-400 leading-relaxed text-xs">
                                            Use objective language, avoid
                                            diagnostic labels without proper
                                            assessment, document specific
                                            behaviors and responses, note any
                                            safety concerns immediately, and
                                            maintain patient confidentiality at
                                            all times.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

/* ---------- Small Components ---------- */

const InfoCard = ({
    icon: Icon,
    label,
    value,
    subtitle,
    gradient,
    iconColor,
}) => (
    <div className="relative group overflow-hidden">
        <div
            className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                gradient,
            )}
        />
        <div className="relative flex items-center gap-4 bg-slate-950/60 border border-slate-800/50 rounded-xl p-4 hover:border-slate-700/50 transition-all duration-300">
            <div
                className={cn(
                    "p-3 rounded-xl bg-gradient-to-br backdrop-blur-sm transition-transform duration-300 group-hover:scale-110",
                    gradient,
                )}
            >
                <Icon className={cn("w-5 h-5", iconColor)} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium mb-1">
                    {label}
                </p>
                <p className="font-semibold text-slate-100 truncate">{value}</p>
                {subtitle && (
                    <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
                )}
            </div>
        </div>
    </div>
);
