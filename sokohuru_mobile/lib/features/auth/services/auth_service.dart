import 'package:supabase_flutter/supabase_flutter.dart';
import '../../../core/supabase/supabase_client.dart';
import '../models/user_model.dart';

/// Authentication service handling all auth operations
class AuthService {
  AuthService._();

  /// Sign in with email and password
  static Future<UserModel?> signInWithEmail({
    required String email,
    required String password,
  }) async {
    try {
      final response = await supabase.auth.signInWithPassword(
        email: email,
        password: password,
      );

      if (response.user == null) return null;

      // Fetch user profile from profiles table
      final profileData = await supabase
          .from('profiles')
          .select()
          .eq('id', response.user!.id)
          .single();

      return UserModel.fromJson({
        'id': response.user!.id,
        'email': response.user!.email!,
        'role': profileData['role'],
        'fullName': profileData['full_name'],
        'avatarUrl': profileData['avatar_url'],
        'phoneNumber': profileData['phone_number'],
        'createdAt': response.user!.createdAt,
      });
    } catch (e) {
      rethrow;
    }
  }

  /// Sign up creator with email and password
  static Future<UserModel?> signUpCreator({
    required String email,
    required String password,
    required String fullName,
  }) async {
    try {
      final response = await supabase.auth.signUp(
        email: email,
        password: password,
      );

      if (response.user == null) return null;

      // Create profile
      await supabase.from('profiles').insert({
        'id': response.user!.id,
        'email': email,
        'role': 'creator',
        'full_name': fullName,
      });

      return UserModel.fromJson({
        'id': response.user!.id,
        'email': email,
        'role': 'creator',
        'fullName': fullName,
        'createdAt': response.user!.createdAt,
      });
    } catch (e) {
      rethrow;
    }
  }

  /// Sign up brand with email and password
  static Future<UserModel?> signUpBrand({
    required String email,
    required String password,
    required String brandName,
  }) async {
    try {
      final response = await supabase.auth.signUp(
        email: email,
        password: password,
      );

      if (response.user == null) return null;

      // Create profile
      await supabase.from('profiles').insert({
        'id': response.user!.id,
        'email': email,
        'role': 'brand',
        'full_name': brandName,
      });

      return UserModel.fromJson({
        'id': response.user!.id,
        'email': email,
        'role': 'brand',
        'fullName': brandName,
        'createdAt': response.user!.createdAt,
      });
    } catch (e) {
      rethrow;
    }
  }

  /// Sign out current user
  static Future<void> signOut() async {
    await supabase.auth.signOut();
  }

  /// Get current session user
  static Future<UserModel?> getCurrentUser() async {
    try {
      final user = supabase.auth.currentUser;
      if (user == null) return null;

      final profileData = await supabase
          .from('profiles')
          .select()
          .eq('id', user.id)
          .single();

      return UserModel.fromJson({
        'id': user.id,
        'email': user.email!,
        'role': profileData['role'],
        'fullName': profileData['full_name'],
        'avatarUrl': profileData['avatar_url'],
        'phoneNumber': profileData['phone_number'],
        'createdAt': user.createdAt,
      });
    } catch (e) {
      return null;
    }
  }

  /// Reset password via email
  static Future<void> resetPassword(String email) async {
    await supabase.auth.resetPasswordForEmail(email);
  }

  /// Update password
  static Future<void> updatePassword(String newPassword) async {
    await supabase.auth.updateUser(
      UserAttributes(password: newPassword),
    );
  }

  /// Stream auth state changes
  static Stream<AuthState> get authStateChanges =>
      supabase.auth.onAuthStateChange;
}
