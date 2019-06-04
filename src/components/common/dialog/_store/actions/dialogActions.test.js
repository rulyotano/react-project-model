import {addDialog, removeDialog} from './dialogActions';
import {ADD_DIALOG, REMOVE_DIALOG} from './dialogActions.types';

test('add dialog structure should', () => {
  const test = {};
  const result = addDialog(test);
  expect(result.type).toBe(ADD_DIALOG);
  expect(result.payload).toBe(test);
});

test('remove dialog structure should', () => {
  const id = 5;
  const result = removeDialog(id);
  expect(result.type).toBe(REMOVE_DIALOG);
  expect(result.payload).toBe(id);
});
