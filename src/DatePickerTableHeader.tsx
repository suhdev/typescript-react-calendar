import * as React from 'react'; 

export interface DatePickerTableHeaderProps{
    
} 

export interface DatePickerTableHeaderState {
    
}


export class DatePickerTableHeader extends React.Component<DatePickerTableHeaderProps,DatePickerTableHeaderState>{
    constructor(props:DatePickerTableHeaderProps){
        super(props);
    }
    
    shouldComponentUpdate(){
        return false;
    }
    
    render(){
        let m:moment.Moment = moment(); 
        return (
            <thead>
                <tr>
                    <th>{m.weekday(0).format('ddd')}</th>
                    <th>{m.weekday(1).format('ddd') }</th>
                    <th>{m.weekday(2).format('ddd') }</th>
                    <th>{m.weekday(3).format('ddd') }</th>
                    <th>{m.weekday(4).format('ddd') }</th>
                    <th>{m.weekday(5).format('ddd') }</th>
                    <th>{m.weekday(6).format('ddd') }</th>
                </tr>
            </thead>
        );
    }
}