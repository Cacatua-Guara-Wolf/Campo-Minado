# Campo Minado

Um bot para jogar campo minado no Discord. Criado utilizando discord.js. Atualmente **está em desenvolvimento**.

![Imagem de perfil do bot](img/profile_picture.png)

### Para que ele rode em sua máquina
1. Você precisa ter o [Node.js instalado](https://nodejs.org/pt-br/download).
2. Incluir a pasta `node_modules` no repositório:
```bash
npm install discord.js
```
3. Criar um `config.json` com as variáveis `token` (token do bot), `clientId` (id do bot) e `guildId` (id do servidor de testes):
```json
{
	"token": "TOKEN_DO_BOT",
	"clientId": "ID_DO_BOT",
	"guildId": "ID_DO_SERVIDOR_DE_TESTES"
}
```
4. Faça o upload dos emojis em `/img/emoji` em seu servidor de testes e ajuste com o id deles o arquivo `/common/emojis.js`.
	- Lembre-se de colocar apenas um caractere no nome dos emojis, para evitar que o Discord não envie as mensagens por ultrapassar os 2000 caracteres. Então, por exemplo, para o emoji de bomba recomenda-se usar o nome `:B:`;
	- Pode ser que o Discord não aceite apenas um caractere no nome do emoji, mas ele automaticamente ajusta para `:B_:`.
5. Rodar o `run.bat`.
	- Ou então executar...
		```bash
		node deploy-commands.js
		node index.js
		```
		...caso não goste de arquivos batch.