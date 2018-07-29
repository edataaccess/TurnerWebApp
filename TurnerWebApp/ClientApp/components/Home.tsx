import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import { NavLink } from 'react-router-dom';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {

    public state = { searchtext: "" };
    
    public render() {
        let contents = <div>
            <h1>Turner Develper Challenge</h1>
            <p>submitted by Philip Brown</p>
            <p />
            <p />
            <div>
                <text>Enter text to Search:  </text>
                <textarea id='searchtextbox'>{this.state.searchtext}</textarea>
            </div>
            <p />
            <p />
            <p width='500px;'><br /><br /><b>Notes:</b><br />
                The intent here is to enter a search value, navigate to FetchTitles,<br />
                get the search value, have the GetTitlesAsync executed, then render<br />
                the result list, with the TitleId being a Link.  <br />
                <br />
                The TitleId link then navigates to FetchTitleData, have the DetailsAsync<br />
                executed, then render the detail result view.<br />
                <br/>
                The search value is not getting to FetchTitles component.<br />
                It has all been coded, but not tested past that.<br />
                </p>
            <p />
        </div>;

        return contents;
    }

    
}
