import { Action } from 'redux';

// ---Action Creator---

/**
 * Action CreatorでActionを作る際の雛形
 */

enum ActionNames {
    INC = 'counter/increment',
    DEC = 'counter/decrement',
    FETCH_START = 'counter/fetch_request_start',
    FETCH_FINISH = 'counter/fetch_request_finish'
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

interface FetchRequestStartAction extends Action {
    type: ActionNames.FETCH_START,
    appAction: boolean
}
export const fetchRequestStart = (): FetchRequestStartAction => ({
    type: ActionNames.FETCH_START,
    appAction: true
})

interface FetchRequestFinishAction extends Action {
    type: ActionNames.FETCH_FINISH,
    appAction: boolean
}
export const fetchRequestFinish = (): FetchRequestFinishAction => ({
    type: ActionNames.FETCH_FINISH,
    appAction: true
})

// ---Reducer---

/**
 * Stateを更新する処理
 */

// カウンターの型設定
export interface CounterState {
    num: number,
    loadingCount: number
}

// カウンターアクションのタイプ定義
export type CounterActions = IncrementAction
    | DecrementAction
    | FetchRequestStartAction
    | FetchRequestFinishAction

// カウンターの初期値
const initialState: CounterState = {
    num: 0,
    loadingCount: 0
};

/**
 * reducerでstateを更新する
 * 
 * @param state 
 * @param action 
 */
export default function reducer(
    state: CounterState = initialState,
    action: CounterActions
) {
    // actionのtypeに該当する処理を振り分ける
    switch (action.type) {
        case ActionNames.INC:
            return { num: state.num + action.plusAmount }
        case ActionNames.DEC:
            return { num: state.num - action.minusAmount }
        case ActionNames.FETCH_START:
            return { loadingCount: state.loadingCount + 1 }
        case ActionNames.FETCH_FINISH:
            return { loadingCount: state.loadingCount - 1 }
        default:
            return state
    }
}