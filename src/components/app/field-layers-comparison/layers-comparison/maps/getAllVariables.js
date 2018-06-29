import config, {CLIENT_TYPE_CANE, CLIENT_TYPE_GRAIN} from "../../../../../config/config";
import TestsVariable from "./vars/TestsVariable";
import TestsVariable2 from "./vars/TestsVariable2";
import {createSelectedVariableRangeSelector} from "../_duck/selectors";
import {setVariableRange} from "../_duck/actions";

const buildNode = (title, variables = null) => ({
    title, variables
})

const buildGrain = (items, action, selector) => buildNode("grain",[
    buildNode("harvest", [                       
        new TestsVariable("grain-test-1", items, action, selector),
        new TestsVariable2("grain-test-2", items, action, selector),
    ])
]);
const buildCane = (items, action, selector) => buildNode("cane",[
    buildNode("harvest", [                       
        new TestsVariable("cane-test-1", items, action, selector),
        new TestsVariable2("cane-test-2", items, action, selector)
    ])
]);

export default function getAllVariablesBuilder(items, index){
    const action = (range)=>setVariableRange(range, index);
    const selector = createSelectedVariableRangeSelector(index);
    return config.CLIENT_TYPE === CLIENT_TYPE_CANE ? buildGrain(items, action, selector) :
                config.CLIENT_TYPE === CLIENT_TYPE_GRAIN ? buildCane(items, action, selector) : null;    
}