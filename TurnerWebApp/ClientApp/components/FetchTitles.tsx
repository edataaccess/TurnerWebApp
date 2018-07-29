import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Home } from './Home';

interface FetchTitlesState {
    titles: TitleItem[];
    loading: boolean;
    searchValue: string;
}

export class FetchTitles extends React.Component<RouteComponentProps<{}>, FetchTitlesState> {
    constructor() {
        super();
        this.state = { titles: [], loading: true, searchValue: 'Cav' };

        fetch('Home/GetTitlesAsync')
            .then(response => response.json() as Promise<TitleItem[]>)
            .then(data => {
                this.setState({ titles: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchTitles.renderTitlesTable(this.state.titles);

        return <div>
            <h1>List of Titles Found</h1>
            {contents}
        </div>;
    }


    private static renderTitlesTable(titles: TitleItem[]) {
        return <table className='titlestable'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>View Detail</th>
                </tr>
            </thead>
            <tbody>
                {titles.map(titleitem =>
                    <tr key={ titleitem.id }>
                        <td><a href={'Home/DetailsAsync/'.concat(titleitem.id) }>{ titleitem.titleid }</a></td>
                        <td>{ titleitem.titlename }</td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

interface TitleItem {
    id: string;
    titleid: string;
    titlename: string;
}
