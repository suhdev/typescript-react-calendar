import * as React from 'react'; 
import {DatePickerHeader} from './DatePickerHeader';
import {RenderFn} from './DatePickerNavButton';
import {DatePickerTableHeader} from './DatePickerTableHeader';
import {DatePickertableRow} from './DatePickerTableRow';
import {DatePickerMonthSelector} from './DatePickerMonthSelector';
import {DatePickerYearSelector} from './DatePickerYearSelector';
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
};

export class DatePicker extends React.Component<DatePickerProps, DatePickerState>{
	constructor(props:DatePickerProps){
		super(props);
		this.state = {
			currentView:moment(),
			startDate:moment(),
			endDate: moment(),
			view: 0,
			visible:false
		}
	}

	onCellClick(date:moment.Moment){
		this.props.onSelectionChange(date);
	}

	onPrevClicked(){
		this.setState({
			currentView: this.state.currentView.subtract(1, "month")
		});
	}

	onNextClicked(){
		this.setState({
			currentView: this.state.currentView.add(1, "month")
		});
	}

	setVisible(b:boolean){
		this.setState({
			visible: b
		});
	}

	toMonthView(){
		this.setState({
			view:DatePickerViews.MONTH_SELECTION
		});
	}

	toYearView(){
		this.setState({
			view:DatePickerViews.YEAR_SELECTION
		});
	}

	toDayView(){
		this.setState({
			view:DatePickerViews.DAY_SELECTION
		});
	}

	onMonthSelected(month:number){
		this.setState({
			currentView:this.state.currentView.month(month),
			view:DatePickerViews.DAY_SELECTION
		});
	}

	onYearSelected(year:number){
		this.setState({
			currentView: this.state.currentView.year(year),
			view:DatePickerViews.DAY_SELECTION
		});
	}

	shouldComponentUpdate(nextProps:DatePickerProps,nextState:DatePickerState){
		return nextProps.direction !== this.props.direction ||
			nextProps.selectedDate !== this.props.selectedDate ||
			nextState.currentView !== this.state.currentView ||
			nextState.endDate !== this.state.endDate ||
			nextState.startDate !== this.state.startDate ||
			nextState.view !== this.state.view ||
			nextState.visible !== this.state.visible;
	}

	render(){
		let start = this.state.currentView.clone().startOf('month'),
			end = this.state.currentView.clone().endOf('month'),
			currentDay = moment(new Date()),
			selected = this.props.selectedDate || moment(),
			startDay = start.clone().weekday(0),
			endDay = end.clone().weekday(6),
			items: any = [],
			currentView = this.state.view,
			i = 0,
			l = endDay.diff(startDay,'days'),
			rows = Math.floor(l/7);
		for (i=0; i <=rows ;i++) {
			items.push(
				(<DatePickertableRow
				key={"row-"+i} 
				startDay={startDay} 
				endDay={endDay} 
				currentDay={currentDay} 
				selected={selected} 
				onCellClick={this.onCellClick.bind(this)} />)
				);
		}
		return (
			<div data-visible={this.state.visible} 
			data-direction={(this.props.direction ? this.props.direction:"left")} 
			className={"ui-datepicker " + ((currentView === DatePickerViews.DAY_SELECTION) ? "day-selection" : ((currentView === DatePickerViews.MONTH_SELECTION) ? "month-selection" : "year-selection")) }>
				<DatePickerHeader 
					onNext={this.onNextClicked.bind(this)} 
					onPrev={this.onPrevClicked.bind(this)} 
					iconRenderer={this.props.navIconRenderer}
					nextIcon={this.props.nextIconString}
					prevIcon={this.props.prevIconString}
					navClassName={this.props.navClassName}
					toMonthView={this.toMonthView.bind(this)}
					toYearView={this.toYearView.bind(this)} 
					currentView={this.state.currentView}	/>
				<div className="picker-table day-selector">
					<table>
						<DatePickerTableHeader />
						<tbody>
						{items}
						</tbody>
					</table>
				</div>
				<DatePickerMonthSelector onMonthSelected={this.onMonthSelected.bind(this)}/>
				<DatePickerYearSelector onYearSelect={this.onYearSelected.bind(this)} startYear={this.props.startYear || (currentDay.year()-10)} />
			</div>
		);
	}

}