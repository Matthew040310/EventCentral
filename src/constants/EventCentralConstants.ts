export const EVENT_TYPE = [
  "New",
  "Existing",
  "Existing with Changes"
] // Changes to this array will affect the following files:
// EDC-Submission-Form.tsx                                            (Affects rendering logic)
// createDraft | updateDraft | createSubmission | updateSubmission    (Affects API Handling logic)

import { RRule, Weekday } from 'rrule';
export const EVENT_FREQUENCY = {
  "One-off": "",
  "Daily": RRule.DAILY,
  "Weekly": RRule.WEEKLY,
  "Monthly": RRule.MONTHLY,
  "Yearly": RRule.YEARLY,
  "Custom": "",
}

type CustomEventFrequency = {
  [customFrequency: string]: {
    [selectedDay: string]: Weekday | Weekday[];
  };
};

export const CUSTOM_EVENT_FREQUENCY: CustomEventFrequency = {
  "Weekly": {
    "Every Monday": RRule.MO,
    "Every Tuesday": RRule.TU,
    "Every Wednesday": RRule.WE,
    "Every Thursday": RRule.TH,
    "Every Friday": RRule.FR,
    "Every Saturday": RRule.SA,
    "Every Sunday": RRule.SU
  },
  "Monthly": {
    "Last Day of Month": [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA, RRule.SU],
    "First Working Day of Month": [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR],
    "Last Working Day of Month": [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR],
    "First Monday of the Month": RRule.MO.nth(1),
    "First Tuesday of the Month": RRule.TU.nth(1),
    "First Wednesday of the Month": RRule.WE.nth(1),
    "First Thursday of the Month": RRule.TH.nth(1),
    "First Friday of the Month": RRule.FR.nth(1),
    "First Saturday of the Month": RRule.SA.nth(1),
    "First Sunday of the Month": RRule.SU.nth(1),
    "Second Monday of the Month": RRule.MO.nth(2),
    "Second Tuesday of the Month": RRule.TU.nth(2),
    "Second Wednesday of the Month": RRule.WE.nth(2),
    "Second Thursday of the Month": RRule.TH.nth(2),
    "Second Friday of the Month": RRule.FR.nth(2),
    "Second Saturday of the Month": RRule.SA.nth(2),
    "Second Sunday of the Month": RRule.SU.nth(2),
    "Third Monday of the Month": RRule.MO.nth(3),
    "Third Tuesday of the Month": RRule.TU.nth(3),
    "Third Wednesday of the Month": RRule.WE.nth(3),
    "Third Thursday of the Month": RRule.TH.nth(3),
    "Third Friday of the Month": RRule.FR.nth(3),
    "Third Saturday of the Month": RRule.SA.nth(3),
    "Third Sunday of the Month": RRule.SU.nth(3),
    "Fourth Monday of the Month": RRule.MO.nth(4),
    "Fourth Tuesday of the Month": RRule.TU.nth(4),
    "Fourth Wednesday of the Month": RRule.WE.nth(4),
    "Fourth Thursday of the Month": RRule.TH.nth(4),
    "Fourth Friday of the Month": RRule.FR.nth(4),
    "Fourth Saturday of the Month": RRule.SA.nth(4),
    "Fourth Sunday of the Month": RRule.SU.nth(4),
    "Last Monday of the Month": RRule.MO,
    "Last Tuesday of the Month": RRule.TU,
    "Last Wednesday of the Month": RRule.WE,
    "Last Thursday of the Month": RRule.TH,
    "Last Friday of the Month": RRule.FR,
    "Last Saturday of the Month": RRule.SA,
    "Last Sunday of the Month": RRule.SU,
  }
}

type Organisation = {
  [cluster: string]: {
    [department: string]: string[];
  };
};

export const ORGANISATION: Organisation = {

  "SVC":
  // SVC GROUPS AND DEPARTMENTS
  {
    "RIG": ["RSG", "RIU", "RWD", "NAC"],
    "HFG": ["HPD", "HID", "HCP"],
    "HIG": ["HSD", "IVD", "HED"],
    "ASG": ["AGP", "AMD"],
    "CUG": ["SLD", "SCD", "CCC"],
    "ECE": ["CSD", "CED", "SED"]
  },

  "IDS": {
    // IDS GROUPS AND DEPARTMENTS
    "BAS": ["AAD", "RDD", "HIS", "BSP"],
    "CIG": ["CSS", "DCD", "DPD", "NED", "CSO"],
    "DSG": ["DSD", "MDD", "EDD", "CDD"],
    "AHC": ["CDS", "HCA", "HCD"],
    "CIO": ["BIA", "ISS"]
  },

  "PCD": {
    // PCD GROUPS AND DEPARTMENTS
    "PSR": ["POD", "DSA", "AIS", "RAD"],
    "FPG": ["FIN", "FOT", "PYD", "PCM"],
    "SRG": ["SPD", "RMD", "RHS"],
    "COM": ["MPD", "OPD"],
    "HCM": ["HRD", "COD", "CPFB Academy"],
    "AIG": ["ASD", "IMD"],
    "LGL": ["NA"]
  },

  "IA": {
    // IA GROUPS AND DEPARTMENTS
    "NA": ["NA"]
  }
}

export const Department_Group_Cluster_Map: Record<string, { cluster: string; group: string }> = (() => {
  const map: Record<string, { cluster: string; group: string }> = {};

  for (const cluster of Object.keys(ORGANISATION)) {
    for (const group of Object.keys(ORGANISATION[cluster])) {
      for (const department of ORGANISATION[cluster][group]) {
        map[department] = { cluster, group };
      }
    }
  }
  return map;
})();

export const ALL_CLUSTERS = Object.keys(ORGANISATION).sort()
export const ALL_GROUPS = Object.keys(Department_Group_Cluster_Map)
  .map(department => Department_Group_Cluster_Map[department].group)
  .filter((value, index, self) => self.indexOf(value) === index)
  .sort()
export const ALL_DEPARTMENTS = Object.keys(Department_Group_Cluster_Map).sort()

export const STATUS = [
  "Pending Write Up",
  "For SLD Vetting",
  "For CUG Vetting",
  "Completed"
]

export const ANNOUNCEMENT_TYPES = [
  "Press Release",
  "Announcement by Other Govt Agencies",
  "Website Banner",
  "Social Media Post",
  "Campaigns",
  "Infographics",
]

export const NOTIFICATION_TYPES = [
  'Email',
  'SMS',
  'Push Notification']

import TDialogButton from '@/types/TDialogButton';
export const UPDATE_OPTIONS: TDialogButton[] = [
  { buttonOption: "Update this Event Only", color: "info" },
  { buttonOption: "Update Future Events", color: "error" }
] // Changes to this array will affect the following files:
// updateSubmission    (Affects API Handling logic)

export const DELETE_OPTIONS: TDialogButton[] = [
  { buttonOption: "Confirm", color: "error" },
  { buttonOption: "Cancel", color: "secondary" }
];