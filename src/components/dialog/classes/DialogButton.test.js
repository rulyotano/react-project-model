import DialogButton from './DialogButton'
import {DialogButtonTypes, DialogButtonTypesDefaults} from './DialogButton'
import {forEach} from 'lodash'

it('construct custom with all parameters should be in the props', () => {
    let dialogButton = new DialogButton(DialogButtonTypes.CUSTOM, "key1", "label1", true)
    expect(dialogButton.Key).toBe("key1")    
    expect(dialogButton.Label).toBe("label1")    
    expect(dialogButton.Type).toBe(DialogButtonTypes.CUSTOM)    
    expect(dialogButton.Focused).toBe(true)    
});

it("default values when isn't custom", ()=>{
    forEach(DialogButtonTypes, (buttonType)=>{
        if (buttonType !== DialogButtonTypes.CUSTOM){            
            let dialogButton = new DialogButton(buttonType)
            expect(dialogButton.Focused).toBe(DialogButtonTypesDefaults[buttonType].focused)
            expect(dialogButton.Label).toBe(DialogButtonTypesDefaults[buttonType].label)
            expect(dialogButton.Key).toBe(buttonType)
            expect(dialogButton.Type).toBe(buttonType)
        }
    })    
})

test('should have a promise prop', () => {  
    let dialogButton = new DialogButton(DialogButtonTypes.CUSTOM, "key1", "label1", true)
    expect(dialogButton.Promise).toBeDefined()
    expect(dialogButton.Promise instanceof Promise).toBe(true)
})

test('should have raise action method', () => {  
    let dialogButton = new DialogButton(DialogButtonTypes.CUSTOM, "key1", "label1", true)
    expect(dialogButton.raiseAction).toBeDefined()
    expect(dialogButton.raiseAction instanceof Function).toBe(true)
})

test('when raise action is executed promise is resolved with key as parameter', done => {  
    let dialogButton = new DialogButton(DialogButtonTypes.CUSTOM, "key1", "label1", true)
    dialogButton.Promise.then(key=>{
        expect(key).toBe("key1")
        done()
    })
    dialogButton.raiseAction()
})

