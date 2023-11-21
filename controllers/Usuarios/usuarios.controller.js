var usuarios = []

const requiredFields = ['nome', 'genero', 'dataNascimento', 'nomeMaterno', 'cpf', 'telefoneCelular', 'telefoneFixo', 'cep', 'rua', 'bairro', 'numero', 'cidade', 'uf', 'login', 'senha', 'confirmarSenha'];
class UsuariosController  {
    constructor () {}

    getAll() {
        return usuarios
    }

	getById(id) {
		const user = usuarios.find((usuario) => usuario.id == id);
		return user || this.formatError('Usuário não encontrado');
	}

	createUser(user) {
		const doesNotHaveAllRequired = this.validateRequiredFields(Object.keys(user));
		if (doesNotHaveAllRequired) return doesNotHaveAllRequired;
		const id = usuarios.length > 0 ? usuarios[usuarios.length - 1 ]?.id + 1 : 1;
		usuarios.push( {...user, id });
		return user;
	}

	validateRequiredFields(fields = []) {
		const sent = fields.filter((field) => requiredFields.includes(field));
		return sent.length !== requiredFields.length ? this.formatError(`Campos obrigatórios não foram enviados`) : ""; 
	}

	formatError(message) {
		return {
			error: true,
			message,
		}
	}
}

module.exports = new UsuariosController();
