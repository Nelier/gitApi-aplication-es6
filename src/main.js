import api from './api';

class App {
    constructor() {
        this.repository = [];

        this.formEl = document.getElementById('repo-form');
        this.inputEl = document.querySelector('input[name=repository]');
        this.inputUserEl = document.querySelector('input[name=user]');
        this.listEl = document.getElementById('repo-list');

        this.registerHandlers();
    }

    registerHandlers() {
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    async addRepository(event) {
        event.preventDefault();

        const inputUser = this.inputUserEl.value;
        const inputRepo = this.inputEl.value;

        if (inputRepo === 0 || inputUser === 0) {
            return;
        }
        this.setLoading();
        try {
            const response = await api.get(`/repos/${inputUser}/${inputRepo}`);

            const { name, description, html_url, owner: { avatar_url } } = response.data;

            this.repository.push({
                name,
                description,
                avatar_url,
                html_url,
            });

            this.inputEl.innerHTML = '';
            this.inputUserEl.innerHTML = '';

            this.render();
        } catch (err) {
            alert(err);
        }
        this.setLoading(false);
    }
    setLoading(loading = true) {
        if (loading === true) {
            let loadingEl = document.createElement('span');
            loadingEl.appendChild(document.createTextNode('Carregando...'));
            loadingEl.setAttribute('id', 'loading');

            this.formEl.appendChild(loadingEl);
        } else {
            document.getElementById('loading').remove();
        }
    }

    render() {
        this.listEl.innerHTML = '';

        this.repository.forEach(repo => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.description));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank');
            linkEl.setAttribute('href', repo.html_url);
            linkEl.appendChild(document.createTextNode('Acessar'));

            let listItemEl = document.createElement('li');
            listItemEl.append(imgEl);
            listItemEl.append(titleEl);
            listItemEl.append(descriptionEl);
            listItemEl.append(linkEl);

            this.listEl.appendChild(listItemEl);
        })
    }
}

new App();