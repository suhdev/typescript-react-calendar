import * as React from 'react';
export interface RenderFn<P> {
	(...args: any[]): React.ReactElement<P>;
}

export interface DatePickerNavButtonProps {
	className?: string;
	iconClassName?: string;
	icon?: string;
	type:string;
	iconRenderer?: RenderFn<any>;
	onClick: Function;
}

export interface DatePickerNavButtonState {

}

export class DatePickerNavButton extends React.Component<DatePickerNavButtonProps,DatePickerNavButtonState>{
	constructor(props:DatePickerNavButtonProps){
		super(props);
		this.state = {};
	}

	shouldComponentUpdate(props:DatePickerNavButtonProps,state:DatePickerNavButtonState){
		return props.className !== this.props.className ||
			props.type !== this.props.type || 
			props.iconClassName !== this.props.iconClassName;
	}

	render(){
		let clz = this.props.className || "",
			iconClz = this.props.iconClassName || "",
			iconStr = this.props.icon ||  '',
			icon = this.props.iconRenderer ? this.props.iconRenderer(this.props.type) : (<span className={iconClz}>{iconStr}</span>);
		return (
			<div className={"picker-button "+clz} onClick={this.props.onClick }>{icon}</div>
		);
	}
}