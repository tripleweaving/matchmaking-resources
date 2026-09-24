// Build the site and publish dist/ to the gh-pages branch, which GitHub Pages serves.
// Usage: npm run deploy
import { execSync } from "node:child_process"
import { writeFileSync, rmSync, existsSync } from "node:fs"
import { join } from "node:path"

const REMOTE = "https://github.com/tripleweaving/matchmaking-resources.git"
const run = (cmd, cwd) => execSync(cmd, { cwd, stdio: "inherit" })

run("npm run build")
const dist = join(process.cwd(), "dist")
writeFileSync(join(dist, ".nojekyll"), "")
if (existsSync(join(dist, ".git"))) rmSync(join(dist, ".git"), { recursive: true, force: true })
run("git init -q", dist)
run("git checkout -q -b gh-pages", dist)
run("git add -A", dist)
run(`git -c user.name=deploy -c user.email=deploy@users.noreply.github.com commit -q -m "Deploy site"`, dist)
run(`git push -f -q ${REMOTE} gh-pages`, dist)
rmSync(join(dist, ".git"), { recursive: true, force: true })
console.log("Deployed to https://tripleweaving.github.io/matchmaking-resources/")
