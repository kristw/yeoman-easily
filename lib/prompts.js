const path = require('path');
const directoryName = path.basename(process.cwd());

const prompts = [
  {
    type: 'input',
    name: 'name',
    message: 'Project name:',
    default: directoryName
  },
  {
    type: 'input',
    name: 'description',
    message: 'Description:',
    default: directoryName + '\'s description'
  },
  {
    type: 'input',
    name: 'keywords',
    message: 'Keywords (comma to split):',
    filter: w => w.split(/\s*,\s*/g),
    default: ''
  },
  {
    type: 'input',
    name: 'authorName',
    message: 'Author\'s name:',
    default: 'Darth Vader',
    store: true
  },
  {
    type: 'input',
    name: 'authorEmail',
    message: 'Author\'s email:',
    default: 'anakin@dark.site',
    store: true
  },
  {
    type: 'input',
    name: 'authorUrl',
    message: 'Author\'s homepage:',
    default: 'http://dark.site',
    store: true
  },
  {
    type: 'input',
    name: 'twitterHandle',
    message: 'Twitter @handle:',
    filter: d => d.replace('@', ''),
    default: 'dvader',
    store: true
  },
  {
    name: 'githubAccount',
    message: 'GitHub username or organization:',
    default: hash => (hash.twitterHandle || 'dvader'),
    store: true
  }
];

export default prompts;
