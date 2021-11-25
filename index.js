const vueTemplateCompiler = require("vue-template-compiler");
const babel = require("@babel/core");
const cheerio = require("cheerio");

function _compileTemplate(source, options, preCompile) {
  const $ = cheerio.load(source);
  const tpls = $("template[v-tpl]");
  const sections = $("template[v-tpl-use]");

  const tplsMap = [...tpls].reduce((obj, node) => {
    const attrs = node.attribs;
    const name = attrs["v-tpl"];
    const dataKey = attrs["v-tpl-data"];
    if (!name) {
      return obj;
    }

    obj[name] = {
      dataKey,
      html: $(node).html(), // 处理data,
      node,
    };

    return obj;
  }, {});

  [...sections].forEach((node) => {
    const attrs = node.attribs;
    const tplName = attrs["v-tpl-use"];
    if (!tplName) {
      return;
    }
    const curTpl = tplsMap[tplName];

    if (!curTpl) {
      return;
    }

    // 将对应模板内容插入到插槽，并设置插槽的v-tpl-data属性
    $(node).attr("v-tpl-data", curTpl.dataKey);
    $(node).html(`<div>${curTpl.html}</div>`);
  });

  const resultSource = $("body").html();

  const result = preCompile(resultSource, {
    ...options,
    modules: [
      ...options.modules,
      {
        // 处理插槽内节点的对应代码中使用的模板变量
        transformCode(node, code) {
          // 找parent，一直到<template v-tpl-use='xxx'>为止
          const findTplParent = (p) => {
            const parent = p.parent;
            if (
              !parent ||
              (parent.tag === "template" && parent.attrsMap["v-tpl"])
            ) {
              // 退出递归
              return null;
            }

            if (parent.tag === "template" && parent.attrsMap["v-tpl-use"]) {
              return parent;
            }

            return findTplParent(parent);
          };

          const parent = findTplParent(node);
          if (!parent) {
            return code;
          }

          const bindKey = parent.attrsMap["v-tpl-bind"];
          const dataKey = parent.attrsMap["v-tpl-data"];
          let hadChange = 0;
          const result = babel.transformSync(code, {
            configFile: false,
            minified: true,
            plugins: [
              function () {
                return {
                  visitor: {
                    Identifier(path) {
                      const node = path.node;

                      if (node.name === dataKey && node.key !== "property") {
                        node.name = bindKey;
                        hadChange = 1;
                      }
                    },
                  },
                };
              },
            ],
          });

          const _code = result.code.replace(/(.*);$/, "$1");

          return hadChange ? _code : code;
        },
      },
    ],
  });

  return result;
}

function getCompile(preCompile) {
  return function (source, options) {
    return _compileTemplate(source, options, preCompile);
  };
}

function getCompiler(preCompiler = vueTemplateCompiler) {
  const _preCompile = preCompiler.compile;
  const _preSsrCompile = preCompiler.ssrCompile;

  return {
    ...preCompiler,
    compile: getCompile(_preCompile),
    ssrCompile: getCompile(_preSsrCompile),
  };
}

module.exports = getCompiler;
