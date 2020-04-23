#! /usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const dayjs = require('dayjs');
const child_process = require('child_process');
const appJson = require('./app.json');

const registry_map = {
  taobao: 'https://registry.npm.taobao.org/',
  origin: 'https://registry.npmjs.org/',
  default: 'https://registry.npmjs.org/'
};

program
  .command('use [name]')
  .description('switch npm registry between npm and taobao')
  .action(function (name) {
    const registry = registry_map[name] || registry_map.default;

    child_process.exec(`npm config set registry ${registry}`, function (err, stdout) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(chalk.green(`npm registry switch to ${registry} succeed!`));
    });
  });

program
  .command('current [name] <age>')
  .action(function (name, age) {
    console.log(name, age);
  });


program
  .command('open [app]')
  .description('open app for convinience by app brief name')
  .action(function (app) {
    app = appJson[app];
    if (!app) {
      console.log(chalk.red('app not found! should type in right name'));
      return;
    }
    child_process.exec(`open -a ${app}`, function (err, _) {
      if (err) {
        console.error(err);
        return;
      }
    });
  });

program
  .command('now')
  .description('show now date and timestamp')
  .action(function() {
    child_process.exec( `date "+%Y-%m-%d %H:%M:%S %s"`, function(err, stdout) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(chalk.green('now time is ', stdout));
    });
  });

program
.command('sec <seconds>')
.description('get date format for seconds')
.action(function(seconds) {
  console.log(`${seconds} time is `, chalk.cyan(dayjs.unix(seconds).format('YYYY-MM-DD HH:mm:ss')));
});

program
.command('date [date]')
.description('get seconds format for date')
.action(function(date) {
  console.log(`${date} seconds is `, chalk.cyan(dayjs(date).unix()));
});


program.parse(process.argv);
