import { withProviders } from "./providers";
import { Routing } from "../pages";

const App = () => {
  return (
    <div className="app">
      <Routing />
    </div>
  );
}

export default withProviders(App);
