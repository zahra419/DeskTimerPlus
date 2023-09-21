import path from 'path';
import { spawn, spawnSync } from 'child_process';
import os from 'node:os';
import { Builder,Capabilities } from 'selenium-webdriver';


// create the path to the expected application binary
const __dirname=path.resolve()
const application = path.resolve(
  __dirname,
  '..',
  '..',
  '..',
  'target',
  'release',
  'timer'
)

// keep track of the webdriver instance we create
let driver

// keep track of the tauri-driver process we start
let tauriDriver

before(async function () {
  // set timeout to 2 minutes to allow the program to build if it needs to
  this.timeout(120000)

  // ensure the program has been built
  spawnSync('cargo', ['build', '--release'])

  // start tauri-driver
  tauriDriver = spawn(
    path.resolve(os.homedir(), '.cargo', 'bin', 'tauri-driver'),
    [],
    { stdio: [null, process.stdout, process.stderr] }
  )

  const capabilities = new Capabilities()
  capabilities.set('tauri:options', { application })
  capabilities.setBrowserName('wry')

  // start the webdriver client
  //4445
  driver = await new Builder()
    .withCapabilities(capabilities)
    .usingServer('http://localhost:4445/')
    .build()
})

after(async function () {
  // stop the webdriver session
  await driver.quit()

  // kill the tauri-driver process
  tauriDriver.kill()
})

