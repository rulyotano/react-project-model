import configureStore from '../../../configureStore'

let store = null

beforeAll(()=>{
    store = configureStore()
})

it("store should have 'dialog' object", ()=>{
    expect(store.getState().dialog).toBeDefined()
})

it("dialog state should have a dialogs property with default []", ()=>{
    expect(store.getState().dialog.dialogs).toEqual([])
})