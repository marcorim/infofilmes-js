const nomeBusca = document.querySelector(".input");
const mensagemErro = document.querySelector("#mensagemErro");
const botaoBuscar = document.querySelector("#botao_buscar");
const titulo = document.querySelector("#titulo");
const ano = document.querySelector("#ano");
const duracao = document.querySelector("#duracao");
const genero = document.querySelector("#genero");
const diretor = document.querySelector("#diretor");
const atores = document.querySelector("#atores");
const poster = document.querySelector(".poster");
const sinopse = document.querySelector("#sinopse");
const apiKey = "f2d2e9d0";
const imgDefault = "./default_image.png";

async function buscaFilme(nomeBusca){
     const resposta = await fetch(`http://www.omdbapi.com/?t=${nomeBusca}&apikey=${apiKey}`);
     return resposta.json();
}

botaoBuscar.addEventListener('click', () => {
	limparCampos();
	core();
})

async function core() {
	try {
		const filme = await buscaFilme(nomeBusca.value);
		validaDados(filme);
		defineValores(filme);
	} catch(erro) {
		mensagemErro.innerText = `${erro}`;
	}
}

function defineValores(filme) {
	titulo.textContext = filme.Title;
	sinopse.textContext = filme.Plot;
	ano.textContext = `Year: ${filme.Year}`;
	duracao.textContext = `Run time: ${filme.Runtime}`;
	atores.textContext = `Actors: ${filme.Actors}`;
	diretor.textContext = `Director: ${filme.Director}`;
	poster.setAttribute('src', filme.Poster);
}

function limparCampos() {
	titulo.textContext = "";
	sinopse.textContext = "";
	ano.textContext = "";
	duracao.textContext = "";
	atores.textContext = "";
	diretor.textContext = "";
	mensagemErro.textContext = "";
	poster.setAttribute('src', imgDefault);
}

function validaDados(filme) {
	if (filme.Plot === undefined || filme.Year === undefined || filme.Actors === "N/A") {
		throw new Error ('Filme não encontrado.');
	}
}