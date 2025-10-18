import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../contexts/ThemeContext";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showCloseButton?: boolean;
}

export default function CustomModal({ 
  visible, 
  onClose, 
  children, 
  title,
  showCloseButton = true 
}: ModalProps) {
  const { theme } = useTheme();
  const router = useRouter();

  const handleClose = () => {
    onClose();
    // Use router.back() to properly remove from stack
    router.back();
  };

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContainer: {
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: theme.borderRadius.xl,
      borderTopRightRadius: theme.borderRadius.xl,
      maxHeight: '95%',
      minHeight: '95%',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    title: {
      fontSize: theme.typography.fontSize.xl,
      fontWeight: '600' as const,
      color: theme.colors.text.primary,
    },
    closeButton: {
      padding: theme.spacing.sm,
    },
    content: {
      flex: 1,
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.lg,
    },
  });

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
      statusBarTranslucent={true}
    >
      <SafeAreaView style={styles.overlay} edges={['top']}>
        <TouchableOpacity 
          style={StyleSheet.absoluteFillObject} 
          activeOpacity={1} 
          onPress={handleClose}
        />
        <View style={styles.modalContainer}>
          {title && (
            <View style={styles.header}>
              <View style={{ flex: 1 }} />
              <Text style={styles.title}>{title}</Text>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                {showCloseButton && (
                  <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={handleClose}
                  >
                    <Ionicons 
                      name="close" 
                      size={24} 
                      color={theme.colors.text.primary} 
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
          <View style={styles.content}>
            {children}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
