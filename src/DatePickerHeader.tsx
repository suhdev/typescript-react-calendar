import * as React from 'react';
import {DatePickerNavButton,RenderFn} from './DatePickerNavButton';
export interface DatePickerHeaderProps {
    onNext:Function;
    onPrev:Function;
    currentView:moment.Moment;
    toMonthView:Function;
    toYearView:Function;
    nextIcon?:string;
    prevIcon?:string;
    iconRenderer?:RenderFn<any>;
    navClassName?:string;
    
}

export interface DatePickerHeaderState {
    
}

export class DatePickerHeader extends React.Component<DatePickerHeaderProps,DatePickerHeaderState>{
    constructor(props:DatePickerHeaderProps){
        super(props);
        this.state = {}; 
    }
    
    shouldComponentUpdate(props:DatePickerHeaderProps){
        return props.currentView !== this.props.currentView ||
            props.nextIcon !== this.props.nextIcon ||
            props.prevIcon !== this.props.prevIcon; 
    }
    
    render(){
        let clz = this.props.navClassName || '';
        return (
            <div className="picker-header">
                <DatePickerNavButton onClick={this.props.onPrev} icon={this.props.prevIcon ||"&laquo;"} 
                    iconRenderer={this.props.iconRenderer} type="prev" className={"picker-prev "+clz} />
                <div className="year-month-picker">
                    <div className="month-picker" onClick={this.props.toMonthView.bind(this)}>
                        <div className="month-label">{this.props.currentView.format('MMMM') }</div>
                    </div>
                    <div className="year-picker" onClick={this.props.toYearView.bind(this)}>
                        <div className="picker-label">{this.props.currentView.format('YYYY')}</div>
                    </div>
                </div>
                <DatePickerNavButton onClick={this.props.onNext} icon={this.props.nextIcon ||"&raquo;"} 
                    iconRenderer={this.props.iconRenderer} type="next" className={"picker-next "+clz} />
                <div className="picker-next" onClick={this.props.onNext}><span> </span></div>
            </div>
        );
    }
}