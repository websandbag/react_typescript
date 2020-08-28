import { Action } from 'redux';

// ---Action Creator---

/**
 * Action CreatorでActionを作る際の雛形
 */

enum ActionNames {
    INC = 'counter/increment',
    DEC = 'counter/decrement'
}

interface IncrementAction extends Action {
    type: ActionNames.INC,
    plusAmount: number
}
export const incrementAmount = (amount: number): IncrementAction => ({
    type: ActionNames.INC,
    plusAmount: amount
});

interface DecrementAction extends Action {
    type: ActionNames.DEC,
    minusAmount: number
}
export const decrementAmount = (amount: number): DecrementAction => ({
    type: ActionNames.DEC,
    minusAmount: amount
});

// ---Reducer---

/**
 * Stateを更新する処理
 */

export interface CounterState {
    num: number
}

// カウンターアクションのタイプ定義
export type CounterActions = IncrementAction | DecrementAction;

const initialState: CounterState = {
    num: 0
};

export default function reducer(
    state: CounterState = initialState, 
    action: CounterActions
) {
    switch(action.type) {
        case ActionNames.INC:
            return { num: state.num + action.plusAmount }
        case ActionNames.DEC:
            return { num: state.num - action.minusAmount }
        default:
            return state
    }
}


