import 'package:flutter/material.dart';

/// Sokohuru Design System — Colour Tokens
/// Single source of truth for all colours in the app.
/// NEVER use raw hex values anywhere in the codebase.
/// ALWAYS reference AppColors.*
abstract class AppColors {
  AppColors._();

  // ─── Primary — Sokohuru Pink ───────────────────────────────────
  static const pink50  = Color(0xFF3A0E22);
  static const pink100 = Color(0xFF5C1636);
  static const pink200 = Color(0xFF7D1240);
  static const pink400 = Color(0xFFA8164F);
  static const pink    = Color(0xFFC8185A); // primary — use this
  static const pink800 = Color(0xFFE8509A);
  static const pink900 = Color(0xFFF9B8D4);

  /// Convenience aliases
  static const pinkDark  = pink50;
  static const pinkLight = pink800;

  // ─── Surfaces — Dark mode layers ──────────────────────────────
  static const base     = Color(0xFF0C0B14); // app background
  static const surface1 = Color(0xFF111018); // cards, nav
  static const surface2 = Color(0xFF1A1826); // inputs, secondary cards
  static const surface3 = Color(0xFF1E1C2A); // chips, subtle fills
  static const border   = Color(0xFF2E2B40); // all borders / dividers
  static const muted    = Color(0xFF4A4760); // disabled, placeholder

  // ─── Text ─────────────────────────────────────────────────────
  static const textPrimary   = Color(0xFFF0EEF8);
  static const textSecondary = Color(0xFF8E8AA8);
  static const textMuted     = Color(0xFF6B6880);
  static const textDisabled  = Color(0xFF4A4760);

  // ─── Semantic — Success ───────────────────────────────────────
  static const success        = Color(0xFF0F6E56);
  static const successSurface = Color(0xFF0B2318);
  static const successText    = Color(0xFF5DCAA5);

  // ─── Semantic — Warning ───────────────────────────────────────
  static const warning        = Color(0xFF854F0B);
  static const warningSurface = Color(0xFF2A1A04);
  static const warningText    = Color(0xFFFAC775);

  // ─── Semantic — Error ─────────────────────────────────────────
  static const error        = Color(0xFFA32D2D);
  static const errorSurface = Color(0xFF2A0A0A);
  static const errorText    = Color(0xFFF09595);

  // ─── Semantic — Info ──────────────────────────────────────────
  static const info        = Color(0xFF185FA5);
  static const infoSurface = Color(0xFF0A1A2E);
  static const infoText    = Color(0xFF85B7EB);

  // ─── White / transparent ─────────────────────────────────────
  static const white       = Color(0xFFFFFFFF);
  static const transparent = Colors.transparent;

  // ─── Overlay helpers ─────────────────────────────────────────
  static Color overlay(double opacity) =>
      Colors.black.withValues(alpha: opacity);
}
