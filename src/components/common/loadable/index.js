import Loadable from 'react-loadable';
import LoadingComponent from "../_LoadingComponent";

export default (loader)=> Loadable({
  loader,
  loading: LoadingComponent,
});