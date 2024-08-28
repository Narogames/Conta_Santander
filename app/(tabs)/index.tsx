import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, SafeAreaView, Modal, Text, Button, Animated } from 'react-native';
import Saldo from './Saldo';
import FormaTransacao from './FormaTransacao';

const App = () => {
  const [saldo, setSaldo] = useState(7320.92);
  const [valor, setValor] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [transactionType, setTransactionType] = useState(null);
  const [previewBalance, setPreviewBalance] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0)); // Estado para opacidade

  useEffect(() => {
    // Inicia a animação de fade in ou fade out conforme o estado 'isModalVisible'
    Animated.timing(fadeAnim, {
      toValue: isModalVisible ? 1 : 0, // 1 para visível, 0 para invisível
      duration: 300, // Duração da animação
      useNativeDriver: true, // Usa o driver nativo para desempenho otimizado
    }).start();
  }, [isModalVisible]);

  const calculatePreviewBalance = (valorNum, currentSaldo, transactionType) => {
    if (transactionType === 'deposit') {
      const bonus = valorNum * 0.01;
      return currentSaldo + valorNum + bonus;
    } else if (transactionType === 'withdraw') {
      if (valorNum > currentSaldo) {
        return currentSaldo;
      }
      const saldoRestante = currentSaldo - valorNum;
      const multa = saldoRestante * 0.025;
      return saldoRestante - multa;
    }
    return currentSaldo;
  };

  const showConfirmationModal = (type) => {
    const valorNum = parseFloat(valor);
    if (isNaN(valorNum) || valorNum <= 0) {
      Alert.alert('Erro', 'Digite um valor válido.');
      return;
    }
    
    setTransactionType(type);
    
    const calculatedPreviewBalance = calculatePreviewBalance(valorNum, saldo, type);
    setPreviewBalance(calculatedPreviewBalance);
    setIsModalVisible(true);
  };

  const handleConfirm = () => {
    if (transactionType === 'deposit') {
      handleDepositar();
    } else if (transactionType === 'withdraw') {
      handleSacar();
    }
    handleCloseModal();
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  const handleCloseModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0, // Fade out
      duration: 300, // Duração da animação
      useNativeDriver: true,
    }).start(() => {
      setIsModalVisible(false); // Fecha o modal após a animação de fade out
    });
  };

  const handleDepositar = () => {
    const valorNum = parseFloat(valor);
    if (isNaN(valorNum) || valorNum <= 0) {
      Alert.alert('Erro', 'Digite um valor válido para depósito.');
      return;
    }
    const bonus = valorNum * 0.01;
    setSaldo(saldo + valorNum + bonus);
    setValor('');
  };

  const handleSacar = () => {
    const valorNum = parseFloat(valor);
    if (isNaN(valorNum) || valorNum <= 0) {
      Alert.alert('Erro', 'Digite um valor válido para saque.');
      return;
    }
    if (valorNum > saldo) {
      Alert.alert('Erro', 'Saldo insuficiente.');
      return;
    }
    const saldoRestante = saldo - valorNum;
    const multa = saldoRestante * 0.025;
    setSaldo(saldoRestante - multa);
    setValor('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Saldo saldo={saldo} />
      <FormaTransacao
        valor={valor}
        setValor={setValor}
        onDeposit={() => showConfirmationModal('deposit')}
        onWithdraw={() => showConfirmationModal('withdraw')}
      />

      <Modal
        transparent={true}
        visible={isModalVisible || fadeAnim._value > 0} // Manter o modal visível enquanto a animação está em andamento
        animationType="none"
        onRequestClose={handleCancel}
      >
        <View style={styles.modalBackground}>
          <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
            <Text style={styles.modalText}>
              {transactionType === 'deposit' ? 
                `Você deseja depositar R$ ${valor}? Seu saldo após a transação será R$ ${previewBalance.toFixed(2)}.` : 
                `Você deseja sacar R$ ${valor}? Seu saldo após a transação será R$ ${previewBalance.toFixed(2)}.`}
            </Text>
            <View style={styles.modalButtons}>
              <Button color='red' title="Confirmar" onPress={handleConfirm} />
              <Button color='red' title="Cancelar" onPress={handleCancel} />
            </View>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default App;
