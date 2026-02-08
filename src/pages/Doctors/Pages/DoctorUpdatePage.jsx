import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "@/Store/Slices/profileSlice";
import { DoctorLayout } from "../components/DoctorLayout";

export default function DoctorUpdatePage() {
    const auth = useSelector((s) => s.auth);
    const dispatch = useDispatch();

    const [specializations, setSpecializations] = useState([]);
    const [availabilities, setAvailabilities] = useState([]);
    const profile = useSelector((s) => s.profile.data);
    const [form, setForm] = useState({
        specialization: null,
        availability: null,
    });
    useEffect(() => {
        if (!profile) return;

        setForm((prev) => ({
            specialization:
                prev.specialization ?? profile.specialization ?? null,
            availability: prev.availability ?? profile.availability ?? null,
        }));
    }, [profile]);

    const loadingEnums =
        specializations.length === 0 || availabilities.length === 0;

    const gateway = import.meta.env.VITE_API_GATEWAY_BASE_URL;

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadEnums = async () => {
            const [sp, av] = await Promise.all([
                axios.get(`${gateway}/api/doctors/enums/specializations`),
                axios.get(`${gateway}/api/doctors/enums/availability`),
            ]);

            setSpecializations(sp.data);
            setAvailabilities(av.data);
        };

        loadEnums();
    }, []);

    const saveProfile = async () => {
        try {
            setSaving(true);

            const res = await axios.put(
                `${gateway}/api/doctors/profile/me`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                },
            );

            dispatch(
                setProfile({
                    role: "DOCTOR",
                    data: res.data,
                }),
            );
        } finally {
            setSaving(false);
        }
    };

    const canSave = form.specialization && form.availability;

    return (
        <DoctorLayout>
            <div className="flex-1 flex items-center justify-center px-4 pt-28 pb-10 bg-gray-950">
                <Card className="w-full max-w-4xl bg-gray-900 border-gray-800">
                    <CardHeader>
                        <CardTitle className="text-xl text-white">
                            Complete your doctor profile
                        </CardTitle>
                        <p className="text-sm text-gray-400">
                            Please select your specialization and availability
                            to continue.
                        </p>
                    </CardHeader>

                    <CardContent className="space-y-8">
                        {/* Specialization */}
                        <div>
                            <h3 className="text-sm mb-3 text-gray-300">
                                Specialization
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {specializations.map((sp) => {
                                    const isSelected =
                                        form.specialization === sp;

                                    return (
                                        <div
                                            key={sp}
                                            onClick={() =>
                                                setForm((p) => ({
                                                    ...p,
                                                    specialization: sp,
                                                }))
                                            }
                                            className={`cursor-pointer rounded-xl border p-4 transition-all
                                        ${
                                            isSelected
                                                ? "border-emerald-500 bg-emerald-500/10 shadow-lg"
                                                : "border-gray-700 bg-gray-950/50 hover:border-gray-500"
                                        }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <p className="text-white font-medium">
                                                    {sp.replaceAll("_", " ")}
                                                </p>

                                                {isSelected ? (
                                                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                                ) : (
                                                    <div className="w-5 h-5 rounded-full border border-gray-600" />
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Availability */}
                        <div>
                            <h3 className="text-sm mb-3 text-gray-300">
                                Availability
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {availabilities.map((av) => {
                                    const isSelected = form.availability === av;

                                    return (
                                        <div
                                            key={av}
                                            onClick={() =>
                                                setForm((p) => ({
                                                    ...p,
                                                    availability: av,
                                                }))
                                            }
                                            className={`cursor-pointer rounded-xl border p-4 transition-all
                                        ${
                                            isSelected
                                                ? "border-emerald-500 bg-emerald-500/10 shadow-lg"
                                                : "border-gray-700 bg-gray-950/50 hover:border-gray-500"
                                        }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <p className="text-white font-medium">
                                                    {av.replaceAll("_", " ")}
                                                </p>

                                                {isSelected ? (
                                                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                                ) : (
                                                    <div className="w-5 h-5 rounded-full border border-gray-600" />
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <Button
                                disabled={!canSave || saving || loadingEnums}
                                onClick={saveProfile}
                            >
                                {saving ? "Saving..." : "Save & Continue"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DoctorLayout>
    );
}
