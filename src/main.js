import api from './api';

class App {
    constructor() {
        this.repository = JSON.parse(localStorage.getItem('repo_list')) || [];

        this.formEl = document.getElementById('repo-form');
        this.inputEl = document.querySelector('input[name=repository]');
        this.inputUserEl = document.querySelector('input[name=user]');
        this.listEl = document.getElementById('repo-list');

        this.registerHandlers();
        this.render();
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
            this.addToStorage();
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

        this.repository.forEach((repo, index) => {
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

            let deleteEl = document.createElement('button');
            deleteEl.addEventListener("click", () => {
                return this.deleteRepo(index);
            });
            deleteEl.innerHTML = 'Deletar';

            let listItemEl = document.createElement('li');
            listItemEl.append(imgEl);
            listItemEl.append(titleEl);
            listItemEl.append(descriptionEl);
            listItemEl.append(linkEl);
            listItemEl.append(deleteEl);

            this.listEl.appendChild(listItemEl);
        })
    }
    addToStorage() {
        localStorage.setItem('repo_list', JSON.stringify(this.repository));
    }
    deleteRepo(pos) {
        this.repository.splice(pos, 1);
        this.render();
        this.addToStorage();
    }

}

new App();