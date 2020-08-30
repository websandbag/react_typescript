import { Counter } from "./Counter";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
    decrementAmount,
    incrementAmount,
    fetchRequestStart,
    fetchRequestFinish
} from './module';
import { ReduxAction, ReduxState } from '../store';

export class ActionDispatcher {
    constructor(private dispatch: (action: ReduxAction) => void) { }

    myHeaders = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-requested-With': 'XMLHttpRequest'
    })

    public increment(amount: number) {
        this.dispatch(incrementAmount(amount))
    }

    public decrement(amount: number) {
        this.dispatch(decrementAmount(amount))
    }

    public async asyncIncrement(): Promise<void> {
        this.dispatch(fetchRequestStart())

        try {
            const response: Response = await fetch('/api/count', {
                method: 'GET',
                headers: this.myHeaders
            })

            // ステータス確認
            if (response.status != 200) {
                throw new Error(`illigal status code: ${response.status}`)
            }

            const json: { amount: number } = await response.json();

            this.dispatch(incrementAmount(json.amount))

        } catch (err) {
            console.error(err)
        } finally {
            this.dispatch(fetchRequestFinish());
        }
    }
}

export default connect(
    (state: ReduxState) => ({ value: state.counter }),
    (dispatch: Dispatch<ReduxAction>) => ({
        actions: new ActionDispatcher(dispatch)
    })
)(Counter);