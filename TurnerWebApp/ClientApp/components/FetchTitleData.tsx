import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface FetchTitleDataState {
    titleDetail: TitleItem;
    loading: boolean;
    searchValue: string;
}

export class FetchTitleData extends React.Component<RouteComponentProps<{}>, FetchTitleDataState> {
    constructor() {
        super();

        /// todo: need to get searchValue from UI text box

        this.setState({ loading: true, searchValue: "Fast" });

        fetch('home/GetTitlesAsync/' + this.state.searchValue )
            .then(response => response.json() as Promise<TitleItem>)
            .then(data => {
                this.setState({ titleDetail: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchTitleData.renderTitleDetail(this.state.titleDetail);

        return <div>
            { contents }
        </div>;
    }

    private static renderAward(award: Award) {
        if (!award.awardwon) {
            return null;
        }
        let contents = <div>
            <tr>
                <td>{award.awardyear}</td>
                <td>{award.award}</td>
            </tr>
            <tr>
                <td></td>
                <td>{award.awardcompany}</td>
            </tr>
            {award.participants.map(s => 
                <tr>
                    <td></td>
                    <td>{s}</td>
                </tr>
            )}
        </div>;

        return contents;
    }

    private static renderOtherName(othername: OtherName) {
        let contents = <div>
            <tr>
                <td>Title Name</td>
                <td>{othername.titlename}</td>
            </tr>
            <tr>
                <td>Name Type</td>
                <td>{othername.titlenametype}</td>
            </tr>
            <tr>
                <td>Language</td>
                <td>{othername.titlenamelanguage}</td>
            </tr>
            <tr>
                <td>Sortable Name</td>
                <td>{othername.titlenamesortable}</td>
            </tr>
        </div>;

        return contents;
    }

    private static renderParticipant(pers: Participant) {
        let contents = <div>
            <tr>
                <td>Type</td>
                <td>{pers.participanttype}</td>
            </tr>
            <tr>
                <td>Name</td>
                <td>{pers.name}</td>
            </tr>
            <tr>
                <td>Role Type</td>
                <td>{pers.roletype}</td>
            </tr>
            <tr>
                <td>Is Key Participant</td>
                <td>{pers.iskey}</td>
            </tr>
            <tr>
                <td>Is On Screen</td>
                <td>{pers.isonscreen}</td>
            </tr>
        </div>;

        return contents;
    }

    private static renderStoryLine(storyline: StoryLine) {
        let contents = <div>
            <tr>
                <td>Language</td>
                <td>{storyline.language}</td>
            </tr>
            <tr>
                <td>Type</td>
                <td>{storyline.type}</td>
            </tr>
            <tr>
                <td>Description</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td colSpan={2}>{storyline.description}</td>
            </tr>
        </div>;

        return contents;
    }

    private static renderTitleDetail(detail: TitleItem) {
        //note: wanted to wrap various section headings and renderings 
        //      with 'if', when no data, but did not get 'if' working in timeframe.
        //note: would really like to render this in tree that can be expanded by section,
        //       but time is not permitting in this challenge.
        let contents = <table className='table' key={detail.id}>
            <thead>
                <tr>
                    <th>Field Name</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Title ID</td>
                    <td>{detail.titleid}</td>
                </tr>
                <tr>
                    <td>Title Name</td>
                    <td>{detail.titlename}</td>
                </tr>
                <tr>
                    <td>Release Year</td>
                    <td>{detail.releaseyear}</td>
                </tr>
                <tr>
                    <td>Awards</td>
                    <td>&nbsp;</td>
                </tr>
                {detail.awards.map(award => {
                    this.renderAward(award);
                }
                )}
                <tr>
                    <td>Genres</td>
                    <td>&nbsp;</td>
                </tr>
                {detail.genres.map(g => {
                    <tr>
                        <td>&nbsp;</td>
                        <td>{g}</td>
                    </tr>
                }
                )}
                <tr>
                    <td>KeyGenres</td>
                    <td>&nbsp;</td>
                </tr>
                {detail.keygenres.map(kg => {
                    <tr>
                        <td>&nbsp;</td>
                        <td>{kg}</td>
                    </tr>
                }
                )}
                <tr>
                    <td>Other Names</td>
                    <td>&nbsp;</td>
                </tr>
                {detail.othernames.map(othername => {
                    this.renderOtherName(othername);
                }
                )}
                <tr>
                    <td>Participants</td>
                    <td>&nbsp;</td>
                </tr>
                {detail.participants.map(pers => {
                    this.renderParticipant(pers);
                }
                )}
                <tr>
                    <td>Story Lines</td>
                    <td>&nbsp;</td>
                </tr>
                {detail.storylines.map(s => {
                    this.renderStoryLine(s);
                }
                )}
            </tbody>
        </table >;

        return contents;
    }
}

interface TitleItem {
    id: string;
    titleid: string;
    titlename: string;
    titlenamesortable: string;
    releaseyear: number;
    awards: Array<Award>;
    genres: Array<string>;
    keygenres: Array<string>;
    othernames: Array<OtherName>;
    participants: Array<Participant>;
    storylines: Array<StoryLine>;
}
interface Award {    
    awardwon: boolean;
    awardyear: number;
    participants: Array<string>;
    award: string;
    awardcompany: string;
}
interface OtherName {
    titlenamelanguage: string;
    titlenametype: string;
    titlenamesortable: string;
    titlename: string;
}
interface Participant {
    iskey: boolean;
    roletype: string;
    isonscreen: boolean;
    participanttype: string;
    name: string;
    participantid: number;
}
interface StoryLine {
    description: string;
    language: string;
    type: string;
}


