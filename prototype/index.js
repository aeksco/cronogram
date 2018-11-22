const fs = require('fs');
const _ = require('lodash');
const intercept = require("intercept-stdout")
const { NodeVM, VMScript } = require('vm2')


let captured_text = ""
const unhook_intercept = intercept((txt) => {
  captured_text += txt
})

const vm = new NodeVM({
    require: {
        external: true
    },
    // console: 'redirect'
    console: 'inherit'
});

// Testing environment separation
process.env.PARENT = 'THIS IS PARENT'

const script = fs.readFileSync('./script.js', 'utf-8')

try {

    vm.run(script, 'vm.js');
    unhook_intercept()

    // console.log('OUTPUT???')
    // console.log(captured_text)

    // console.log('PARENT')
    // console.log(process.env.PARENT)

    console.log("\n")
    console.log("\n")
    console.log(captured_text)
    console.log("\n")
    console.log("\n")

    // var vmScript = new VMScript(script).compile();
} catch (err) {
    console.error('Failed to compile script.', err);
}

// try {
//     // vm.run(vmScript);
// } catch (err) {
//     console.error('Failed to execute script.', err);
// }
