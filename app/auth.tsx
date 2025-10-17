import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../contexts/ThemeContext";

export default function AuthScreen() {
  const { theme } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  const handleAuth = async () => {

    // TODO: Change this to the actual auth logic
    router.replace("/(tabs)/home");
    // if (!email || !password) {
    //   Alert.alert("Error", "Please fill in all required fields");
    //   return;
    // }

    // if (!isLogin && password !== confirmPassword) {
    //   Alert.alert("Error", "Passwords do not match");
    //   return;
    // }

    // if (!isLogin && !name) {
    //   Alert.alert("Error", "Please enter your name");
    //   return;
    // }

    // setIsLoading(true);

    // // Simulate API call
    // setTimeout(() => {
    //   setIsLoading(false);
    //   Alert.alert(
    //     "Success",
    //     isLogin ? "Login successful!" : "Account created successfully!",
    //     [
    //       {
    //         text: "OK",
    //         onPress: () => router.replace("/(tabs)"),
    //       },
    //     ]
    //   );
    // }, 1500);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    keyboardView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: theme.spacing.xl,
    },
    header: {
      alignItems: "center",
      marginTop: theme.spacing['4xl'],
      marginBottom: theme.spacing['4xl'],
    },
    logoContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: theme.colors.surface,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: theme.spacing.xl,
      ...theme.shadows.md,
    },
    title: {
      fontSize: theme.typography.fontSize['3xl'],
      fontWeight: 'bold' as const,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.sm,
      textAlign: "center",
    },
    subtitle: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.secondary,
      textAlign: "center",
      lineHeight: theme.typography.lineHeight.normal,
    },
    form: {
      flex: 1,
    },
    inputContainer: {
      marginBottom: theme.spacing.xl,
    },
    label: {
      fontSize: theme.typography.fontSize.base,
      fontWeight: '600' as const,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.sm,
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    input: {
      flex: 1,
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.primary,
      marginLeft: theme.spacing.md,
    },
    eyeIcon: {
      padding: theme.spacing.xs,
    },
    authButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
      alignItems: "center",
      marginTop: theme.spacing.md,
      marginBottom: theme.spacing.xl,
    },
    authButtonDisabled: {
      backgroundColor: theme.colors.text.tertiary,
    },
    authButtonText: {
      fontSize: theme.typography.fontSize.base,
      fontWeight: '600' as const,
      color: theme.colors.white,
    },
    forgotPassword: {
      alignItems: "center",
      marginBottom: theme.spacing['3xl'],
    },
    forgotPasswordText: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.primary,
      fontWeight: '500' as const,
    },
    divider: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: theme.spacing.xl,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.border,
    },
    dividerText: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      marginHorizontal: theme.spacing.lg,
    },
    socialButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.surface,
      paddingVertical: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
      marginBottom: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    socialButtonText: {
      fontSize: theme.typography.fontSize.base,
      fontWeight: '500' as const,
      color: theme.colors.text.primary,
      marginLeft: theme.spacing.md,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: theme.spacing.xl,
      marginBottom: theme.spacing['4xl'],
    },
    footerText: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.secondary,
    },
    footerLink: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.primary,
      fontWeight: '600' as const,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Ionicons name="fitness" size={60} color={theme.colors.primary} />
            </View>
            <Text style={styles.title}>
              {isLogin ? "Welcome Back" : "Create Account"}
            </Text>
            <Text style={styles.subtitle}>
              {isLogin
                ? "Sign in to continue your fitness journey"
                : "Join us and start your fitness journey today"}
            </Text>
          </View>

          <View style={styles.form}>
            {!isLogin && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="person-outline" size={20} color={theme.colors.text.secondary} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    placeholderTextColor={theme.colors.text.tertiary}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
              </View>
            )}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color={theme.colors.text.secondary} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor={theme.colors.text.tertiary}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color={theme.colors.text.secondary} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor={theme.colors.text.tertiary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color={theme.colors.text.secondary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {!isLogin && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="lock-closed-outline" size={20} color={theme.colors.text.secondary} />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm your password"
                    placeholderTextColor={theme.colors.text.tertiary}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>
            )}

            <TouchableOpacity
              style={[styles.authButton, isLoading && styles.authButtonDisabled]}
              onPress={handleAuth}
              disabled={isLoading}
            >
              <Text style={styles.authButtonText}>
                {isLoading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
              </Text>
            </TouchableOpacity>

            {isLogin && (
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-google" size={20} color={theme.colors.error} />
              <Text style={styles.socialButtonText}>
                Continue with Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-apple" size={20} color={theme.colors.text.primary} />
              <Text style={styles.socialButtonText}>
                Continue with Apple
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </Text>
            <TouchableOpacity onPress={toggleAuthMode}>
              <Text style={styles.footerLink}>
                {isLogin ? "Sign Up" : "Sign In"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

