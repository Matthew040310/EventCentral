import React from 'react'
import { Suspense } from "react";
import EventForm from "./EDC-Submission-Form";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EventForm />
        </Suspense>
    );
}