import fs from "fs";
import babel from "@babel/parser";
import traverse from "@babel/traverse";
import path from "path";
import ejs from "ejs";
import { transformFromAst } from "babel-core";
let id = 0;

function createAsset(filePath) {
  // 1、获取文件内容

  const source = fs.readFileSync(filePath, "utf-8");
  // console.log("%c Line:11 🍆 source", "color:#e41a6a", source);

  /**
   * 获取依赖关系
   * 1、正则 或者 ast 抽象语法树-- > bable/parser
   * 2、使用babel/traverse 遍历树
   */

  const ast = babel.parse(source, {
    sourceType: "module",
  });

  let deps = [];
  traverse.default(ast, {
    ImportDeclaration({ node }) {
      deps.push(node.source.value);
    },
	});
	const { code } = transformFromAst(ast, null, {
		presets: ['env']
	})
	
	console.log("%c Line:31 🍫 code", "color:#3f7cff", code);


  // console.log("%c Line:17 🍕 ast", "color:#ffdd4d", ast);
  return {
    filePath,
    code,
		deps,
		mapping: {},
    id: id++,
  };
}

// const asset = createAsset(filePath);
// console.log("%c Line:37 🥒 asset", "color:#ed9ec7", asset);

/**
 * 创建图数据结构
 */
function createGraph(entry) {
  console.log("%c Line:45 🌮 entry", "color:#ffdd4d", entry);
  const mainAsset = createAsset(entry);

  const queue = [mainAsset];

  for (const asset of queue) {
    asset.deps.forEach((relativePath) => {
      const child = createAsset(path.resolve("./example", relativePath));
			console.log("%c Line:52 🥪 child", "color:#42b983", child);
			asset.mapping[relativePath] = child.id;
      queue.push(child);
    });
  }
  return queue;
}

const resGraph = createGraph("./example/main.js");
console.log("%c Line:61 🍆 resGraph", "color:#b03734", resGraph);

/**
 * 构建图
 */
function buildGraph(graph) {
	const template = fs.readFileSync("./bundle.ejs", "utf-8");
	
	const data = graph.map((asset) => {
    const { id, code, mapping } = asset;
    return {
      id,
      code,
      mapping,
    };
  });
  //   console.log(data)
  const code = ejs.render(template, { data });
  console.log("%c Line:68 🍧 code", "color:#7f2b82", code);

  let outputPath = "./dist/bundle.js";
  const context = {
    changeOutputPath(path) {
      outputPath = path;
    },
  };
  hooks.emitFile.call(context);
  fs.writeFileSync(outputPath, code);
}

const res = buildGraph(resGraph);
console.log("%c Line:73 🥒 res", "color:#e41a6a", res);
