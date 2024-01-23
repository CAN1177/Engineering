import { jsonLoader } from "./jsonLoader.js";
const webpackConfig = {
  module: {
    rules: [
      {
        test: /\.json$/,
        use: [jsonLoader],
      },
    ],
  },
};

export default webpackConfig;
