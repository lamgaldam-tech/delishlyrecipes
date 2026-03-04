import { exec } from "child_process";
import fs from "fs";

const repo = process.env.GITHUB_REPO!;

function runGitCommand(cmd: string) {
  return new Promise<string>((resolve, reject) => {
    console.log(`\nRunning: ${cmd}`);
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) console.error(`stderr: ${stderr}`);
      if (stdout) console.log(`stdout: ${stdout}`);
      resolve(stdout);
    });
  });
}

function ensureFolder(folder: string) {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
}

async function setupGit(branch: string) {
  await runGitCommand('git config user.name "Delishly Recipes Bot"');
  await runGitCommand('git config user.email "bot@delishlyrecipes.com"');
  await runGitCommand(`git checkout -B ${branch}`);
  await runGitCommand("git remote remove origin || true");
  await runGitCommand(`git remote add origin ${repo}`);
}

export async function syncDB(publicFolder = "public", dataFolder = "data") {
  try {
    ensureFolder(publicFolder);
    ensureFolder(dataFolder);

    await setupGit("main");

    await runGitCommand(`git add -A ${publicFolder} ${dataFolder}`);
    await runGitCommand(
      'git commit -m "sync: update public assets and recipes" || echo "nothing to commit"',
    );
    await runGitCommand("git push -u origin main --force");

    console.log("DB (public + data) synced successfully!");
  } catch (err) {
    console.error("DB sync failed:", err);
    throw err;
  }
}

export async function syncClient(clientFolder = "client") {
  try {
    ensureFolder(clientFolder);

    await setupGit("main");

    await runGitCommand(`git add -A ${clientFolder}`);
    await runGitCommand(
      'git commit -m "sync: update client folder" || echo "nothing to commit"',
    );
    await runGitCommand("git push -u origin main --force");

    console.log("Client folder synced successfully!");
  } catch (err) {
    console.error("Client sync failed:", err);
    throw err;
  }
}