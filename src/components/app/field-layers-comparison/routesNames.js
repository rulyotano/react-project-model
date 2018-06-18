import { PreloadKey as tableKey } from "./preview-table/routesNames";
import { PreloadKey as compareKey } from "./layers-comparison/routesNames";

export const base = "layer-comparison";

export const PreviewModalToTable = `${base}/${tableKey}`
export const PreviewModalToComparison = `${base}/${compareKey}`

export default base;