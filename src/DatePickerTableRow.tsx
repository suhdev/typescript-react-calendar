import * as React from 'react'; 

export interface TableRowProps{
    selected:moment.Moment;
    startDay:moment.Moment;
    endDay:moment.Moment;
    currentDay:moment.Moment;
    onCellClick:Function;
} 

export interface TableRowState{
    
}

export class DatePickertableRow extends React.Component<TableRowProps,TableRowState>{
    constructor(props:TableRowProps){
        super(props);
    }
    
    shouldComponentUpdate(props:TableRowProps){
        return props.selected !== this.props.selected ||
            props.startDay !== this.props.startDay ||
            props.endDay !== this.props.endDay ||
            props.currentDay !== this.props.currentDay;
    }
    
    render(){
        let startDay = this.props.startDay,
            endDay = this.props.endDay,
            currentDay = this.props.currentDay;
        return (
            <tr>
                {[0,1,2,3,4,5,6].map((e)=>{
                    var k = (<td className={((this.props.selected.dayOfYear() === startDay.dayOfYear())?"selected":((currentDay.dayOfYear() === startDay.dayOfYear())?"current":""))} key={"cell-" + e}><span className="picker-day" onClick={this.props.onCellClick.bind(this, startDay) }>{startDay.date() }</span></td>);
                    startDay = startDay.clone().add(1, 'days');
                    return k;
                })}
            </tr>
        );
    }
}