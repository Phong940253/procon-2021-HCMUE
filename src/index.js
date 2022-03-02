import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styles/index.css';
import levelFactory from './lib/levels-factory';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941

const MuiTheme = () => (
  <MuiThemeProvider>
    <App level={levelFactory(4 ** 2)} />
  </MuiThemeProvider>
);

ReactDOM.render(<MuiTheme />, document.getElementById('root'));
