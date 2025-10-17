import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../contexts/ThemeContext";

export default function ProfileScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const profileData = {
    name: "John Doe",
    email: "john.doe@example.com",
    memberSince: "January 2024",
    totalWorkouts: 24,
  };

  const menuItems = [
    { title: "Edit Profile", icon: "person-outline" },
    { title: "Settings", icon: "settings-outline" },
    { title: "Notifications", icon: "notifications-outline" },
    { title: "Privacy", icon: "shield-outline" },
    { title: "Help & Support", icon: "help-circle-outline" },
    { title: "About", icon: "information-circle-outline" },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
    },
    header: {
      backgroundColor: theme.colors.surface,
      paddingBottom: theme.spacing.xl,
      marginHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      ...theme.shadows.sm,
    },
    profileSection: {
      alignItems: "center",
      padding: theme.spacing.xl,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.colors.primary,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: theme.spacing.lg,
    },
    avatarText: {
      fontSize: theme.typography.fontSize['4xl'],
      fontWeight: 'bold' as const,
      color: theme.colors.white,
    },
    name: {
      fontSize: theme.typography.fontSize['2xl'],
      fontWeight: 'bold' as const,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.xs,
    },
    email: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing.xs,
    },
    memberSince: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },
    statsSection: {
      flexDirection: "row",
      backgroundColor: theme.colors.surface,
      margin: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.xl,
      ...theme.shadows.sm,
    },
    statItem: {
      flex: 1,
      alignItems: "center",
    },
    statNumber: {
      fontSize: theme.typography.fontSize.xl,
      fontWeight: 'bold' as const,
      color: theme.colors.primary,
      marginBottom: theme.spacing.xs,
    },
    statLabel: {
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.text.secondary,
    },
    statDivider: {
      width: 1,
      backgroundColor: theme.colors.border,
      marginHorizontal: theme.spacing.md,
    },
    menuSection: {
      backgroundColor: theme.colors.surface,
      margin: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
      ...theme.shadows.sm,
    },
    menuItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: theme.spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.borderLight,
    },
    menuTitle: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.primary,
    },
    menuArrow: {
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text.tertiary,
    },
    logoutButton: {
      backgroundColor: theme.colors.error,
      margin: theme.spacing.lg,
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
      alignItems: "center",
    },
    logoutText: {
      color: theme.colors.white,
      fontSize: theme.typography.fontSize.base,
      fontWeight: '600' as const,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {profileData.name.split(" ").map(n => n[0]).join("")}
              </Text>
            </View>
            <Text style={styles.name}>{profileData.name}</Text>
            <Text style={styles.email}>{profileData.email}</Text>
            <Text style={styles.memberSince}>Member since {profileData.memberSince}</Text>
          </View>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{profileData.totalWorkouts}</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>18h 30m</Text>
            <Text style={styles.statLabel}>Total Time</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>PRs</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={() => { 
              // TODO: Change this to the actual logout logic
              router.replace("/auth");
          }}
          >
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
