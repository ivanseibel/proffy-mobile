import React from 'react';
import { View, Image, Text } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import styles from './styles';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

const TeacherItem: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://github.com/ivanseibel.png' }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>Ivan Seibel</Text>
          <Text style={styles.subject}>Chemistry</Text>
        </View>
      </View>

      <Text style={styles.bio}>
        Full stack developer JavaScript | TypeScript | ReactJS | React Native |
        Node.js
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          {`Price/hour   `}
          <Text style={styles.priceValue}>US$ 20.00</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton style={[styles.favoriteButton, styles.favorited]}>
            {/* <Image source={heartOutlineIcon} /> */}
            <Image source={unfavoriteIcon} />
          </RectButton>

          <RectButton style={styles.contactButton}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Get in touch</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
