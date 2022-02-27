import React from 'react';
import { Text, View } from 'react-native';

import { Card } from '../../components/Card';
import { Input } from '../../components/Input';

import { styles } from './styles';

export function Cities() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        
        <Input />

        <View style={styles.containerNoData}>
          <Text style={styles.title}>
            Parece que você ainda não
            {`\n`}
            adicionou uma cidade
          </Text>
          <Text style={styles.subtitle}>
            Tente adicionar uma cidade usando o botão
            {`\n`}
            de busca
          </Text>
        </View>

        <Card />

      </View>
    </View>
  )
}