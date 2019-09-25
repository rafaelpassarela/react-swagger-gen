import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

// Available pages
import HomePage from '../pages/home.page.component';

class RouterPlaceHolder extends React.Component {

	render() {

		return (
			<div>
				<Switch>
					<Route path="/swgen" exact component={HomePage} />
					<Route component={HomePage} />
				</Switch>
			</div>
		);

	}

}

export default RouterPlaceHolder;