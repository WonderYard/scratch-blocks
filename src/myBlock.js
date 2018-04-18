var workspace = null;

function getBlocksName() {
  var name=[['myself', 'ME']];
  if(workspace == null) return name;
  var a = workspace.getAllBlocks();
  for(var i = 0; i < a.length; i++) {
    if(a[i].type === "wy_state_defn" || a[i].type === "wy_state_defn_default") {
      var asd = Blockly.JavaScript.valueToCode(a[i], 'NAME', Blockly.JavaScript.ORDER_MEMBER) || "";
      name.push([asd, name.length]);
    }
  }
  return name;
}

function updateWorkspace() {
  if(workspace == null) return;
  var a = workspace.getAllBlocks();

  var stateSymbols = [["myself", "ME"]];
  for(var i = 0; i < a.length; i++) {
    if(a[i].type === "wy_state_defn" || a[i].type === "wy_state_defn_default") {
      var name = Blockly.JavaScript.valueToCode(a[i], 'NAME', Blockly.JavaScript.ORDER_MEMBER) || "";
      stateSymbols.push([name, stateSymbols.length]);
    }
  }

  console.log("stateSymbols", stateSymbols);

  for(var i = 0; i < a.length; i++) {
    if(a[i].type === "wy_rule_menu") {
      var field = a[i].getField("EVOLVE_TO");
      var found = false;
      var foundText = null;
      var value = field.getValue();
      console.log("start search for", value)
      for(var j = 0; j < stateSymbols.length; j++) {
        if(value === stateSymbols[j][1]) {
          found = true;
          foundText = stateSymbols[j][0];
          console.log(found)
          break;
        }
      }
      if(!found) {
        console.log("not found, setting to ME")
        field.setValue("ME");
        field.setText("myself")
      }
      else {
        field.setText(foundText)
      }
    }
  }
}

Blockly.Blocks['wy_state_defn'] = {
  init: function() {
    this.jsonInit({
      "id": "STATE_DEFN",
      "message0": "state %1",
      "message1": "color %1",
      "message2": "%1", // Statement
      "args0": [
        {
          "type": "input_value",
          "name": "NAME",
          "check": "String"
        }
      ],
      "args1": [
        {
          "type": "input_value",
          "name": "COLOR"
        }
      ],
      "args2": [
        {
          "type": "input_statement",
          "name": "RULE_LIST"
        }
      ],
      "category": "WonderYard",
      "extensions": ["colours_motion", "shape_hat"]
    });
  }
}

Blockly.Blocks['wy_state_defn_default'] = {
  init: function() {
    this.jsonInit({
      "id": "STATE_DEFN",
      "message0": "background state %1",
      "message1": "color %1",
      "message2": "%1", // Statement
      "args0": [
        {
          "type": "input_value",
          "name": "NAME",
          "check": "String"
        }
      ],
      "args1": [
        {
          "type": "input_value",
          "name": "COLOR"
        }
      ],
      "args2": [
        {
          "type": "input_statement",
          "name": "RULE_LIST"
        }
      ],
      "category": "WonderYard",
      "extensions": ["colours_motion", "shape_hat"]
    });
  }
}

var stateCount = null;

Blockly.JavaScript['wy_state_defn_default'] = function(block) {
  stateCount = 0;
  var name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_MEMBER) || "";
  return "// state " + name + "\n" +
  "case " + stateCount++ + ":\n" +
  (Blockly.JavaScript.statementToCode(block, 'RULE_LIST', Blockly.JavaScript.ORDER_MEMBER) || "  break;")
};

Blockly.JavaScript['wy_state_defn'] = function(block) {
  var name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_MEMBER) || "";
  return "// state " + name + "\n" +
  "case " + stateCount++ + ":\n" +
  (Blockly.JavaScript.statementToCode(block, 'RULE_LIST', Blockly.JavaScript.ORDER_MEMBER) || "  break;")
};

Blockly.JavaScript['text'] = function(block) {
  var code = block.getFieldValue("TEXT");
  return [code, null];
};

Blockly.JavaScript['math_number'] = function(block) {
  var code = block.getFieldValue("NUM") + "";
  return [code, null];
};

Blockly.JavaScript['colour_picker'] = function(block) {
  var code = block.getFieldValue("COLOUR")
  return [code, null];
};

