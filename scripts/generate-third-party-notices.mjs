import * as fsPromises from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

function getPath(dependency) {
  const regex = /\.{2,}\//;

  if (regex.test(dependency)) {
    throw new Error(
      `Argument 'dependency' may not contain relative paths.\nValue is '${dependency}'`
    );
  }

  const dependencyPath = path.resolve(`./node_modules/${dependency}/`);

  return dependencyPath;
}

async function getPluginLicense(dependencyPath) {
  try {
    const licenseText = await fsPromises.readFile(
      path.join(dependencyPath, 'LICENSE'),
      {
        encoding: 'utf8',
      }
    );

    const licenseTextParts = licenseText.split(/\r?\n/).map((line) => {
      return line
        .replace(/^\s*#+\s*/, '')
        .replace(/^\s*>\s*/, '')
        .trim();
    });

    return licenseTextParts.join('\n');
  } catch (error) {
    console.error(
      `[generate-third-party-notices.getPluginMetadata()] ${error.message}`
    );
  }
}

async function getPluginMetadata(dependencyPath) {
  try {
    const dependencyPackageJSON = await fsPromises.readFile(
      path.join(dependencyPath, 'package.json'),
      {
        encoding: 'utf8',
      }
    );

    const packageJSON = JSON.parse(dependencyPackageJSON);
    const { name, version, description, license, repository } = packageJSON;
    const repositoryURL =
      typeof repository === 'string' ? repository : `${repository.url}`;
    const repositoryURLNormalized = repositoryURL
      .replace(/^git\+/i, '')
      .replace(/^git:\/\//i, 'https://')
      .replace(/\.git$/i, '');

    const dependencyRepositoryURL = repositoryURLNormalized.startsWith('http')
      ? repositoryURLNormalized
      : `https://github.com/${repositoryURLNormalized}`;

    return { name, version, description, license, dependencyRepositoryURL };
  } catch (error) {
    console.error(
      `[generate-third-party-notices.getPluginMetadata()] ${error.message}`
    );
  }
}

async function generateThirdPartyNotices() {
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const packageJsonString = await fsPromises.readFile(
      path.resolve(__dirname, '..', 'package.json'),
      {
        encoding: 'utf8',
      }
    );
    const packageJson = JSON.parse(packageJsonString);
    const allDependencies = Object.keys({
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    });

    const outputParts = [];

    for await (const dependency of allDependencies) {
      const textParts = [];

      const dependencyPath = getPath(dependency);
      const { name, version, description, license, dependencyRepositoryURL } =
        await getPluginMetadata(dependencyPath);

      textParts.push(`## ${name}`);
      textParts.push(`version: ${version}`);
      textParts.push(`license: ${license}`);
      textParts.push(`description: ${description}`);
      textParts.push(`URL: ${dependencyRepositoryURL}`);

      const licenseText = await getPluginLicense(dependencyPath);

      textParts.push(`\n\n${licenseText}\n`);

      outputParts.push(textParts.join('\n'));
    }

    await fsPromises.writeFile(
      './THIRD-PARTY-LICENSES.md',
      outputParts.join('\n'),
      { encoding: 'utf-8' }
    );
  } catch (error) {
    console.error(
      `[generate-third-party-notices.generateThirdPartyNotices()] ${error.message}`
    );
  }
}

generateThirdPartyNotices();
