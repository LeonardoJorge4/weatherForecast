import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Card } from '../../components/Card';

import { styles } from './styles';

export function Favorites() {
  return (
    <SafeAreaView style={styles.container}>
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

      {/* <Card /> */}
    </SafeAreaView>
  )
}