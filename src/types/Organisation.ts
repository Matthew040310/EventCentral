import { ALL_DEPARTMENTS, ALL_CLUSTERS, ALL_GROUPS } from "@/constants/EventCentralConstants";

export type Departments = (typeof ALL_DEPARTMENTS)[number];

export type Groups = (typeof ALL_GROUPS)[number];

export type Clusters = (typeof ALL_CLUSTERS)[number];