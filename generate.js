// Generate a new Petmigos' module

function uc(moduleName) {
  console.log(`Generating a new use case with name '${moduleName}'...`);
}

function service(moduleName) {
  console.log(`Generating a new service with name '${moduleName}'...`);
}

function entity(moduleName) {
  console.log(`Generating a new entity with name '${moduleName}'...`);
}

function route(moduleName) {
  console.log(`Generating a new route with name '${moduleName}'...`);
}

function main() {
  const commands = {
    uc,
    service,
    entity,
    route,
  };
  const command = process.argv[2];
  const moduleName = process.argv[3];
  commands[command]?.(moduleName);
}

main();