Blockly.Blocks['wy_rule_menu'] = {
  /**
   * Point towards drop-down menu.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit(
      {
        "message0": "%1",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "EVOLVE_TO",
            "options": getBlocksName
          }
        ],
        "colour": Blockly.Colours.motion.secondary,
        "colourSecondary": Blockly.Colours.motion.secondary,
        "colourTertiary": Blockly.Colours.motion.tertiary,
        "extensions": ["colours_looks", "output_string"]
      });
  }
};

Blockly.JavaScript['wy_rule'] = function(block) {
  var evolve_to = Blockly.JavaScript.valueToCode(block, 'EVOLVE_TO', Blockly.JavaScript.ORDER_MEMBER) || stateCount - 1
  if(evolve_to === "ME") evolve_to = stateCount - 1;
  return "if(" + (Blockly.JavaScript.valueToCode(block, 'CONDITIONS', Blockly.JavaScript.ORDER_MEMBER) || "false") + ") return " + evolve_to + ";\n";
};

Blockly.JavaScript['wy_rule_menu'] = function(block) {
  var code = block.getFieldValue("EVOLVE_TO")
  return [code, null];
};

Blockly.Blocks['wy_condition_menu'] = {
  /**
   * Point towards drop-down menu.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit(
      {
        "message0": "%1",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "REF",
            "options": getBlocksName
          }
        ],
        "colour": Blockly.Colours.motion.secondary,
        "colourSecondary": Blockly.Colours.motion.secondary,
        "colourTertiary": Blockly.Colours.motion.tertiary,
        "extensions": ["colours_operators", "output_string"]
      });
  }
};

Blockly.JavaScript['wy_condition_menu'] = function(block) {
  var ref = block.getFieldValue("REF")
  if(ref === "ME") return null
  return [ref, null];
};

Blockly.Blocks['wy_rule'] = {
  init: function () {
    this.jsonInit({
      "id": "RULE_LIST",
      "message0": "to %1",
      "message1": "when %1",
      "args0": [
        {
          "type": "input_value",
          "name": "EVOLVE_TO"
        }
      ],
      "args1": [
        {
          "type": "input_value",
          "name": "CONDITIONS",
          "check": "Boolean"
        }
      ],
      "category": "WonderYard",
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
}

Blockly.Blocks['wy_condition_between'] = {
  init: function() {
    this.jsonInit({
      "id": "CONDITION_BETWEEN",
      "message0": "%1",
      "message1": "between %1",
      "message2": "and %1",
      "args0": [
        {
          "type": "input_value",
          "name": "REF"
        }
      ],
      "args1": [
        {
          "type": "input_value",
          "name": "MIN"
        }
      ],
      "args2": [
        {
          "type": "input_value",
          "name": "MAX"
        }
      ],
      "category": "WonderYard",
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
}

Blockly.JavaScript['wy_condition_between'] = function(block) {
  var ref = Blockly.JavaScript.valueToCode(block, 'REF', Blockly.JavaScript.ORDER_MEMBER) || stateCount - 1;
  var min = Blockly.JavaScript.valueToCode(block, 'MIN', Blockly.JavaScript.ORDER_MEMBER) || "0";
  var max = Blockly.JavaScript.valueToCode(block, 'MAX', Blockly.JavaScript.ORDER_MEMBER) || "+Infinity";
  return [`nbhd[${ref}] >= ${min} && nbhd[${ref}] <= ${max}`, null];
};

Blockly.Blocks['wy_condition_between_custom_nbhd'] = {
  init: function() {
    this.jsonInit({
      "id": "CONDITION_BETWEEN",
      "message0": "%1",
      "message1": "between %1",
      "message2": "and %1",
      "message3": "in %1",
      "args0": [
        {
          "type": "input_value",
          "name": "REF"
        }
      ],
      "args1": [
        {
          "type": "input_value",
          "name": "MIN"
        }
      ],
      "args2": [
        {
          "type": "input_value",
          "name": "MAX"
        }
      ],
      "args3": [
        {
          "type": "field_dropdown",
          "name": "IN_NBHD",
          "options": [
            ["Moore", "MOORE"],
            ["Von Neumann", "VON_NEUMANN"]
          ]
        }
      ],
      "category": "WonderYard",
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
}

Blockly.Blocks['wy_true_constant'] = {
  init: function() {
    this.jsonInit({
      "id": "BOOLEAN_TRUE",
      "message0": "true",
      "category": "WonderYard",
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
}

Blockly.JavaScript['wy_true_constant'] = function(block) {
  return ["true", null];
}
