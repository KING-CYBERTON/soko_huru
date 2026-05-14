import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'app_colors.dart';

/// Sokohuru Design System — Typography Tokens
/// Display font:  Clash Display  (headings, hero text)
/// Body font:     Plus Jakarta Sans (everything else)
///
/// Add to pubspec.yaml:
///   google_fonts: ^6.0.0
///
/// NEVER use raw TextStyle with hardcoded values.
/// ALWAYS reference AppTypography.*
abstract class AppTypography {
  AppTypography._();

  // ─── Display — Clash Display ──────────────────────────────────
  // Note: Clash Display is not in google_fonts package.
  // Add @fontsource/clash-display via assets or use a fallback.
  // For now uses GoogleFonts.spaceGrotesk as closest available match.
  // Replace with custom font asset when available.

  /// H1 — Hero headings (40px)
  static TextStyle get displayXl => GoogleFonts.spaceGrotesk(
    fontSize: 40,
    fontWeight: FontWeight.w600,
    color: AppColors.textPrimary,
    letterSpacing: -1.5,
    height: 1.1,
  );

  /// H2 — Section headings (30px)
  static TextStyle get displayLg => GoogleFonts.spaceGrotesk(
    fontSize: 30,
    fontWeight: FontWeight.w600,
    color: AppColors.textPrimary,
    letterSpacing: -1.0,
    height: 1.2,
  );

  /// H3 — Card headings (22px)
  static TextStyle get displayMd => GoogleFonts.spaceGrotesk(
    fontSize: 22,
    fontWeight: FontWeight.w600,
    color: AppColors.textPrimary,
    letterSpacing: -0.5,
    height: 1.3,
  );

  // ─── Body — Plus Jakarta Sans ─────────────────────────────────

  /// H4 — Sub-headings (18px Medium)
  static TextStyle get headingLg => GoogleFonts.plusJakartaSans(
    fontSize: 18,
    fontWeight: FontWeight.w500,
    color: AppColors.textPrimary,
    height: 1.4,
  );

  /// Screen titles, card headings (16px Medium)
  static TextStyle get headingMd => GoogleFonts.plusJakartaSans(
    fontSize: 16,
    fontWeight: FontWeight.w500,
    color: AppColors.textPrimary,
    height: 1.4,
  );

  /// Component headings (15px Medium)
  static TextStyle get headingSm => GoogleFonts.plusJakartaSans(
    fontSize: 15,
    fontWeight: FontWeight.w500,
    color: AppColors.textPrimary,
    height: 1.4,
  );

  /// Body large — descriptions (14px Regular)
  static TextStyle get bodyLg => GoogleFonts.plusJakartaSans(
    fontSize: 14,
    fontWeight: FontWeight.w400,
    color: AppColors.textSecondary,
    height: 1.6,
  );

  /// Body medium — standard text (13px Regular)
  static TextStyle get bodyMd => GoogleFonts.plusJakartaSans(
    fontSize: 13,
    fontWeight: FontWeight.w400,
    color: AppColors.textSecondary,
    height: 1.5,
  );

  /// Body small — secondary info (12px Regular)
  static TextStyle get bodySm => GoogleFonts.plusJakartaSans(
    fontSize: 12,
    fontWeight: FontWeight.w400,
    color: AppColors.textMuted,
    height: 1.5,
  );

  /// Label medium — field labels, nav items (12px Medium)
  static TextStyle get labelMd => GoogleFonts.plusJakartaSans(
    fontSize: 12,
    fontWeight: FontWeight.w500,
    color: AppColors.textSecondary,
    height: 1.4,
  );

  /// Label small — uppercase section headers (11px Medium)
  static TextStyle get labelSm => GoogleFonts.plusJakartaSans(
    fontSize: 11,
    fontWeight: FontWeight.w500,
    color: AppColors.textMuted,
    letterSpacing: 0.08 * 11,
    height: 1.4,
  );

  /// Caption — hints, meta info (11px Regular)
  static TextStyle get caption => GoogleFonts.plusJakartaSans(
    fontSize: 11,
    fontWeight: FontWeight.w400,
    color: AppColors.textMuted,
    height: 1.4,
  );

  /// Micro — timestamps, tiny labels (10px Regular)
  static TextStyle get micro => GoogleFonts.plusJakartaSans(
    fontSize: 10,
    fontWeight: FontWeight.w400,
    color: AppColors.textMuted,
    height: 1.4,
  );

  // ─── Utility — colour overrides ──────────────────────────────
  /// Apply a different colour to any text style
  static TextStyle withColor(TextStyle style, Color color) =>
      style.copyWith(color: color);

  /// Make any text style bold
  static TextStyle bold(TextStyle style) =>
      style.copyWith(fontWeight: FontWeight.w600);

  /// Make any text style medium weight
  static TextStyle medium(TextStyle style) =>
      style.copyWith(fontWeight: FontWeight.w500);
}
