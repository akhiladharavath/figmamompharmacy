import { COLOR } from '@/constants/color';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocationContext } from '../../Context/locationContext';

const { width, height } = Dimensions.get('window');

type TopNavbarProps = {
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
};

const TopNavbar: React.FC<TopNavbarProps> = ({
  showBack = false,
  onBack,
  title = "medicine on minutes"
}) => {
  const { shortAddress } = useLocationContext();

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        {showBack && (
          <TouchableOpacity onPress={onBack ? onBack : () => {}} style={styles.backBtn}>
            <MaterialIcons name="arrow-back" size={28} color={COLOR.primary} />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.addressContainer}>
        <TouchableOpacity onPress={() => { router.push('/Maps/myAddress') }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="location-on" size={24} color={COLOR.primary} />
            <Text style={styles.locationText} numberOfLines={1} ellipsizeMode="tail">
              {shortAddress || "Fetching location..."}
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={30} color={COLOR.primary} />
          </View>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={() => { router.push('/Notification') }} >
          <MaterialIcons name="notifications" size={30} color={COLOR.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height * 0.11,
    width: width,
    backgroundColor: COLOR.light,
    paddingHorizontal: 20,
    marginTop: -10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    left: 0,
    zIndex: 2,
    padding: 8,
  },
  title: {
    color: COLOR.primary,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
    paddingTop: 15,
    paddingBottom: 10,
  },
  addressContainer: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  address: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 20,
    color: COLOR.text,
    paddingLeft: 5,
  },
  locationText: {
    color: '#000',
    fontSize: 16,
    marginLeft: 3,
    flexShrink: 1,
  },
});

export default TopNavbar;
