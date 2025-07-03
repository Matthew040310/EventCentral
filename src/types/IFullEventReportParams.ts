import FullEventReport from "./IFullEventReport";
import EventState from "./TEventState";

type NumberFilter = {
    gt?: number;
    gte?: number;
    lt?: number;
    lte?: number;
    equals?: number;
    in?: number[];
    notIn?: number[];
};

type StringFilter = {
    equals?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    in?: string[];
    notIn?: string[];
};

type DateFilter = {
    gt?: Date;
    gte?: Date;
    lt?: Date;
    lte?: Date;
    equals?: Date;
    in?: Date[];
    notIn?: Date[];
};

type FieldFilter<T> =
    T extends number | null ? NumberFilter | null :
    T extends string | null ? StringFilter | string | null :
    T extends Date | null ? DateFilter | null :
    T;

type SortDirection = "asc" | "desc";
type SortBy<T> = { [K in keyof T]?: SortDirection; };

export type FullEventReportWithFilters = {
    [K in keyof FullEventReport]?: FieldFilter<FullEventReport[K]>;
};

export default interface FullEventReportParams {
    state: EventState;
    filters?: Partial<FullEventReportWithFilters>,
    sortby?: SortBy<FullEventReport>[],
}