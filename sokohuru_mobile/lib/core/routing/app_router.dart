import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../features/auth/models/user_model.dart';
import '../../features/auth/providers/auth_provider.dart';
import '../../features/auth/screens/sign_in_screen.dart';
import '../../features/auth/screens/splash_screen.dart';
import '../../features/creator/screens/creator_home_screen.dart';
import '../../features/creator/screens/creator_shell.dart';
import '../../features/brand/screens/brand_home_screen.dart';
import '../../features/brand/screens/brand_shell.dart';
import 'app_routes.dart';

/// Router provider with auth state management
final routerProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authProvider);

  return GoRouter(
    initialLocation: AppRoutes.splash,
    debugLogDiagnostics: true,
    redirect: (context, state) {
      final isLoading = authState.isLoading;
      final user = authState.value;
      final isAuth = user != null;

      // Show splash while loading
      if (isLoading) {
        return AppRoutes.splash;
      }

      final isOnSplash = state.matchedLocation == AppRoutes.splash;
      final isOnAuth = state.matchedLocation == AppRoutes.signIn ||
          state.matchedLocation == AppRoutes.creatorSignUp ||
          state.matchedLocation == AppRoutes.brandSignUp ||
          state.matchedLocation == AppRoutes.forgotPassword;

      // If not authenticated and not on auth screens, redirect to sign in
      if (!isAuth && !isOnAuth && !isOnSplash) {
        return AppRoutes.signIn;
      }

      // If authenticated and on splash/auth screens, redirect to home
      if (isAuth && (isOnSplash || isOnAuth)) {
        return user.role == UserRole.creator
            ? AppRoutes.creatorHome
            : AppRoutes.brandHome;
      }

      // Role-based access control
      if (isAuth) {
        final isCreatorRoute = state.matchedLocation.startsWith('/creator');
        final isBrandRoute = state.matchedLocation.startsWith('/brand');

        if (user.role == UserRole.creator && isBrandRoute) {
          return AppRoutes.creatorHome;
        }
        if (user.role == UserRole.brand && isCreatorRoute) {
          return AppRoutes.brandHome;
        }
      }

      return null;
    },
    routes: [
      // ─── Splash ─────────────────────────────────────────────────
      GoRoute(
        path: AppRoutes.splash,
        builder: (context, state) => const SplashScreen(),
      ),

      // ─── Auth routes ────────────────────────────────────────────
      GoRoute(
        path: AppRoutes.signIn,
        builder: (context, state) => const SignInScreen(),
      ),

      // ─── Creator routes with shell ──────────────────────────────
      ShellRoute(
        builder: (context, state, child) => CreatorShell(child: child),
        routes: [
          GoRoute(
            path: AppRoutes.creatorHome,
            builder: (context, state) => const CreatorHomeScreen(),
          ),
        ],
      ),

      // ─── Brand routes with shell ────────────────────────────────
      ShellRoute(
        builder: (context, state, child) => BrandShell(child: child),
        routes: [
          GoRoute(
            path: AppRoutes.brandHome,
            builder: (context, state) => const BrandHomeScreen(),
          ),
        ],
      ),
    ],
    errorBuilder: (context, state) => Scaffold(
      body: Center(
        child: Text('Error: ${state.error}'),
      ),
    ),
  );
});
