import m from "mithril";
import "./style.css";

const state = {
  input: "food for thought",
  rules: [
    {
      match: "foo(.+)",
      replace: `bar($1)`
    }
  ]
};

const ruleUi = rule =>
  m("div.rule", [
    m("textarea.match", {
      placeholder: "match",
      value: rule.match,
      oninput: m.withAttr("value", value => {
        rule.match = value;
      })
    }),
    m("textarea.replace", {
      placeholder: "replace",
      value: rule.replace,
      oninput: m.withAttr("value", value => {
        rule.replace = value;
      })
    }),
    m(
      "button",
      {
        onclick: () => {
          state.rules = state.rules.filter(r => r !== rule);
        }
      },
      "remove"
    )
  ]);

const execute = state => {
  let text = state.input;
  state.rules.forEach(rule => {
    if (!rule.match) return;
    const matchRe = new RegExp(rule.match, "gm");
    text = text.replace(matchRe, rule.replace);
  });
  return text;
};

const view = () => {
  return m("main", [
    m("textarea#input", {
      value: state.input,
      placeholder: "input",
      oninput: m.withAttr("value", value => {
        state.input = value;
      })
    }),
    m("div#rules", [
      m(
        "button",
        {
          onclick: () => {
            state.rules.push({ match: "", replace: "" });
          }
        },
        "add rule"
      ),
      state.rules.map(ruleUi)
    ]),
    m("textarea#output", {
      value: execute(state),
      readonly: true
    })
  ]);
};

m.mount(document.body, { view });
