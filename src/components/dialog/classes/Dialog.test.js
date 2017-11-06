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