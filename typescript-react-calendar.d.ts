/// <reference path="./typings/react/react.d.ts" />

declare module "typescript-react-calendar" {
    import * as React from 'react';
     
    export interface RenderFn<P> {
        (...args: any[]): React.ReactElement<P>;
    }
    
    export interface DatePickerProps {
        onSelectionChange: Function;
        selectedDate: moment.Moment;
        direction?: string;
        navIconRenderer?:RenderFn<any>;
        navClassName?:string;
        nextIconString?:string;
        prevIconString?:string;
        startYear?:number;
    }
    
    export interface DatePickerState {
        currentView?: moment.Moment;
        startDate?: moment.Moment;
        endDate?: moment.Moment;
        view?: number;
        visible?: boolean;
    }

    export const DatePickerViews = {
        DAY_SELECTION:0,
        MONTH_SELECTION:1,
        YEAR_SELECTION:2
    }
    
    export class DatePicker extends React.Component<DatePickerProps,DatePickerState>{
        
    }
}