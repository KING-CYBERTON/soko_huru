import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'app_colors.dart';
import 'app_typography.dart';
import '../constants/app_radius.dart';

/// Sokohuru Design System — App Theme
/// Assembles all tokens into Flutter ThemeData.
/// Applied once in main.dart — never override in individual widgets.
class AppTheme {
  AppTheme._();

  static ThemeData get dark => ThemeData(
    useMaterial3: true,
    brightness: Brightness.dark,

    // ─── Colours ────────────────────────────────────────────────
    colorScheme: const ColorScheme.dark(
      primary:          AppColors.pink,
      onPrimary:        AppColors.white,
      secondary:        AppColors.pink800,
      onSecondary:      AppColors.white,
      surface:          AppColors.surface1,
      onSurface:        AppColors.textPrimary,
      error:            AppColors.error,
      onError:          AppColors.white,
      outline:          AppColors.border,
      surfaceContainerHighest: AppColors.surface2,
    ),

    scaffoldBackgroundColor: AppColors.base,

    // ─── Typography ─────────────────────────────────────────────
    textTheme: GoogleFonts.plusJakartaSansTextTheme(
      const TextTheme(
        displayLarge:  TextStyle(fontSize: 40, fontWeight: FontWeight.w600),
        displayMedium: TextStyle(fontSize: 30, fontWeight: FontWeight.w600),
        displaySmall:  TextStyle(fontSize: 22, fontWeight: FontWeight.w600),
        headlineLarge: TextStyle(fontSize: 18, fontWeight: FontWeight.w500),
        headlineMedium:TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
        headlineSmall: TextStyle(fontSize: 15, fontWeight: FontWeight.w500),
        bodyLarge:     TextStyle(fontSize: 14, fontWeight: FontWeight.w400),
        bodyMedium:    TextStyle(fontSize: 13, fontWeight: FontWeight.w400),
        bodySmall:     TextStyle(fontSize: 12, fontWeight: FontWeight.w400),
        labelLarge:    TextStyle(fontSize: 12, fontWeight: FontWeight.w500),
        labelMedium:   TextStyle(fontSize: 11, fontWeight: FontWeight.w500),
        labelSmall:    TextStyle(fontSize: 10, fontWeight: FontWeight.w400),
      ),
    ).apply(
      bodyColor:       AppColors.textSecondary,
      displayColor:    AppColors.textPrimary,
    ),

    // ─── AppBar ─────────────────────────────────────────────────
    appBarTheme: AppBarTheme(
      backgroundColor:    AppColors.surface1,
      foregroundColor:    AppColors.textPrimary,
      elevation:          0,
      scrolledUnderElevation: 0,
      centerTitle:        false,
      titleTextStyle:     AppTypography.headingMd,
      iconTheme: const IconThemeData(color: AppColors.textSecondary),
      systemOverlayStyle: SystemUiOverlayStyle.light.copyWith(
        statusBarColor: AppColors.transparent,
      ),
    ),

    // ─── Bottom Navigation ───────────────────────────────────────
    bottomNavigationBarTheme: const BottomNavigationBarThemeData(
      backgroundColor:      AppColors.surface1,
      selectedItemColor:    AppColors.pink,
      unselectedItemColor:  AppColors.textMuted,
      type:                 BottomNavigationBarType.fixed,
      elevation:            0,
      selectedLabelStyle:   TextStyle(fontSize: 9, fontWeight: FontWeight.w500),
      unselectedLabelStyle: TextStyle(fontSize: 9, fontWeight: FontWeight.w500),
    ),

    // ─── Cards ──────────────────────────────────────────────────
    cardTheme: CardThemeData(
      color:        AppColors.surface2,
      elevation:    0,
      shape:        RoundedRectangleBorder(
        borderRadius: AppRadius.card,
        side: const BorderSide(color: AppColors.border, width: 0.5),
      ),
      margin:       EdgeInsets.zero,
    ),

    // ─── Input fields ────────────────────────────────────────────
    inputDecorationTheme: InputDecorationTheme(
      filled:           true,
      fillColor:        AppColors.surface2,
      contentPadding:   const EdgeInsets.symmetric(
        horizontal: 14, vertical: 11,
      ),
      border: OutlineInputBorder(
        borderRadius: AppRadius.input,
        borderSide:   const BorderSide(color: AppColors.border, width: 0.5),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: AppRadius.input,
        borderSide:   const BorderSide(color: AppColors.border, width: 0.5),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: AppRadius.input,
        borderSide:   const BorderSide(color: AppColors.pink, width: 1),
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: AppRadius.input,
        borderSide:   const BorderSide(color: AppColors.error, width: 1),
      ),
      focusedErrorBorder: OutlineInputBorder(
        borderRadius: AppRadius.input,
        borderSide:   const BorderSide(color: AppColors.error, width: 1),
      ),
      hintStyle:      AppTypography.bodyMd.copyWith(color: AppColors.muted),
      labelStyle:     AppTypography.labelMd,
      errorStyle:     AppTypography.caption.copyWith(color: AppColors.errorText),
    ),

    // ─── Elevated Button ─────────────────────────────────────────
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor:    AppColors.pink,
        foregroundColor:    AppColors.white,
        disabledBackgroundColor: AppColors.muted,
        elevation:          0,
        padding:            const EdgeInsets.symmetric(
          horizontal: 20, vertical: 10,
        ),
        shape: RoundedRectangleBorder(borderRadius: AppRadius.button),
        textStyle: AppTypography.labelMd.copyWith(
          fontSize: 14,
          fontWeight: FontWeight.w500,
        ),
      ),
    ),

    // ─── Text Button ─────────────────────────────────────────────
    textButtonTheme: TextButtonThemeData(
      style: TextButton.styleFrom(
        foregroundColor: AppColors.pink,
        padding:         const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
        textStyle:       AppTypography.labelMd,
      ),
    ),

    // ─── Outlined Button ─────────────────────────────────────────
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        foregroundColor: AppColors.textPrimary,
        side:            const BorderSide(color: AppColors.border, width: 0.5),
        padding:         const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
        shape: RoundedRectangleBorder(borderRadius: AppRadius.button),
        textStyle:       AppTypography.labelMd,
      ),
    ),

    // ─── Chip ────────────────────────────────────────────────────
    chipTheme: ChipThemeData(
      backgroundColor:    AppColors.surface3,
      selectedColor:      AppColors.pink50,
      disabledColor:      AppColors.muted,
      labelStyle:         AppTypography.bodySm,
      side:               const BorderSide(color: AppColors.border, width: 0.5),
      padding:            const EdgeInsets.symmetric(horizontal: 11, vertical: 5),
      shape: RoundedRectangleBorder(borderRadius: AppRadius.chip),
    ),

    // ─── Divider ─────────────────────────────────────────────────
    dividerTheme: const DividerThemeData(
      color:     AppColors.border,
      thickness: 0.5,
      space:     0,
    ),

    // ─── Switch / Toggle ─────────────────────────────────────────
    switchTheme: SwitchThemeData(
      thumbColor:  WidgetStateProperty.resolveWith((states) =>
        states.contains(WidgetState.selected)
          ? AppColors.white
          : AppColors.textMuted,
      ),
      trackColor:  WidgetStateProperty.resolveWith((states) =>
        states.contains(WidgetState.selected)
          ? AppColors.pink
          : AppColors.border,
      ),
    ),

    // ─── Bottom Sheet ────────────────────────────────────────────
    bottomSheetTheme: const BottomSheetThemeData(
      backgroundColor:    AppColors.surface1,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.only(
          topLeft:  Radius.circular(20),
          topRight: Radius.circular(20),
        ),
      ),
    ),

    // ─── Dialog ──────────────────────────────────────────────────
    dialogTheme: DialogThemeData(
      backgroundColor: AppColors.surface1,
      shape: RoundedRectangleBorder(borderRadius: AppRadius.lgBorder),
      titleTextStyle: AppTypography.headingLg,
      contentTextStyle: AppTypography.bodyMd,
    ),

    // ─── Snackbar ────────────────────────────────────────────────
    snackBarTheme: SnackBarThemeData(
      backgroundColor: AppColors.surface2,
      contentTextStyle: AppTypography.bodyMd.copyWith(
        color: AppColors.textPrimary,
      ),
      shape: RoundedRectangleBorder(borderRadius: AppRadius.mdBorder),
      behavior: SnackBarBehavior.floating,
    ),
  );
}
