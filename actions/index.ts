import { MemosActions } from './memosAction'
import { TagsActions } from './tagsAction';
import { InitialStateActions } from './initialState';
import { FilterMemosActions } from './filterMemosAction';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import { TagsFilterActions } from './tagsFilterAction';
import { ImageScreenActions } from './imageScreenAction';
import { MemoFormActions } from './memoFormAction';
import { NewImageActions } from './newImageAction';

export type Actions = MemosActions | TagsActions | InitialStateActions | FilterMemosActions | TagsFilterActions | ImageScreenActions | MemoFormActions | NewImageActions

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, Actions>
