import React, { useState } from 'react'
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

export const DropdownModal = ({ label, options, selectedValue, onValueChange }) => {
  const [visible, setVisible] = useState(false)

  const selectedLabel = options.find(opt => opt.value === selectedValue)?.label

  return (
    <>
      <TouchableOpacity style={styles.input} onPress={() => setVisible(true)}>
        <Text style={[styles.inputText, !selectedLabel && { color: '#aaa' }]}>
          {selectedLabel || label}
        </Text>
      </TouchableOpacity>

      <Modal transparent visible={visible} animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modalContainer}>
            <ScrollView>
              {options.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={styles.option}
                  onPress={() => {
                    onValueChange(item.value)
                    setVisible(false)
                  }}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 24,
    paddingVertical: 22,
    paddingHorizontal: 16,
    backgroundColor: "#555555",
  },
  inputText: {
    textAlign:"center",
    color: '#ccc',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '60%',
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomColor: '#e7e7e7',
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
    fontWeight:500,
    color: '#333',
  },
})
