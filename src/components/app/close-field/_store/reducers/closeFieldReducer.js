import config, {CLIENT_TYPE_CANE, CLIENT_TYPE_GRAIN} from '../../../../../config/config'

const caneProcess = [
    { id: 0, desc: "closeField.Corte de cana mecanizado" }
];
const grainProcess = [
    { id: 0, desc: "closeField.Preparo de solo" },
    { id: 1, desc: "closeField.Preparo de solo: fertilizantes e corretivos" },
    { id: 2, desc: "closeField.Aplicação de Fertilizante" },
    { id: 3, desc: "closeField.Aplicação de Herbicida (dessecante)" },
    { id: 4, desc: "closeField.Aplicação de Inseticida" },
    { id: 5, desc: "closeField.Aplicação de Fungicida" },
    { id: 6, desc: "closeField.Aplicação de Regulador de crescimento" },
    { id: 7, desc: "closeField.Aplicações em geral (inclui mais de um dos itens aplicação)" },
    { id: 8, desc: "closeField.Plantio" },
    { id: 9, desc: "closeField.Colheita" },
];

const initialState = {
    process: config.CLIENT_TYPE === CLIENT_TYPE_CANE ? caneProcess :
             config.CLIENT_TYPE === CLIENT_TYPE_GRAIN ? grainProcess : []
}

export default (state = initialState, action) => {
  switch (action.type) {
  default:
    return state
  }
}
