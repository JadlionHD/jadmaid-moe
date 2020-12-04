'use strict';

const childProcess = require('child_process');
// Version info, etc. can be found in package.json
const erisPackage = require('../node_modules/eris/package');

// Execute jsdoc, get the JSON output, parse it, and store it.
const rawDocsData = JSON.parse(childProcess
	.execSync('yarn --silent run jsdoc', {encoding: 'utf8', maxBuffer: Infinity})
	.replace(/^> [^\n]*/gm, m => console.log(m) || ''));
console.log();
// We'll clean up the info and write what we want here
const classes = [];
const constants = [];

// Helper: converts the prop/param format from jsdoc to an easier to work with
// format, broken out because it's used in a bunch of places
function paramPropMapper (param) {
	return {
		name: param.name,
		type: param.type.names.join(' | '),
		optional: param.optional,
		nullable: param.nullable,
		defaultvalue: param.defaultvalue,
		description: param.description,
	};
}

// Helper: converts the value from jsdoc to a more human-readable format
function constantValueMapper (value) {
	if (Array.isArray(value)) {
		if (value.length <= 6) {
			const divider = value.some(i => i.length > 5) ? '\n' : ' ';
			return `Values:${divider}\`${value.join(`\`,${divider}\``)}\``;
		}
		return `Values:\n\`${value.slice(0, 6).join('`,\n`')}\`\n...and ${value.length - 6} more.`;
	} else if (typeof value === 'number') {
		return `Value: ${value}`;
	}
	const keys = Object.keys(value);
	if (keys.length <= 6) {
		return keys.map(key => `\`${key}\` = \`${value[key]}\``).join('\n');
	}
	return `${keys
		.slice(0, 6)
		.map(key => `\`${key}\` = \`${value[key]}\``)
		.join('\n')}\n...and ${keys.length - 6} more.`;
}

// Loop over all the doclets
for (const doclet of rawDocsData) {
	// Discard undocumented things to get rid of duplicate info
	if (doclet.undocumented) {
		if (doclet.meta.filename !== 'Constants.js' || doclet.longname.includes('.')) continue;
		// Except for constants, we need those
		constants.push({
			name: doclet.name,
			display: `Constants#${doclet.name}`,
			value: constantValueMapper(JSON.parse(doclet.meta.code.value)),
		});
		continue;
	}
	// Parse all class-related data
	switch (doclet.kind) {
		case 'class': {
			const baseParams = doclet.params && doclet.params.filter(p => !p.name.includes('.')).map(paramPropMapper);
			const classObject = {
				name: doclet.name,
				display: doclet.longname,
				description: doclet.classdesc,
				augments: doclet.augments,
				params: baseParams,
				hasOptions: doclet.params && baseParams.length !== doclet.params.length,
				properties: doclet.properties && doclet.properties.map(paramPropMapper),
				methods: [],
				events: [],
			};
			// If we encountered methods/events for this class before the main
			// class info, merge those into the new object
			const existing = classes.find(c => c.name === classObject.name);
			if (existing) {
				// Create a copy of the existing peoperties and write them into
				// the class info we just added, then write it all to the
				// original object (this may be too clever)
				Object.assign(existing, classObject, {...existing});
			} else {
				classes.push(classObject);
			}
			break;
		}
		// Things that go on classes (properties come with the class itself)
		case 'function':
		case 'event':
		case 'member': {
			// For some reason events have 'properties' not 'params' in jsdoc,
			// this is stupid and we do not follow this
			const params = doclet.params || doclet.properties;
			const baseParams = params && params.filter(p => !p.name.includes('.')).map(paramPropMapper);
			const obj = {
				name: doclet.name,
				kind: doclet.kind,
				display: doclet.longname,
				description: doclet.description,
				params: baseParams,
				hasOptions: params && params.length !== baseParams.length,
				// I'm pretty sure this will always be an array of 1, but join
				// twice just to be safe. Also this will always be undefined
				// on events but DRY and it doesn't matter that much.
				returns: doclet.returns && doclet.returns.map(r => r.type.names.join(' | ')).join(', '),
			};
			// Find the class this method is attached to
			const classObj = classes.find(c => c.name === doclet.memberof);
			// Convert jsdoc reported kind to the appropriate method names defined above
			let category;
			switch (doclet.kind) {
				case 'function':
					category = 'methods';
					break;
				case 'member':
					category = 'properties';
					break;
				default:
					category = 'events';
			}
			if (classObj) {
				// Simply insert the new thing where it belongs
				classObj[category].push(obj);
			} else {
				// Create a placeholder classes object that will be merged
				// into the rest of the info when it's picked up (see above,
				// this may be too clever)
				classes.push({
					name: doclet.memberof,
					[category]: [obj],
				});
			}
			break;
		}
		// Other things we expicitly want to ignore
		case 'package': {
			break;
		}
		// If it's not identified, log a warning but ignore it
		default: {
			console.warn('Warning: Unknown doclet kind:', doclet.kind);
		}
	}
}

module.exports = {
	classes: classes.sort((a, b) => a.name.localeCompare(b.name)),
	constants,
};
