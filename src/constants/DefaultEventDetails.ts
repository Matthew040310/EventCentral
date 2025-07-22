const DefaultEventDetails = {
    id: "",
    type: "New",
    embargoed: null,
    estimatedStartDate: null,           // optional field for draft events
    startDate: null,
    endDate: null,
    frequency: "One-off",
    frequencyInterval: null,            // optional field for recurring events
    customFrequency: null,              // optional field for custom frequency
    selectedDay: null,                  // optional field for custom frequency (e.g., "First Monday of Month")
    title: "",
    scheme: "",
    description: "",
    affectedCohortDescription: "",
    estimatedCohortSize: null,
    cluster: null,
    group: null,
    department: null,
    OIC: "",
    OICEmail: "",
    reportStatus: null,

    // (Future) Fields for Event Details
    // updatedBy: session?.user?.email
}

export default DefaultEventDetails;