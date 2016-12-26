import * as React from 'react';

export interface DatePickerMonthSelectorProps {
    onMonthSelected:Function;
}

export interface DatePickerMonthSelectorState {
    
}

export interface DatePickerMonthSelectorItemProps {
    onSelect:Function;
    label:string;
}

export interface DatePickerMonthSelectorItemState {
    
}

export class DatePickerMonthSelectorItem extends React.Component<DatePickerMonthSelectorItemProps,
    DatePickerMonthSelectorItemState>{
    constructor(props:DatePickerMonthSelectorItemProps){
        super(props);
    }        
    
    shouldComponentUpdate(props:DatePickerMonthSelectorItemProps){
        return props.label !== this.props.label;
    }
    
    render(){
        return (
            <div className="picker-month" onClick={this.props.onSelect}>{this.props.label}</div>
        );
    }
}

export class DatePickerMonthSelector extends React.Component<DatePickerMonthSelectorProps,DatePickerMonthSelectorState>{
    constructor(props:DatePickerMonthSelectorProps){
        super(props);
    }
    
    render(){
        let m = moment(); 
        return (
            <div className="picker-table-month month-selector">
                {[0,1,2,3,4,5,6,7,8,9,10,11].map((e) => { 
                    return (<DatePickerMonthSelectorItem 
                        key={"month-"+e}
                        onSelect={this.props.onMonthSelected.bind(this,e)} 
                        label={m.month(e).format('MMMM')} />);
                })}
            </div>
        );
    }
}