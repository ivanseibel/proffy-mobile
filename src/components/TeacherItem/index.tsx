import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import styles from './styles';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import { ITeacher } from '../../@types/teacher';
import {
  getTeacher,
  storeTeacher,
  removeTeacher,
} from '../../services/asyncStorage';

interface ITeacherItemProps {
  teacher: ITeacher;
  onUpdateFavorite(): void;
}

const TeacherItem: React.FC<ITeacherItemProps> = ({
  teacher,
  onUpdateFavorite,
}) => {
  const avatar =
    teacher.avatar || `https://api.adorable.io/avatars/60/${teacher.name}.png`;
  const [isFavorited, setIsFavorited] = useState(false);

  const handleOpenWhatsapp = useCallback(() => {
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
  }, [teacher.whatsapp]);

  const isFocused = useIsFocused();

  useEffect(() => {
    getTeacher(teacher.id).then(favoritedTeacher => {
      setIsFavorited(!!favoritedTeacher);
    });
  }, [teacher.id, isFocused]);

  const toggleFavorited = useCallback(async () => {
    if (isFavorited) {
      await removeTeacher(teacher.id);
      setIsFavorited(false);

      if (onUpdateFavorite) {
        onUpdateFavorite();
      }
      return;
    }

    await storeTeacher(teacher);
    setIsFavorited(true);
  }, [isFavorited, onUpdateFavorite, teacher]);

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={{ uri: avatar }} />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{teacher.bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          {`Price/hour   `}
          <Text style={styles.priceValue}>{`US$ ${teacher.cost}`}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            style={[styles.favoriteButton, styles.favorited]}
            onPress={toggleFavorited}
          >
            {isFavorited ? (
              <Image source={unfavoriteIcon} />
            ) : (
              <Image source={heartOutlineIcon} />
            )}
          </RectButton>

          <RectButton style={styles.contactButton} onPress={handleOpenWhatsapp}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Get in touch</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
