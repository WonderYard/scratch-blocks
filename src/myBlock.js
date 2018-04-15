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
          "name": "NAME"
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
            "options": [
              ['myself', 'ME'],
              ['Alive', '0'],
              ['Dead', '1']
            ]
          }
        ],
        "colour": Blockly.Colours.motion.secondary,
        "colourSecondary": Blockly.Colours.motion.secondary,
        "colourTertiary": Blockly.Colours.motion.tertiary,
        "extensions": ["colours_looks", "output_string"]
      });
  }
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
            "name": "EVOLVE_TO",
            "options": [
              ['myself', 'ME'],
              ['Alive', '0'],
              ['Dead', '1']
            ]
          }
        ],
        "colour": Blockly.Colours.motion.secondary,
        "colourSecondary": Blockly.Colours.motion.secondary,
        "colourTertiary": Blockly.Colours.motion.tertiary,
        "extensions": ["colours_operators", "output_string"]
      });
  }
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

Blockly.Blocks['wy_test'] = {
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "input_value",
          "name": "TEST_FIELD",
        }
      ],
      "category": "WonderYard",
      "extensions": ["colours_motion", "output_string"]
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
