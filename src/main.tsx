import * as React from 'react';
import * as ReactDom from 'react-dom';
import './style/index.scss';

interface HelloText { text: string }

class Main extends React.Component<HelloText, {}> {
    public props: object;
    constructor(props) {
        super(props);
    }
    private render() {
        return (
            <div>{this.props['text']}</div>
        );
    }
}
ReactDom.render(<Main text="Hello Yan!" />, document.getElementById('app'));
