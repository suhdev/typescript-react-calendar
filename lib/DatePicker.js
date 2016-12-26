import * as React from 'react';
export const DatePickerViews = {
    DAY_SELECTION: 0,
    MONTH_SELECTION: 1,
    YEAR_SELECTION: 2
};
export class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentView: moment(),
            startDate: moment(),
            endDate: moment(),
            view: 0,
            visible: false
        };
    }
    onCellClick(date) {
        this.props.onSelectionChange(date);
    }
    onPrevClicked() {
        this.setState({
            currentView: this.state.currentView.subtract(1, "month")
        });
    }
    onNextClicked() {
        this.setState({
            currentView: this.state.currentView.add(1, "month")
        });
    }
    setVisible(b) {
        this.setState({
            visible: b
        });
    }
    toMonthView() {
        this.setState({
            view: DatePickerViews.MONTH_SELECTION
        });
    }
    toYearView() {
        this.setState({
            view: DatePickerViews.YEAR_SELECTION
        });
    }
    toDayView() {
        this.setState({
            view: DatePickerViews.DAY_SELECTION
        });
    }
    onMonthSelected(month) {
        this.setState({
            currentView: this.state.currentView.month(month),
            view: DatePickerViews.DAY_SELECTION
        });
    }
    onYearSelected(year) {
        this.setState({
            currentView: this.state.currentView.year(year),
            view: DatePickerViews.DAY_SELECTION
        });
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.direction !== this.props.direction ||
            nextProps.selectedDate !== this.props.selectedDate ||
            nextState.currentView !== this.state.currentView ||
            nextState.endDate !== this.state.endDate ||
            nextState.startDate !== this.state.startDate ||
            nextState.view !== this.state.view ||
            nextState.visible !== this.state.visible;
    }
    render() {
        let start = this.state.currentView.clone().startOf('month'), end = this.state.currentView.clone().endOf('month'), currentDay = moment(new Date()), selected = this.props.selectedDate || moment(), startDay = start.clone().weekday(0), endDay = end.clone().weekday(6), items = [], currentView = this.state.view, i = 0, l = endDay.diff(startDay, 'days'), rows = Math.floor(l / 7);
        for (i = 0; i <= rows; i++) {
            items.push((React.createElement("tr", {key: "row-" + i}, _.range(7).map((e) => {
                var k = (React.createElement("td", {className: ((selected.dayOfYear() === startDay.dayOfYear()) ? "selected" : ((currentDay.dayOfYear() === startDay.dayOfYear()) ? "current" : "")), key: "cell-" + i + "-" + e}, React.createElement("span", {className: "picker-day", onClick: this.onCellClick.bind(this, startDay)}, startDay.date())));
                startDay = startDay.clone().add(1, 'days');
                return k;
            }))));
        }
        return (React.createElement("div", {"data-visible": this.state.visible ? "true" : "false", "data-direction": (this.props.direction ? this.props.direction : "left"), className: "ui-datepicker " + ((currentView === DatePickerViews.DAY_SELECTION) ? "day-selection" : ((currentView === DatePickerViews.MONTH_SELECTION) ? "month-selection" : "year-selection"))}, React.createElement("div", {className: "picker-header"}, React.createElement("div", {className: "picker-prev", onClick: this.onPrevClicked.bind(this)}, React.createElement("span", null, "«")), React.createElement("div", {className: "year-month-picker"}, React.createElement("div", {className: "month-picker", onClick: this.toMonthView.bind(this)}, React.createElement("div", {className: "month-label"}, this.state.currentView.format('MMMM'))), React.createElement("div", {className: "year-picker", onClick: this.toYearView.bind(this)}, React.createElement("div", {className: "picker-label"}, this.state.currentView.format('YYYY')))), React.createElement("div", {className: "picker-next", onClick: this.onNextClicked.bind(this)}, React.createElement("span", null, "» "))), React.createElement("div", {className: "picker-table day-selector"}, React.createElement("table", null, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, moment().weekday(0).format('ddd')), React.createElement("th", null, moment().weekday(1).format('ddd')), React.createElement("th", null, moment().weekday(2).format('ddd')), React.createElement("th", null, moment().weekday(3).format('ddd')), React.createElement("th", null, moment().weekday(4).format('ddd')), React.createElement("th", null, moment().weekday(5).format('ddd')), React.createElement("th", null, moment().weekday(6).format('ddd')))), React.createElement("tbody", null, items))), React.createElement("div", {className: "picker-table-month month-selector"}, _.range(12).map((e) => {
            return (React.createElement("div", {className: "picker-month", key: "month-" + e, onClick: this.onMonthSelected.bind(this, e)}, moment().month(e).format('MMMM')));
        })), React.createElement("div", {className: "picker-table-year year-selector"}, _.range(20).map((e) => {
            return (React.createElement("div", {className: "picker-year", key: "year-" + e, onClick: this.onYearSelected.bind(this, e + 1997)}, moment().year(e + 1997).format('YYYY')));
        }))));
    }
}
//# sourceMappingURL=DatePicker.js.map