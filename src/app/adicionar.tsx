import { router } from 'expo-router';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { adicionarMateria } from '@/storage/materias';

export default function AdicionarScreen() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [erro, setErro] = useState('');

  async function salvar() {

    if (titulo.trim() === '') {
      setErro('Informe o nome da matéria.');
      return;
    }

    await adicionarMateria(titulo, descricao);
    router.back(); 
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Text style={styles.header}>Nova matéria</Text>

      <View style={styles.campo}>
        <Text style={styles.label}>Matéria *</Text>
        <TextInput
          style={[styles.input, erro !== '' && styles.inputErro]}
          placeholder="Ex.: Física"
          placeholderTextColor="#9BB0C9"
          value={titulo}
          onChangeText={(texto) => {
            setTitulo(texto);
            if (erro !== '') setErro('');
          }}
        />
        {erro !== '' && <Text style={styles.erro}>{erro}</Text>}
      </View>

      <View style={styles.campo}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.inputMultilinha]}
          placeholder="Ex.: Mecânica e ondulatória"
          placeholderTextColor="#9BB0C9"
          value={descricao}
          onChangeText={setDescricao}
          multiline
        />
      </View>

      <View style={styles.botoes}>
        <Pressable style={styles.saveButton} onPress={salvar}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </Pressable>

        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Cancelar</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: '#F9FCFF',
  },
  header: {
    marginBottom: 16,
    textAlign: 'center',
    color: 'rgba(30, 79, 160, 0.8)',
    fontSize: 20,
    fontWeight: '600',
  },
  campo: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    color: '#173A66',
    fontWeight: '600',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DCE9F5',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#FFFFFF',
    color: '#173A66',
    fontSize: 15,
  },
  inputMultilinha: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  inputErro: {
    borderColor: '#D64545',
  },
  erro: {
    marginTop: 4,
    color: '#D64545',
    fontSize: 12,
  },
  botoes: {
    marginTop: 'auto',
  },
  saveButton: {
    backgroundColor: '#2E7CE0',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  backButton: {
    borderWidth: 1.5,
    borderColor: '#C9DFF5',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  backButtonText: {
    fontWeight: '600',
    color: '#173A66',
  },
});