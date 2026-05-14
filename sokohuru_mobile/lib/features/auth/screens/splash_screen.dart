import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';

/// Splash screen shown while loading auth state
class SplashScreen extends StatelessWidget {
  const SplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      backgroundColor: AppColors.base,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.favorite,
              size: 80,
              color: AppColors.pink,
            ),
            SizedBox(height: 24),
            Text(
              'Sokohuru',
              style: TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.w600,
                color: AppColors.textPrimary,
              ),
            ),
            SizedBox(height: 16),
            CircularProgressIndicator(
              color: AppColors.pink,
            ),
          ],
        ),
      ),
    );
  }
}
