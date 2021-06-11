// index.js
const Mustache = require('mustache');
const fs = require('fs');
const fetch = require('node-fetch');
const MUSTACHE_MAIN_DIR = './main.mustache';

const getArticles = async () => {
    const result = await fetch('https://www.davebitter.com/api/content/articles')
        .then(response => response.json())

    return result.articles.map(({ title, slug }) => ({ title, slug }));
}

const generateReadMe = async () => {
    const readMeData = {
        articles: (await getArticles()).slice(0, 5)
    };

    fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
        if (err) throw err;
        const output = Mustache.render(data.toString(), readMeData);
        fs.writeFileSync('README.md', output);
    });
}

generateReadMe();
