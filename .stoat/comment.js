let output = `### Pip Freeze Diffs

<table>
  <tr>
    <th></th>
    <th><img alt="Postgres 13" src="https://shields.io/badge/13-white?labelColor=4169E1&logo=postgresql&logoColor=white&style=plastic" /></th>
    <th><img alt="Postgres 14" src="https://shields.io/badge/14-white?labelColor=4169E1&logo=postgresql&logoColor=white&style=plastic" /></th>
    <th><img alt="Sqlite 3" src="https://shields.io/badge/3-white?labelColor=003B57&logo=sqlite&logoColor=white&style=plastic" /></th>
  </tr>
`;

const pythonImage = (version) => `<img alt="Python ${version}" src="https://shields.io/badge/${version}-white?labelColor=3776AB&logo=python&logoColor=white&style=plastic" />`;
const variants = plugins.static_hosting.pip_freeze.variants;

["3.7", "3.8", "3.9", "3.10", "3.11"].forEach(pythonVersion => {
	output += `<tr><td>${pythonImage(pythonVersion)}</td>`;

	["postgres:13", "postgres:14", "sqlite"].forEach(database => {
		const defaultKey = Object.keys(variants).find(key => 
			key.includes(`database: ${database}`) &&
			key.includes(`python-version: ${pythonVersion}`) &&
			key.includes(`--exclude-services`)
		);
		const servicesKey = Object.keys(variants).find(key => 
			key.includes(`database: ${database}`) &&
			key.includes(`python-version: ${pythonVersion}`) &&
			!key.includes(`--exclude-services`)
		);

		const defaultValue = defaultKey ? `<a href="https://stoat.dev/diffs/github?ghOwner=stoat-dev&ghRepo=prefect&ghBranch=${metadata.github.branch}&ghPullRequest=${metadata.github.pull_request}&ghDefaultBranch=main&files=pip_freeze&variant=${btoa(defaultKey)}">default</a>` : "default";
		const servicesValue = servicesKey ? `<a href="https://stoat.dev/diffs/github?ghOwner=stoat-dev&ghRepo=prefect&ghBranch=${metadata.github.branch}&ghPullRequest=${metadata.github.pull_request}&ghDefaultBranch=main&files=pip_freeze&variant=${btoa(servicesKey)}">services</a>` : "services";

		output += `<td>${defaultValue} &bull; ${servicesValue}</td>`
	});

	output += `</tr>`;
});

output += '</table>';
