import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const TransactionForm = ({ valor, setValor, onDeposit, onWithdraw }) => {
  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        value={valor}
        onChangeText={setValor}
        placeholder="Digite o valor"
      />
      <View style={styles.buttonContainer}>
        <Button color='red' title="Depositar" onPress={onDeposit} />
      </View>
      <View style={styles.buttonContainer}>
        <Button color='red' title="Sacar" onPress={onWithdraw} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: '80%',
    margin: 20,
  },
  buttonContainer: {
    marginBottom: 10,
    paddingBottom: 5, 
  },

  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default TransactionForm;
