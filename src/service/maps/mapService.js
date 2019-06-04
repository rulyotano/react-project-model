import store from '../../components/store';
import {selectMapField} from '../../components/common/map/_duck/actions';

export const fieldToString = (feature = null)=>{
  if (!feature)
    return "";
  const {cdFazenda: farm, cdZona: sector, cdTalhao: field, descTalhao} = feature.properties;
  return `${farm}.${sector}.${descTalhao && descTalhao !== 'null' ? descTalhao : field}`;
};

export const getSelectedField = () => {
  return store.getState().map.selected;
};

export const setSelectedField = (feature)=>{
  store.dispatch(selectMapField(feature));
};