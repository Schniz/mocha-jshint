var path = require('path');
var child_process = require('child_process');

module.exports = function (paths, args) {
  args = args || [];
  if (Promise) {
    args.push("--harmony");
  }

  describe('jsxhint', function () {
    paths = paths || ['.'];
    paths.forEach(function (p) {
      it('should pass for ' + (p === '.' ? 'working directory' : p), function () {
        this.timeout && this.timeout(30000);
        var pathToRun = path.resolve(p);
        var cliPath = path.join(path.dirname(require.resolve("jsxhint")), "cli.js");
        var jsxrun = child_process.spawnSync(cliPath, [pathToRun].concat(args)).stdout.toString();
        if (jsxrun.indexOf("error") !== -1) {
          throw new Error(jsxrun);
        }
      });
    });
  });
};
