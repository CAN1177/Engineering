export class ChangeOutputPath {


  apply(hooks) {
    hooks.emitFile.tap("changeOutputPath", (context) => {
			console.log("%c Line:6 🍏 changeOutputPath", "color:#93c0a4", '90909000');
      context.changeOutputPath("./dist/21silva.js")
    });
  }
}