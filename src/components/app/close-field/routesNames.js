import { PreloadKey as MapKey } from "./map/routesNames";
import { PreloadKey as ProcessKey } from "./process/routesNames";

const closeField = "close-field";

export const LoadMap = `${closeField}/${MapKey}`;
export const LoadProcess = `${closeField}/${ProcessKey}`;

export default closeField;