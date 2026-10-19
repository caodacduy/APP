import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SearchX, Inbox } from 'lucide-react-native';

interface EmptyStateProps {
  title: string;
  description: string;
  isSearch?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  isSearch = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        {isSearch ? (
          <SearchX size={36} color="#94A3B8" />
        ) : (
          <Inbox size={36} color="#94A3B8" />
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
    textAlign: 'center',
  },
  description: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
  },
});
