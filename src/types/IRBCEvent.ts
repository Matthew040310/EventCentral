// For react-big-calendar rendering

import FullEventReport from "./IFullEventReport";

export default interface RBCEvent extends Partial<FullEventReport> {
    end: Date | null;
}