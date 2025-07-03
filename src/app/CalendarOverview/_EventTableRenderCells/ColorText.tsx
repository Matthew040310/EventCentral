import { GridRenderCellParams } from "@mui/x-data-grid";
import FullEventReport from "@/types/IFullEventReport";
import determineColor from "../determineColor";

const ColorText: React.FC<GridRenderCellParams> = (props) => {
    const { value, row } = props;
    const colour = determineColor(row);

    return <span style={{ color: colour }}>{value}</span>;
}

export default ColorText;