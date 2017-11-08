import Dialog from './Dialog'
import DialogButton from './DialogButton'
import {DialogButtonTypes} from './DialogButton'
import {forEach, isArray} from 'lodash'

it('create a dialog', () => {
    new Dialog()
});

it('pass constructor params to props', () => {
    let dialog = new Dialog("title1", "body1", false, [])
    expect(dialog.Title).toBe("title1")
    expect(dialog.Body).toBe("body1")
    expect(dialog.Modal).toBe(false)
    expect(dialog.Buttons).toEqual([])
});

it('defaults values in Dialog', () => {
    let dialog = new Dialog()
    expect(dialog.Title).toBe("")
    expect(dialog.Body).toBe("")
    expect(dialog.Modal).toBe(true)
    expect(isArray(dialog.Buttons)).toBe(true)
    expect(dialog.Buttons.length).toBe(1)
    expect(dialog.Buttons[0].Key).toBe(DialogButtonTypes.OK)
});

test('should have an id property', () => {
    let dialog = new Dialog()
    expect(dialog.Id).toBeDefined()
})

test('id property should be unique', () => {
    let dialog1 = new Dialog()
    let dialog2 = new Dialog()
    let dialog3 = new Dialog()

    expect(dialog1.Id).not.toEqual(dialog2.Id)    
    expect(dialog2.Id).not.toEqual(dialog3.Id)    
    expect(dialog3.Id).not.toEqual(dialog1.Id)    
})

test('should have a promise prop', () => {  
    let dialog1 = new Dialog()
    expect(dialog1.Promise).toBeDefined()
    expect(dialog1.Promise instanceof Promise).toBe(true)
})

test('when button is clicked should be resolved the promise of dialog with button value', 
done => 
{  
    let dialogButtonOk = new DialogButton(DialogButtonTypes.OK)
    let dialogButtonCancel = new DialogButton(DialogButtonTypes.CANCEL)
    let dialog1 = new Dialog("title1", "body1",false, [dialogButtonOk])

    dialog1.Promise.then(key=>{  
        expect(key).toBe(DialogButtonTypes.OK)
    })

    
    let dialog2 = new Dialog("title2", "body2",false, [dialogButtonCancel])
    dialog2.Promise.then(key=>{  
        expect(key).toBe(DialogButtonTypes.CANCEL)
    })

    Promise.all([dialog1, dialog2]).then(()=>{
        done()
    })

    dialogButtonOk.raiseAction()
    dialogButtonCancel.raiseAction()
})

test('should have error if modify buttons (all butons should be passed in constructor)', () => {  
    expect(() => {
        let dialog1 = new Dialog()
        let dialogButtonOk = new DialogButton(DialogButtonTypes.OK)
        dialog1.Buttons.push(dialogButtonOk)
      }).toThrow();
})