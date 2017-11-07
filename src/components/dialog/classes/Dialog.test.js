import Dialog from './Dialog'
import DialogButton from './DialogButton'
import {DialogButtonTypes} from './DialogButton'
import {forEach, isArray} from 'lodash'

it('create a dialog', () => {
    new Dialog()
});

it('pass constructor params to props', () => {
    let callback = jest.fn();
    let dialog = new Dialog("title1", "body1", callback, false, [])
    expect(dialog.Title).toBe("title1")
    expect(dialog.Body).toBe("body1")
    expect(dialog.Callback).toBe(callback)
    expect(dialog.Modal).toBe(false)
    expect(dialog.Buttons).toEqual([])
});

it('defaults values in Dialog', () => {
    let dialog = new Dialog()
    expect(dialog.Title).toBe("")
    expect(dialog.Body).toBe("")
    expect(dialog.Callback).toBe(null)
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

test('should ', () => {
  
})
