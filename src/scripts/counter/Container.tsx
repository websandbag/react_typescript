import { Counter } from "./Counter";
import { connect, MapDispatchToPropsParam, MapStateToPropsParam } from "react-redux";
import { Dispatch } from "redux";
import {
    CounterState,
    decrementAmount,
    incrementAmount,
    fetchRequestStart,
    fetchRequestFinish
} from './module';
import { ReduxAction, ReduxState } from '../store';
import { RouteComponentProps } from 'react-router';

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

const mapStateToProps: MapStateToPropsParam<{ 
    value: CounterState,
    param?: string
}, any> = (
    state: ReduxState, 
    ownProps: RouteComponentProps<{ 
        myParams: string | undefined 
    }>
) => {
    if(ownProps.match.params.myParams === undefined) {
        return {value: state.counter}
    }
    return {
        value: state.counter,
        param: ownProps.match.params.myParams
    }
}

const mapDispatchToProps: MapDispatchToPropsParam<{actions: ActionDispatcher}, {}> 
    = (dispatch: Dispatch<ReduxAction>) => ({
        actions: new ActionDispatcher(dispatch)
    });



export default connect(
    // react-router を使用しない場合
    // (state: ReduxState) => ({ value: state.counter }),
    // (dispatch: Dispatch<ReduxAction>) => ({
    //     actions: new ActionDispatcher(dispatch)
    // })
    mapStateToProps,
    mapDispatchToProps
)(Counter);