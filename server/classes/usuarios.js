
class Usuarios {
	constructor() {
		this.personas = [];
	}

	// *************************************************************
	// *** 								'Add Persona'    					     				 ***
	// *************************************************************

	agregarPersona(id, nombre, sala) {
		let persona = { id, nombre, sala};
		this.personas.push(persona);
		return this.personas;
	}

	// *************************************************************
	// *** 								'Get Persona'    					     				 ***
	// *************************************************************

	getPersona(id) {
		let persona = this.personas.filter(persona => persona.id === id)[0];
		return persona;
	}

	// *************************************************************
	// *** 								'Get all Personas'    					     				 ***
	// *************************************************************

	getPersonas() {
		return this.personas;
	}

	getPersonaPorSala(sala) {
		let personasBySala = this.personas.filter(persona => persona.sala === sala);
		return personasBySala;
	}

	borrarPersona(id) {
		let personaBorrada = this.getPersona(id);
		this.personas = this.personas.filter(persona=> persona.id !== id);
		return personaBorrada;
	}

}


module.exports = {
	Usuarios
}