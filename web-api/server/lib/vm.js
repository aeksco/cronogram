const { NodeVM } = require('vm2')

function run({ script, cronogram }) {

  const vmScript = script

  const vm = new NodeVM({
      require: {
          external: true
      },
      console: 'inherit'
  });

  try {

      // Runs the script
      sandboxCallback = vm.run(vmScript, 'vm.js')

      // Handles async
      sandboxCallback(cronogram)

  } catch (err) {
      console.error('Failed to compile script.', err);
      // TODO - throw error
  }

}

module.exports = {
    run
}
