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
