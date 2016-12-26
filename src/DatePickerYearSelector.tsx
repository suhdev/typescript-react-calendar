import * as React from 'react'; 
export interface DatePickerYearSelectorProps {
    onYearSelect:Function;
    startYear:number;
}

export interface DatePickerYearSelectorState {
    
}

export interface DatePickerYearSelectorItemProps {
    onSelect:Function;
    label:string;
}

export interface DatePickerYearSelectorItemState {
    
}

export class DatePickerYearSelectorItem extends React.Component<DatePickerYearSelectorItemProps,
    DatePickerYearSelectorItemState>{
    constructor(props:DatePickerYearSelectorItemProps){
        super(props);
    }
    
    shouldComponentUpdate(props:DatePickerYearSelectorItemProps){
        return props.label != this.props.label;
    }
    
    render(){
        return (
            <div className="picker-year" onClick={this.props.onSelect }>{this.props.label}</div>
        );
    }
    
}

export class DatePickerYearSelector extends React.Component<DatePickerYearSelectorProps,
    DatePickerYearSelectorState>{
    constructor(props:DatePickerYearSelectorProps){
        super(props);
    }
    
    shouldComponentUpdate(props:DatePickerYearSelectorProps){
        return props.startYear !== this.props.startYear;
    }
    render(){
        let m = moment(),
            k = m.year() - this.props.startYear; 
        return (
            <div className="picker-table-year year-selector">
                {(new Array(k)).map((k,e) => {
                    return (<DatePickerYearSelectorItem 
                        key={"year-"+e} 
                        label={m.year(e+this.props.startYear).format('YYYY')} 
                        onSelect={this.props.onYearSelect.bind(this,e+this.props.startYear)}/>);
                }) }
            </div>
        );
    }        
}