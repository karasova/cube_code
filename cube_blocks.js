Blockly.Blocks['start'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("start");
      this.setInputsInline(false);
      this.setNextStatement(true, null);
      this.setColour(0);
   this.setTooltip("");
   this.setHelpUrl("");
    }
};

Blockly.Python['start'] = function(block) {
    var code = 'import serial\nimport numpy as np\n';
    return code;
};

Blockly.Blocks['port_activate'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("activate port")
          .appendField(new Blockly.FieldDropdown([["3","COM3"], ["4","COM4"], ["6","COM6"]]), "port_number");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(0);
   this.setTooltip("");
   this.setHelpUrl("");
    }
};

Blockly.Python['port_activate'] = function(block) {
    var dropdown_port_number = block.getFieldValue('port_number');
    var code = "ser = serial.Serial(\'" + dropdown_port_number +"\', 9600)\n";
    return code;
};

Blockly.Blocks['third_array'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("set array:")
          .appendField(new Blockly.FieldVariable("item"), "NAME")
          .appendField(new Blockly.FieldNumber(0, 1, 3), "x")
          .appendField("layers")
          .appendField(new Blockly.FieldNumber(0, 1, 3), "y")
          .appendField("cols")
          .appendField(new Blockly.FieldNumber(0, 0, 3), "z")
          .appendField("rows")
          .appendField("filled with")
          .appendField(new Blockly.FieldDropdown([["zeros","zeros"], ["ones","ones"]]), "array_fill");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(0);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

Blockly.Python['third_array'] = function(block) {
    var variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    var number_x = block.getFieldValue('x');
    var number_y = block.getFieldValue('y');
    var number_z = block.getFieldValue('z');
    var dropdown_array_fill = block.getFieldValue('array_fill');
    if (number_x == 1) {
        if (number_z != 0) {
            if (dropdown_array_fill == "zeros") {
                var code = variable_name + ' = np.zeros((' +  number_y + ', ' + number_z + '), dtype = np.int8)\n';
            }
            if (dropdown_array_fill == "ones") {
                var code = variable_name + ' = np.ones((' +  number_y + ', ' + number_z + '), dtype = np.int8)\n';
            }
        }
        else {
            if (dropdown_array_fill == "zeros") {
                var code = variable_name + ' = np.zeros(' +  number_y +  ', dtype = np.int8)\n';
            }
            if (dropdown_array_fill == "ones") {
                var code = variable_name + ' = np.ones(' +  number_y +  ', dtype = np.int8)\n';
            }
        }
    }
    else {
        if (dropdown_array_fill == "zeros") {
            var code = variable_name + ' = np.zeros((' + number_x + ', ' + number_y + ', ' + number_z + '), dtype = np.int8)\n';
        }
        if (dropdown_array_fill == "ones") {
            var code = variable_name + ' = np.ones((' + number_x + ', ' + number_y + ', ' + number_z + '), dtype = np.int8)\n';
        }
    }   
    return code;
};

Blockly.Blocks['show_array'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("send")
          .appendField(new Blockly.FieldVariable("item"), "array_name")
          .appendField("to cube");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(0);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Python['show_array'] = function(block) {
    var variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('array_name'), Blockly.Variables.NAME_TYPE);
    
    var code = 'if item.shape != (3, 3, 3):\n\tarray = np.zeros((3,3,3), dtype = np.int8)\n\tif item.ndim == 3:\n\t\tarray [:item.shape[0], :item.shape[1], :item.shape[2]] = item\n\telif item.ndim == 2:\n\t\tarray [0, :item.shape[0], :item.shape[1]] = item\n\telif item.ndim == 1:\n\t\tarray [0, 0, :item.shape[0]] = item\n\titem = array\nstring = np.array2string(' + variable_name + ', separator=\'\').replace("[", "").replace("]", "").replace("\\n", "").replace(" ", "") + \'\\n\'\nstring = string.encode("utf-8")\nwhile True:\n\tser.write(string)\n';
    return code;
  };

  Blockly.Blocks['set_array'] = {
    init: function() {
      this.appendValueInput("NAME")
          .setCheck("Number")
          .appendField("set")
          .appendField(new Blockly.FieldVariable("item"), "item_name")
          .appendField("layer")
          .appendField(new Blockly.FieldVariable("item"), "layer")
          .appendField("col")
          .appendField(new Blockly.FieldVariable("item"), "col")
          .appendField("row")
          .appendField(new Blockly.FieldVariable("item"), "row")
          .appendField("to");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(285);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Python['set_array'] = function(block) {
    var variable_item_name = Blockly.Python.variableDB_.getName(block.getFieldValue('item_name'), Blockly.Variables.NAME_TYPE);
    var variable_layer = Blockly.Python.variableDB_.getName(block.getFieldValue('layer'), Blockly.Variables.NAME_TYPE);
    var variable_col = Blockly.Python.variableDB_.getName(block.getFieldValue('col'), Blockly.Variables.NAME_TYPE);
    var variable_row = Blockly.Python.variableDB_.getName(block.getFieldValue('row'), Blockly.Variables.NAME_TYPE);
    var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
    
    var code = variable_item_name + '[' + variable_layer + ', ' + variable_col + ', ' + variable_row + '] = ' + value_name+'\n';
    return code;
  };