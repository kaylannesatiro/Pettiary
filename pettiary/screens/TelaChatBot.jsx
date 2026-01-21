import React, { useState, useRef } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyCCDvR0n6hQQ9f4fljzJClXPKqZBo_2y4E';

const genAI = new GoogleGenerativeAI(API_KEY);

const ChatBotScreen = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: Date.now().toString(),
      text: 'Olá! Eu sou o seu Assistente Virtual 🐾\nEstou aqui para ajudar você a cuidar do seu melhor amigo. O que você gostaria de fazer?',
      isBot: true,
    }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef();

  const perguntarGemini = async (pergunta) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `
## Especialidade
Você é um assistente virtual especializado em cuidados com pets (cães, gatos, pássaros, etc.).

## Tarefa
Ajudar tutores a cuidar melhor de seus animais de estimação, dando dicas sobre alimentação, saúde, comportamento, vacinas e muito mais.

## Regras
- Seja amigável, prestativo e dê dicas práticas
- Responda de forma concisa e clara (máximo 500 caracteres)
- Se não souber a resposta, seja honesto
- Não invente informações médicas

---
Pergunta do usuário: ${pergunta}
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return text;
    } catch (error) {
      console.error('Erro detalhado:', error);
      throw error;
    }
  };

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const userMessage = {
      id: Date.now().toString(),
      text: message.trim(),
      isBot: false,
    };

    setMessages(prev => [...prev, userMessage]);
    const userText = message.trim();
    setMessage('');
    setLoading(true);

    try {
      const text = await perguntarGemini(userText);

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: text,
        isBot: true,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Erro ao comunicar com Gemini:', error);
      
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Desculpe, tive um problema ao processar sua mensagem. Tente novamente.',
        isBot: true,
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      // Auto scroll para o fim
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#E1D8CF" />
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#2C1810" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <View style={styles.avatarContainer}>
              <MaterialIcons name="smart-toy" size={28} color="#362013" />
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.headerTitle}>Assistente Virtual</Text>
              <View style={styles.statusContainer}>
                <View style={styles.onlineIndicator} />
                <Text style={styles.statusText}>Online</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.volumeButton}>
            <MaterialIcons name="volume-up" size={24} color="#2C1810" />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageWrapper,
                msg.isBot ? styles.botMessageWrapper : styles.userMessageWrapper,
              ]}
            >
              {msg.isBot && (
                <View style={styles.botAvatar}>
                  <MaterialIcons name="smart-toy" size={20} color="#362013" />
                </View>
              )}
              <View
                style={[
                  styles.messageBubble,
                  msg.isBot ? styles.botBubble : styles.userBubble,
                ]}
              >
                <Text style={[
                  styles.messageText,
                  msg.isBot ? styles.botText : styles.userText,
                ]}>
                  {msg.text}
                </Text>
              </View>
              {!msg.isBot && (
                <View style={styles.userAvatar}>
                  <MaterialIcons name="person" size={20} color="#2C1810" />
                </View>
              )}
            </View>
          ))}
          
          {/* Loading indicator */}
          {loading && (
            <View style={styles.loadingWrapper}>
              <View style={styles.botAvatar}>
                <MaterialIcons name="smart-toy" size={20} color="#362013" />
              </View>
              <View style={[styles.messageBubble, styles.botBubble, styles.loadingBubble]}>
                <ActivityIndicator size="small" color="#7D5E42" />
                <Text style={styles.loadingText}>Digitando...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              placeholderTextColor="#9B7653"
              value={message}
              onChangeText={setMessage}
              multiline
              maxLength={500}
            />
            <TouchableOpacity 
              style={[styles.sendButton, (!message.trim() || loading) && styles.sendButtonDisabled]}
              onPress={handleSend}
              activeOpacity={0.7}
              disabled={!message.trim() || loading}
            >
              <MaterialIcons name="send" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E1D8CF',
  },
  container: {
    flex: 1,
    backgroundColor: '#E1D8CF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#D5C0AB',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#D5C0AB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: {
    marginLeft: 12,
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C1810',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  volumeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    gap: 12,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-end',
  },
  botMessageWrapper: {
    justifyContent: 'flex-start',
  },
  userMessageWrapper: {
    justifyContent: 'flex-end',
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#D5C0AB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#C4B5A0',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
  },
  botBubble: {
    backgroundColor: '#D5C0AB',
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: '#7D5E42',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  botText: {
    color: '#2C1810',
  },
  userText: {
    color: '#FFFFFF',
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#D5C0AB',
    backgroundColor: '#E1D8CF',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F5F0E8',
    borderRadius: 24,
    paddingLeft: 16,
    paddingRight: 4,
    paddingVertical: 4,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#2C1810',
    maxHeight: 100,
    paddingVertical: 8,
    paddingRight: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#7D5E42',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  sendButtonDisabled: {
    backgroundColor: '#C4B5A0',
    opacity: 0.5,
  },
  loadingWrapper: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-end',
  },
  loadingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loadingText: {
    fontSize: 14,
    color: '#7D5E42',
    fontStyle: 'italic',
  },
});

export default ChatBotScreen;
