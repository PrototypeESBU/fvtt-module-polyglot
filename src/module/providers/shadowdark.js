import LanguageProvider from "./templates/Base.js";

export default class shadowdarkLanguageProvider extends LanguageProvider {
	languages = {
		Celestial: {
			font: "Celestial",
		},
		Common: {
			font: "Thorass",
		},
		Diabolic: {
			font: "Barazhad",
		},
		Draconic: {
			font: "Dragon Alphabet",
		},
		Dwarvish: {
			font: "Floki",
		},
		Elvish: {
			font: "Espruar",
		},
		Giant: {
			font: "Davek",
		},
		Goblin: {
			font: "Iokharic",
		},
		Merran: {
			font: "High Drowic",
		},
		Orcish: {
			font: "Dethek",
		},
		Primordial: {
			font: "Infernal",
		},
		Reptilian: {
			font: "Thassilonian",
		},
		Sylvan: {
			font: "Rellanic",
		},
		Thanian: {
			font: "Olde Thorass",
		},
	};

	async getLanguages() {
		if (this.replaceLanguages) {
			this.languages = {};
			return;
		}
		const languagesSetting = game.settings.get("polyglot", "Languages");
		const languages = await shadowdark.compendiums.languages();
		languages.forEach((lang) => {
			this.languages[lang.name] = {
				label: lang.name,
				font: languagesSetting[lang.name]?.font || this.languages[lang.name]?.font || this.defaultFont,
				rng: languagesSetting[lang.name]?.rng ?? "default",
			};
		});
	}

	getUserLanguages(actor) {
		let knownLanguages = new Set();
		let literateLanguages = new Set();
		for (let lang of actor.system.languages) {
			let langObj = fromUuidSync(lang);
			knownLanguages.add(langObj.name);
		}
		return [knownLanguages, literateLanguages];
	}
}
