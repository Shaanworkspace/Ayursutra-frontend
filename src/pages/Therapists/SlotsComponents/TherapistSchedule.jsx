/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
    ChevronLeft,
    ChevronRight,
    CalendarDays,
    Clock,
    Plus,
    X,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";

import TherapistNavbar from "../components/TherapistNavbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CustomCalendar = ({ onDateClick, selectedDate }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Generate calendar days
    const calendarDays = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const prevLastDay = new Date(year, month, 0);

        const firstDayOfWeek = firstDay.getDay();
        const lastDateOfMonth = lastDay.getDate();
        const prevLastDate = prevLastDay.getDate();

        const days = [];

        // Previous month days
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            days.push({
                date: prevLastDate - i,
                isCurrentMonth: false,
                isNextMonth: false,
                fullDate: new Date(year, month - 1, prevLastDate - i),
            });
        }

        // Current month days
        for (let i = 1; i <= lastDateOfMonth; i++) {
            days.push({
                date: i,
                isCurrentMonth: true,
                isNextMonth: false,
                fullDate: new Date(year, month, i),
            });
        }

        // Next month days
        const remainingDays = 42 - days.length; // 6 rows × 7 days
        for (let i = 1; i <= remainingDays; i++) {
            days.push({
                date: i,
                isCurrentMonth: false,
                isNextMonth: true,
                fullDate: new Date(year, month + 1, i),
            });
        }

        return days;
    }, [currentDate]);

    const goToPrevMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
        );
    };

    const goToNextMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
        );
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    const isToday = (date) => {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    const isSelected = (date) => {
        if (!selectedDate) return false;
        const selected = new Date(selectedDate);
        return (
            date.getDate() === selected.getDate() &&
            date.getMonth() === selected.getMonth() &&
            date.getFullYear() === selected.getFullYear()
        );
    };

    const formatDateString = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="w-full">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white capitalize">
                    {monthNames[currentDate.getMonth()]}{" "}
                    {currentDate.getFullYear()}
                </h2>

                <div className="flex items-center gap-3">
                    <button
                        onClick={goToToday}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 
                                 border border-purple-500/40 text-purple-300 font-semibold
                                 hover:from-purple-500/30 hover:to-purple-600/30 hover:border-purple-500/60
                                 hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
                    >
                        Today
                    </button>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={goToPrevMonth}
                            className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 
                                     border border-purple-500/40 text-purple-300
                                     hover:from-purple-500/30 hover:to-purple-600/30 hover:border-purple-500/60
                                     hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <button
                            onClick={goToNextMonth}
                            className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 
                                     border border-purple-500/40 text-purple-300
                                     hover:from-purple-500/30 hover:to-purple-600/30 hover:border-purple-500/60
                                     hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2 mb-3">
                {dayNames.map((day) => (
                    <div
                        key={day}
                        className="h-11 flex items-center justify-center bg-[#0b0b0f] 
                                 border border-gray-800 rounded-xl shadow-lg"
                    >
                        <span className="text-white font-bold text-sm tracking-widest uppercase">
                            {day}
                        </span>
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, index) => {
                    const today = isToday(day.fullDate);
                    const selected = isSelected(day.fullDate);

                    return (
                        <button
                            key={index}
                            onClick={() =>
                                onDateClick(formatDateString(day.fullDate))
                            }
                            disabled={!day.isCurrentMonth}
                            className={`
                                relative h-20 rounded-2xl p-3 transition-all duration-300
                                flex flex-col items-center justify-center
                                ${
                                    !day.isCurrentMonth
                                        ? "opacity-40 cursor-not-allowed bg-white/5 border border-white/5"
                                        : "cursor-pointer group"
                                }
                                ${
                                    day.isCurrentMonth && !today && !selected
                                        ? "bg-gradient-to-br from-white/[0.03] to-white/[0.01] border-[1.5px] border-white/[0.08] hover:from-white/[0.1] hover:to-white/[0.05] hover:border-purple-500/40 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/15"
                                        : ""
                                }
                                ${
                                    today && !selected
                                        ? "bg-gradient-to-br from-purple-500/15 to-purple-600/10 border-2 border-purple-500/40 shadow-lg shadow-purple-500/20"
                                        : ""
                                }
                                ${
                                    selected
                                        ? "bg-gradient-to-br from-purple-500/25 to-purple-600/20 border-[2.5px] border-purple-500/60 scale-[0.98] shadow-[0_8px_25px_rgba(168,85,247,0.25)_inset,0_0_30px_rgba(168,85,247,0.15)]"
                                        : ""
                                }
                            `}
                        >
                            {/* Hover gradient overlay */}
                            {day.isCurrentMonth && (
                                <div
                                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 to-purple-600/0 
                                              group-hover:from-purple-500/[0.08] group-hover:to-purple-600/[0.05] 
                                              transition-all duration-400 pointer-events-none"
                                />
                            )}

                            {/* Date number */}
                            <div
                                className={`
                                relative z-10 w-10 h-10 flex items-center justify-center rounded-xl
                                font-semibold text-base transition-all duration-300
                                ${
                                    !day.isCurrentMonth
                                        ? "text-gray-600 bg-white/[0.03]"
                                        : "text-gray-200 bg-white/[0.03]"
                                }
                                ${
                                    day.isCurrentMonth && !today && !selected
                                        ? "group-hover:bg-purple-500/25 group-hover:text-purple-200 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-500/20"
                                        : ""
                                }
                                ${
                                    today && !selected
                                        ? "bg-gradient-to-br from-purple-500/40 to-purple-600/30 text-white font-extrabold shadow-lg shadow-purple-500/30"
                                        : ""
                                }
                                ${
                                    selected
                                        ? "bg-gradient-to-br from-purple-500/50 to-purple-600/40 text-white font-extrabold scale-110 shadow-lg shadow-purple-500/40"
                                        : ""
                                }
                            `}
                            >
                                {day.date}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

// Main Component
export default function TherapistSchedule() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [slots, setSlots] = useState([]);
    const [showAddSlotModal, setShowAddSlotModal] = useState(false);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const auth = useSelector((state) => state.auth);
    const gateway = import.meta.env.VITE_API_GATEWAY_BASE_URL;
    const [showAddSlotDialog, setShowAddSlotDialog] = useState(false);

    const reduxUser = useSelector((state) => state.auth.userResponse);
    const reduxProfile = useSelector((state) => state.profile.data);
    const reduxRole = useSelector((state) => state.auth.role);
    const storedProfile = localStorage.getItem("profile");
    const storedUser = localStorage.getItem("userResponse");
    const [allSlots, setAllSlots] = useState([]);
    const [confirmDeleteSlotId, setConfirmDeleteSlotId] = useState(null);

    const profile = storedProfile
        ? JSON.parse(storedProfile).data
        : reduxProfile;

    useEffect(() => {
        const fetchAllSlots = async () => {
            try {
                const res = await axios.get(
                    `${gateway}/api/therapists/slots/all`,
                    {
                        headers: {
                            Authorization: `Bearer ${auth.token}`,
                        },
                    },
                );
                console.log("Slots Fetched : ", res.data);
                setAllSlots(res.data || []);
            } catch (err) {
                console.error("Error fetching all slots", err);
            }
        };

        fetchAllSlots();
    }, []);

    const deleteSlot = async (slotId) => {
        try {
            await axios.delete(`${gateway}/api/therapists/slots/${slotId}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            const res = await axios.get(`${gateway}/api/therapists/slots/all`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });

            setAllSlots(res.data || []);

            const filtered = res.data.filter(
                (slot) => slot.slotDate === selectedDate,
            );
            console.log("slots : ", res.data);
            setSlots(filtered);

            // allSlots se bhi remove
            const updatedAllSlots = allSlots.filter(
                (slot) => slot.slotId !== slotId,
            );
            setAllSlots(updatedAllSlots);

            // selected date ke slots se bhi remove
            const updatedSlots = slots.filter((slot) => slot.slotId !== slotId);
            setSlots(updatedSlots);
        } catch (error) {
            console.error("Error deleting slot", error);
            alert("Unable to delete slot");
        }
    };

    const addNewSlot = async () => {
        if (!startTime || !endTime) {
            alert("Please select both start and end time");
            return;
        }

        if (startTime >= endTime) {
            alert("End time must be after start time");
            return;
        }

        try {
            await axios.post(`${gateway}/api/therapists/slots/add`, null, {
                params: {
                    date: selectedDate,
                    startTime,
                    endTime,
                },
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });

            const res = await axios.get(`${gateway}/api/therapists/slots/all`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });

            setAllSlots(res.data || []);

            // STEP 2: re-filter for selected date
            const filtered = res.data.filter(
                (slot) => slot.slotDate === selectedDate,
            );
            console.log("slots : ", res.data);
            setSlots(filtered);

            setStartTime("");
            setEndTime("");
        } catch (error) {
            console.error("Error adding slot", error);
        }
    };

    useEffect(() => {
        if (!confirmDeleteSlotId) return;

        const timer = setTimeout(() => {
            setConfirmDeleteSlotId(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [confirmDeleteSlotId]);

    const handleDateClick = (dateStr) => {
        setSelectedDate(dateStr);
        setShowAddSlotModal(true);

        const filteredSlots = allSlots.filter(
            (slot) => slot.slotDate === dateStr,
        );

        setSlots(filteredSlots);
    };

    const formattedDate = selectedDate
        ? new Date(selectedDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
          })
        : "";

    return (
        <>
            <TherapistNavbar />
            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-6 pt-28">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Page Heading */}
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                            <CalendarDays className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">
                                Manage Schedule
                            </h1>
                            <p className="text-gray-400">
                                Click on any date to manage availability
                            </p>
                        </div>
                    </div>

                    {/* Calendar Card */}
                    <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <CalendarDays className="w-5 h-5" />
                                Select a Date
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="p-6">
                            <CustomCalendar
                                onDateClick={handleDateClick}
                                selectedDate={selectedDate}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Add Slot Modal */}
            {showAddSlotModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-300">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-gradient-to-br from-gray-800 to-gray-900 border-b border-gray-700 p-6 flex items-center justify-between z-10">
                            <div>
                                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <Clock className="w-6 h-6 text-purple-400" />
                                    Manage Slots - {formattedDate}
                                </h2>
                                <p className="text-sm text-gray-400 mt-1">
                                    Add or remove availability slots
                                </p>
                            </div>
                            <button
                                onClick={() => setShowAddSlotModal(false)}
                                className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">
                            {/* Add Slot Button */}
                            <Button
                                onClick={() => setShowAddSlotDialog(true)}
                                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-6 rounded-xl"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Add New Time Slot
                            </Button>
                            <Dialog
                                open={showAddSlotDialog}
                                onOpenChange={setShowAddSlotDialog}
                            >
                                <DialogContent className="bg-gray-900 border-gray-700 text-white">
                                    <DialogHeader>
                                        <DialogTitle>
                                            Add New Time Slot
                                        </DialogTitle>
                                        <DialogDescription className="text-gray-400">
                                            Select start and end time for the
                                            therapist availability
                                        </DialogDescription>
                                    </DialogHeader>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm text-gray-400">
                                                Start Time
                                            </label>
                                            <input
                                                type="time"
                                                value={startTime}
                                                onChange={(e) =>
                                                    setStartTime(e.target.value)
                                                }
                                                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-sm text-gray-400">
                                                End Time
                                            </label>
                                            <input
                                                type="time"
                                                value={endTime}
                                                onChange={(e) =>
                                                    setEndTime(e.target.value)
                                                }
                                                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
                                            />
                                        </div>
                                    </div>

                                    <DialogFooter>
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                setShowAddSlotDialog(false)
                                            }
                                            className="bg-red-400 hover:bg-red-900"
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            onClick={() => {
                                                addNewSlot();
                                                setShowAddSlotDialog(false);
                                            }}
                                            className="bg-purple-600 hover:bg-purple-700"
                                        >
                                            Save Slot
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            {/* Existing Slots */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">
                                    Current Slots ({slots.length})
                                </h3>

                                {slots.length === 0 ? (
                                    <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-gray-700/50">
                                        <Clock className="w-16 h-16 text-gray-600 mx-auto mb-3" />
                                        <p className="text-gray-400 text-lg">
                                            No slots available for this day
                                        </p>
                                        <p className="text-gray-500 text-sm mt-1">
                                            Click "Add New Time Slot" to create
                                            availability
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {slots.map((slot) => (
                                            <div
                                                key={slot.slotId}
                                                className={`p-5 rounded-xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg
                                                    ${
                                                        slot.status ===
                                                        "AVAILABLE"
                                                            ? "bg-green-500/10 border-green-500/30 hover:bg-green-500/20 hover:border-green-500/50"
                                                            : "bg-red-500/10 border-red-500/30 hover:bg-red-500/20 hover:border-red-500/50"
                                                    }
                                                `}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className={`p-2 rounded-lg ${
                                                                slot.status ===
                                                                "AVAILABLE"
                                                                    ? "bg-green-500/20"
                                                                    : "bg-red-500/20"
                                                            }`}
                                                        >
                                                            <Clock
                                                                className={`w-5 h-5 ${
                                                                    slot.status ===
                                                                    "AVAILABLE"
                                                                        ? "text-green-400"
                                                                        : "text-red-400"
                                                                }`}
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="text-white font-semibold text-lg">
                                                                {slot.startTime}{" "}
                                                                – {slot.endTime}
                                                            </div>
                                                            {slot.status ===
                                                                "BOOKED" && (
                                                                <p className="text-xs text-gray-400 mt-1">
                                                                    Booked by
                                                                    patient
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        <Badge
                                                            variant={
                                                                slot.status ===
                                                                "AVAILABLE"
                                                                    ? "success"
                                                                    : "destructive"
                                                            }
                                                            className="px-3 py-1"
                                                        >
                                                            {slot.status}
                                                        </Badge>

                                                        {slot.status ===
                                                            "AVAILABLE" && (
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className={
                                                                    confirmDeleteSlotId ===
                                                                    slot.slotId
                                                                        ? "text-white bg-red-600 hover:bg-red-700"
                                                                        : "text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                                                }
                                                                onClick={() => {
                                                                    if (
                                                                        confirmDeleteSlotId ===
                                                                        slot.slotId
                                                                    ) {
                                                                        deleteSlot(
                                                                            slot.slotId,
                                                                        );
                                                                        setConfirmDeleteSlotId(
                                                                            null,
                                                                        );
                                                                    } else {
                                                                        setConfirmDeleteSlotId(
                                                                            slot.slotId,
                                                                        );
                                                                    }
                                                                }}
                                                            >
                                                                {confirmDeleteSlotId ===
                                                                slot.slotId ? (
                                                                    "Confirm"
                                                                ) : (
                                                                    <X className="w-4 h-4" />
                                                                )}
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="sticky bottom-0 bg-gradient-to-br from-gray-800 to-gray-900 border-t border-gray-700 p-6 flex gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setShowAddSlotModal(false)}
                                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                            >
                                Close
                            </Button>
                            <Button variant="destructive" className="flex-1">
                                Clear All Slots
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
