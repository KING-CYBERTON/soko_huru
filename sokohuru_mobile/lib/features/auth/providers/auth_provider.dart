import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../models/user_model.dart';
import '../services/auth_service.dart';

/// Auth state notifier managing authentication state
class AuthNotifier extends StateNotifier<AsyncValue<UserModel?>> {
  AuthNotifier() : super(const AsyncValue.loading()) {
    _init();
  }

  /// Initialize auth state and listen to auth changes
  void _init() async {
    // Get current user
    final user = await AuthService.getCurrentUser();
    state = AsyncValue.data(user);

    // Listen to auth state changes
    AuthService.authStateChanges.listen((event) async {
      if (event.event == AuthChangeEvent.signedIn) {
        final user = await AuthService.getCurrentUser();
        state = AsyncValue.data(user);
      } else if (event.event == AuthChangeEvent.signedOut) {
        state = const AsyncValue.data(null);
      }
    });
  }

  /// Sign in with email and password
  Future<void> signInWithEmail({
    required String email,
    required String password,
  }) async {
    state = const AsyncValue.loading();
    try {
      final user = await AuthService.signInWithEmail(
        email: email,
        password: password,
      );
      state = AsyncValue.data(user);
    } catch (e, st) {
      state = AsyncValue.error(e, st);
    }
  }

  /// Sign up creator
  Future<void> signUpCreator({
    required String email,
    required String password,
    required String fullName,
  }) async {
    state = const AsyncValue.loading();
    try {
      final user = await AuthService.signUpCreator(
        email: email,
        password: password,
        fullName: fullName,
      );
      state = AsyncValue.data(user);
    } catch (e, st) {
      state = AsyncValue.error(e, st);
    }
  }

  /// Sign up brand
  Future<void> signUpBrand({
    required String email,
    required String password,
    required String brandName,
  }) async {
    state = const AsyncValue.loading();
    try {
      final user = await AuthService.signUpBrand(
        email: email,
        password: password,
        brandName: brandName,
      );
      state = AsyncValue.data(user);
    } catch (e, st) {
      state = AsyncValue.error(e, st);
    }
  }

  /// Sign out
  Future<void> signOut() async {
    try {
      await AuthService.signOut();
      state = const AsyncValue.data(null);
    } catch (e, st) {
      state = AsyncValue.error(e, st);
    }
  }

  /// Reset password
  Future<void> resetPassword(String email) async {
    try {
      await AuthService.resetPassword(email);
    } catch (e, st) {
      state = AsyncValue.error(e, st);
    }
  }
}

/// Auth provider for global auth state
final authProvider =
    StateNotifierProvider<AuthNotifier, AsyncValue<UserModel?>>((ref) {
  return AuthNotifier();
});

/// Current user provider (convenience)
final currentUserProvider = Provider<UserModel?>((ref) {
  return ref.watch(authProvider).value;
});

/// Is authenticated provider
final isAuthenticatedProvider = Provider<bool>((ref) {
  return ref.watch(currentUserProvider) != null;
});

/// User role provider
final userRoleProvider = Provider<UserRole?>((ref) {
  return ref.watch(currentUserProvider)?.role;
});
