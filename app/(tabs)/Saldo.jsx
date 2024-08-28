
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Saldo = ({ saldo }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: 'https://logosmarcas.net/wp-content/uploads/2020/11/Santander-Logo.png' }}
        style={styles.logo}
      />
      <Text style={styles.title}>Saldo Atual Na Conta</Text>
      <Text style={styles.saldo}>R$ {saldo.toFixed(2)}</Text>
      <Text style={styles.descricao}>
        Digite o valor abaixo e escolha uma das operações bancárias
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '90%', 
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'gray',
  },
  saldo: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  descricao: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    paddingBottom: 20,
  },
});

export default Saldo;
