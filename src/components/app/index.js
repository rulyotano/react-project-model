import App from "./App";
import reducerRegistry from "../../service/redux/reducerRegistry"
import reducer from "./_store"

reducerRegistry.register('app', reducer)

export default App