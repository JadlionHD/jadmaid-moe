'use strict';

// Docs data is parsed from jsdoc directly
const {classes, constants} = require('../../misc/docs_parse.js');
const erisPackage = require('../../node_modules/eris/package');
const memberCategories = ['properties', 'methods', 'events'];

const embedDefaults = {
	color: 0xC0C0C0,
	footer: {
		text: `Docs generated from eris@${erisPackage.version} | j!docs Class#property`,
	},
};

function linkTo (classname, doclet, kind) {
	if (doclet) {
		const memberType = doclet.kind || kind;
		if (memberType) {
			return `https://abal.moe/Eris/docs/${classname}#${memberType}-${doclet.name}`;
		}
	}
	return `https://abal.moe/Eris/docs/${classname}`;
}

function paramList (thing, url) {
	let string = thing.params && thing.params
		.map(param => `**\`${param.name}\`** (${param.type}${param.optional ? ', optional' : ''})\n${param.description}${param.defaultvalue ? `\nDefault: \`${param.defaultvalue}\`` : ''}`)
		.join('\n\n');
	if (thing.hasOptions) {
		string += `\n\nCheck the [full documentation](${url}) for properties on passed objects.`;
	}
	return string;
}

// Message formatting functions
function formatConstant (constant) {
	return {
		content: 'Docs: https://abal.moe/Eris/docs/reference',
		embed: {
			...embedDefaults,
			description: constant.value,
			title: constant.display,
		},
	};
}
function formatClass (docsClass) {
	const url = linkTo(docsClass.name);
	return {
		content: `Docs: <${url}>`,
		embed: {
			...embedDefaults,
			title: docsClass.name,
			url,
			description: docsClass.description,
			fields: [
				{
					name: 'Constructor Params',
					value: paramList(docsClass, url),
				},
				...memberCategories.map(category => {
					const categoryData = docsClass[category];
					return categoryData && {
						name: `${categoryData.length} ${category}`,
						value: categoryData.slice(0, 5).map(item => item.name).join('\n'),
						inline: true,
					};
				}),
			].filter(f => f && f.value), // Remove undefined/valueless fields
		},
	};
}
function formatMethodOrEvent (doclet) {
	const classname = doclet.display.replace(/#.*/, '');
	const url = linkTo(classname, doclet);
	const message = {
		content: `Docs: <${url}>`,
		embed: {
			...embedDefaults,
			title: `\`${doclet.display}\``,
			description: doclet.description,
			url,
			fields: [
				{
					name: 'Return Type',
					value: doclet.returns && `\`${doclet.returns}\``,
				},
				{
					name: 'Parameters',
					value: paramList(doclet, url),
				},
			].filter(f => f && f.value),
		},
	};
	return message;
}
function formatProperty (classname, property) {
	const url = linkTo(classname, property, 'property');
	return {
		content: `Docs: <${url}>`,
		embed: {
			...embedDefaults,
			title: `${classname}#${property.name}`,
			url,
			description: property.description,
			fields: [
				{
					name: 'Type',
					value: property.type,
				},
			].filter(f => f && f.value),
		},
	};
}
function formatCategory (docsClass, docsItem) {
	if (docsItem.kind) {
		return formatMethodOrEvent(docsItem);
	}
	return formatProperty(docsClass.name, docsItem);
}


// Handle multiple results
function handleResults (results) {
	if (results.length === 1) {
		return formatCategory(results[0].cls, results[0].item);
	} else if (results.length <= 6) {
		return {
			content: 'Docs: https://abal.moe/Eris/docs',
			embed: {
				...embedDefaults,
				description: results.map(result => {
					if (result.item.kind) {
						return `[\`${result.item.display}\`](${linkTo(result.cls.name, result.item)})`;
					}
					return `[\`${result.cls.name}#${result.item.name}\`](${linkTo(result.cls.name, result.item, 'property')})`;
				}).join(', '),
				title: 'Multiple Results Found',
			},
		};
	}
	return {
		content: 'Docs: https://abal.moe/Eris/docs',
		embed: {
			...embedDefaults,
			description: `\`${results.slice(0, 6).map(result => result.item.display).join('`, `')}\`, and ${results.length - 6} more.`,
			title: 'Multiple Results Found',
		},
	};
}


exports.run = (client, msg, args) => {
	const owners = client.config.ownerID.forEach(async(owner) => {
		if(msg.author.id !== owner) return;
	})
	const [classname, search] = args.join(' ').split(/[#. ]/);
	if (!classname) {
		return msg.channel.createMessage({
			content: 'Docs: https://abal.moe/Eris/docs',
			embed: {
				...embedDefaults,
				description: classes.map(cls => `[${cls.name}](${linkTo(cls.name)})`).join(', '),
				title: 'Classes',
			},
		}).catch(console.error);
	} else if (classname.toLowerCase().startsWith('constants')) {
		if (!search) {
			return msg.channel.createMessage({
				content: 'Docs: https://abal.moe/Eris/docs/reference',
				embed: {
					...embedDefaults,
					description: `\`${constants.map(constant => constant.name).join('`, `')}\``,
					title: 'Constants',
				},
			}).catch(console.error);
		}

		const docsItem = constants.find(constant => constant.name.toLowerCase() === search.toLowerCase());
		if (docsItem) {
			return msg.channel.createMessage(formatConstant(docsItem)).catch(console.error);
		}
		return msg.channel.createMessage({
			embed: {
				...embedDefaults,
				description: `Couldn't find constant ${classname}.`,
			},
		}).catch(console.error);
	}
	const docsClass = classes.find(cls => cls.name.toLowerCase() === classname.toLowerCase());
	if (!docsClass) {
		let items = constants.find(constant => constant.name.toLowerCase() === classname.toLowerCase());
		if (items) {
			return msg.channel.createMessage(formatConstant(items)).catch(console.error);
		}
		items = [];
		for (const cls of classes) {
			for (const category of memberCategories) {
				const item = cls[category] && cls[category].find(i => i.name.toLowerCase() === classname.toLowerCase());
				if (item) items.push({cls, item}); // push to the list of matches
			}
		}
		if (items.length) {
			return msg.channel.createMessage(handleResults(items)).catch(console.error);
		}
		return msg.channel.createMessage({
			embed: {
				...embedDefaults,
				description: `Couldn't find anything matching '${classname}'.`,
			},
		}).catch(console.error);
	} else if (!search) {
		return msg.channel.createMessage(formatClass(docsClass));
	}
	const items = [];
	for (const category of memberCategories) {
		const item = docsClass[category] && docsClass[category].find(thing => thing.name.toLowerCase() === search.toLowerCase());
		if (item) items.push({cls: docsClass, item}); // push to the list of matches
	}
	if (!items.length) {
		return msg.channel.createMessage({
			embed: {
				...embedDefaults,
				description: `Couldn't find '${search}' on class ${docsClass.name}`,
			},
		}).catch(console.error);
	}
	msg.channel.createMessage(handleResults(items)).catch(console.error);
}

exports.help = {
  cooldown: 3,
  ratelimit: 1,
  userPerms: [],
  clientPerms: [],
  description: "Docs of eris module",
  usage: `j!docs [argument]`,
  example: `j!docs Client#createMessage`,
  aliases: []
}